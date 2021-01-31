import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserState from '../../../reducers/index';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit {

  userDetails;
  userBookings;

  constructor(private store: Store<UserState.State>) { }

  ngOnInit() {
    this.store.select(UserState.userSelector).subscribe(result => {
      this.userDetails = result;
      this.userBookings = this.userDetails.bookings;
    });
  }

}
