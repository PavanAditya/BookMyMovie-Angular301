import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';
import { TMDB_URLS } from '../../../config';
import { FormControl } from '@angular/forms';
import { UserDetailService } from 'src/app/core/services/userDetails.service';
@Component({
  selector: 'app-seat-reservation-modal',
  templateUrl: './seat-reservation-modal.component.html',
  styleUrls: ['./seat-reservation-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeatReservationModalComponent implements OnInit {
  imagesPath = TMDB_URLS.IMAGE_URL;
  // variable declarations
  movieTitle;
  screen;
  time;

  rows: string[] = ['A', 'B', 'C', 'D'];
  cols: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  reserved: string[] = ['A2', 'A3', 'B5', 'C1', 'C2', 'D4'];
  selected: string[] = [];

  ticketPrice = 120;
  convFee = 30;
  totalPrice = 0;
  currency = 'Rs';
  showBook: boolean;
  movieList;
  bookingTime = new FormControl('10:45');
  allBookings = null;

  constructor(
    public dialog: MatDialog,
    private userService: UserDetailService,
    private dialogRef: MatDialogRef<SeatReservationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) { }

  ngOnInit() {
    const authValid = sessionStorage.getItem('authDetails');
    if (authValid) {
      this.showBook = true;
    } else {
      this.showBook = false;
    }
    this.userService.getMovieBookings().subscribe(
      value => {
        const newObject = value;
        this.allBookings = [];
        newObject['users'].map(user => user['bookings'].length ? this.allBookings.push(...user['bookings']) : this.allBookings.push(...[]));
        this.seatsBookedForCurrentShow(this.allBookings);
      });
    this.bookingTime.valueChanges.subscribe(() => this.seatsBookedForCurrentShow(this.allBookings));
  }

  seatsBookedForCurrentShow(allBookings): void {
    this.reserved = [];
    allBookings.map(booking => {
      if (booking.tid === this.data.theatre.tid && booking.mname === this.movieTitle) {
        const seats = [];
        console.log(booking.tid, this.data.theatre.tid, booking.mname, this.movieTitle, booking.mtime, this.bookingTime.value);
        if (booking.mtime === this.bookingTime.value) {
          seats.push(...booking.seatNum.split(','));
        }
        this.reserved.push(...seats);
        console.log(this.reserved, 'all');
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onCloseConfirm() {
    this.dialogRef.close('Confirm');
    const total: number = this.ticketPrice * this.selected.length + this.convFee;
    const theater = this.screen || '';
    const idNum = Math.floor(1000 + Math.random() * 9000);
    const bookingDetails = JSON.stringify({
      bookingId: this.data.theatre.name + idNum,
      tid: this.data.theatre.tid,
      tcity: this.data.theatre.city,
      tname: this.data.theatre.name,
      mid: this.data.movie.id,
      mposter: this.data.movie.poster_path,
      gLocation: this.data.theatre.gLocation,
      mname: this.movieTitle,
      mtime: this.bookingTime.value,
      seatNum: this.selected.join(','),
      price: total
    });
    this.router.navigate(['/payment', bookingDetails]);
  }
  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

  // return status of each seat
  getStatus(seatPos: string) {
    if (this.reserved.indexOf(seatPos) !== -1) {
      return 'reserved';
    } else if (this.selected.indexOf(seatPos) !== -1) {
      return 'selected';
    }
  }

  // click handler
  seatClicked(seatPos: string) {
    console.log('test', seatPos);
    const index = this.selected.indexOf(seatPos);
    if (index !== -1) {
      // seat already selected, remove
      this.selected.splice(index, 1);
    } else {
      // push to selected array only if it is not reserved
      if (this.reserved.indexOf(seatPos) === -1) {
        this.selected.push(seatPos);
      }
    }
  }
}
