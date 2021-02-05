import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { TMDB_URLS } from 'src/app/shared/config';
import * as UserState from '../../../reducers/index';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyBookingsComponent implements OnInit {

  userDetails;
  userBookings;
  imagesPath = TMDB_URLS.IMAGE_URL;

  constructor(private store: Store<UserState.State>) { }

  ngOnInit() {
    this.store.select(UserState.userSelector).subscribe(result => {
      this.userDetails = result;
      this.userBookings = this.userDetails.bookings.sort((a, b) => b.createdDatetime - a.createdDatetime);
    });
  }

}
