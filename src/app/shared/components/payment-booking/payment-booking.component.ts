import { Component, OnInit, EventEmitter, Output, Input, Inject, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '../../../material.module';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmationModalComponent } from '../../components/modals/confirmation-modal/confirmation-modal.component';
import { ActivatedRoute } from '@angular/router';
import * as UserState from '../../../reducers/index';
import { Store } from '@ngrx/store';
import { HomeService } from 'src/app/home/services/home.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingIncompleteModalComponent } from '../booking-incomplete-modal/booking-incomplete-modal.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-payment-booking',
  templateUrl: './payment-booking.component.html',
  styleUrls: ['./payment-booking.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentBookingComponent implements OnInit {

  bookingDetails;
  currentUserDets;
  paymentConfirmed = false;
  paymentForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    number: ['', [Validators.required, Validators.pattern(`^(?:4[0-9]{12}(?:[0-9]{3})?)$|^(?:5[1-5][0-9]{14})$|^(?:3[47][0-9]{13})$`)]],
    expMonth: ['', Validators.required],
    expYear: ['', Validators.required],
    cvv: ['', [Validators.required, Validators.maxLength(4), Validators.pattern(`^[0-9]{3,4}$`)]]
  });

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private store: Store<UserState.State>,
    private homeService: HomeService
  ) {
    this.bookingDetails = JSON.parse(this.route.snapshot.params.bookingDetails);
  }

  ngOnInit() {
    this.currentUserDets = JSON.parse(sessionStorage.getItem('authDetails'));
  }

  confirmPay(): void {
    if (this.paymentForm.valid) {
      this.bookingDetails = {
        ...this.bookingDetails,
        createdDatetime: (new Date()).getTime()
      };
      this.homeService.addBooking(this.bookingDetails, this.currentUserDets[`id`]);
      this.paymentConfirmed = true;
      this.openConfirmDialog();
    } else {
      this.paymentForm.markAsTouched();
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.paymentForm.dirty && !this.paymentConfirmed) {
      const confirmNavigationDialog = this.dialog.open(BookingIncompleteModalComponent, {
        disableClose: true,
        data: '',
      });
      return confirmNavigationDialog.afterClosed()
        .pipe(
          map(result => {
            return result;
          })
        );
    } else {
      return true;
    }
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


