import { Component, OnInit, Inject, Input, OnChanges, ViewEncapsulation, SimpleChanges } from '@angular/core';
import { StoreFeatureModule } from '@ngrx/store';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { SeatReservationModalComponent } from '../../../shared/components/modals/seat-reservation-modal/seat-reservation-modal.component';
import { MovieService } from '../../services/movie.service';
import { FormControl } from '@angular/forms';
import { Store, State } from '@ngrx/store';
import * as MovieState from '../../../reducers/index';
import { TMDB_URLS } from '../../../shared/config';
import { PreBookingComponent } from '../../../shared/components/modals/pre-booking/pre-booking.component';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MoviePageComponent implements OnInit, OnChanges {
  imagesPath = TMDB_URLS.IMAGE_URL;
  castCrew = TMDB_URLS.CAST_CREW_BIG;
  @Input() movieDescription;
  @Input() theaterList;
  @Input() category;
  selectTheater: FormControl;
  minDate = new Date();
  date = new FormControl(this.minDate);
  selectedTheater;
  selectedDate;
  dialogResult;
  selectedTime;
  constructor(public dialog: MatDialog) {
    this.selectTheater = new FormControl();
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
  ngOnChanges(changes: SimpleChanges) {
    this.movieDescription = changes.movieDescription ? changes.movieDescription.currentValue : this.movieDescription;
    this.theaterList = changes.theaterList ? changes.theaterList.currentValue : this.theaterList;
    this.category = changes.category ? changes.category.currentValue : this.category;
    this.selectTheater = new FormControl();
    this.selectTheater.setValue(this.theaterList[0]);
    this.selectedTheater = this.theaterList[0];
    this.selectTheater.valueChanges.subscribe(selectedTheater => {
      this.selectedTheater = selectedTheater;
    });
    this.date.valueChanges.subscribe((value: Date) => {
      this.selectedDate = value.toJSON();
    });
    console.log(this.movieDescription, 'description');
  }
  checKToDialog() {
    this.category === 'nowPlaying' ? this.openDialog() : this.preBookDialog();
  }
  preBookDialog() {
    const dialogRef = this.dialog.open(PreBookingComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(() => {});
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(SeatReservationModalComponent, {
      width: sessionStorage.getItem('authDetails') ? window.innerWidth + 'px' : 'auto',
      height: sessionStorage.getItem('authDetails') ? '599px' : 'auto',
      data: 'test'
    });
    const bookingInstance = dialogRef.componentInstance;
    bookingInstance.movieTitle = this.movieDescription.title;
    bookingInstance.screen = this.selectedTheater.name;
    bookingInstance.time = this.selectedTime;
    bookingInstance.movieList = this.movieDescription;
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog closed: ${result}`);
      // this.dialogResult = result;
    });
  }
  onValChange(val: string) {
    this.selectedTime = val;
  }
  isInvalid() {
    if (this.selectedTheater && this.selectedTheater.name) {
      return false;
    }
    return true;
  }
  trackCastandCrew(index, cast) {
    if (cast) {
      return cast.id;
    } else {
      return -1;
    }
  }
}
