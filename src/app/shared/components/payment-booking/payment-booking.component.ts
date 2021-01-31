import { Component, OnInit, EventEmitter, Output, Input, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '../../../material.module';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmationModalComponent } from '../../components/modals/confirmation-modal/confirmation-modal.component';
import { ActivatedRoute } from '@angular/router';
import * as UserState from '../../../reducers/index';
import { Store } from '@ngrx/store';
import { HomeService } from 'src/app/home/services/home.service';

@Component({
  selector: 'app-payment-booking',
  templateUrl: './payment-booking.component.html',
  styleUrls: ['./payment-booking.component.scss']
})
export class PaymentBookingComponent implements OnInit {
  bookingDetails;
  currentUserDets;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private store: Store<UserState.State>,
    private homeService: HomeService
  ) {
    this.bookingDetails = JSON.parse(this.route.snapshot.params.bookingDetails);
    console.log(this.bookingDetails, 'gn');
  }

  ngOnInit() {
    this.currentUserDets = JSON.parse(sessionStorage.getItem('authDetails'));
  }

  confirmPay(): void {
    this.homeService.addBooking(this.bookingDetails, this.currentUserDets[`id`]);
    this.openConfirmDialog();
  }

  openConfirmDialog() {
    this.dialog.open(ConfirmationModalComponent, {
      disableClose: true,
      data: {
        id: this.bookingDetails.bookingId,
        name: this.bookingDetails.mname,
        theater: this.bookingDetails.tname,
        time: this.bookingDetails.mtime,
        seat: this.bookingDetails.seatNum,
        total: this.bookingDetails.price,
      }
    });
  }
}


