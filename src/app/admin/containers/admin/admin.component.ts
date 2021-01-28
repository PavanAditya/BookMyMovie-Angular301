import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Store, State } from '@ngrx/store';
import * as MovieState from '../../../reducers/index';
import { Theater } from 'src/app/home/models/theater.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  theaterList: Theater[];
  constructor(private adminService: AdminService, private store: Store<MovieState.State>) { }

  ngOnInit() {
    this.store.select(MovieState.theaterList).subscribe(result => {
      this.theaterList = Object.values(result) as Theater[];
    });
  }

  addTheater(formData) {
    this.theaterList.push(formData);
    this.adminService.newTheater({ theaters: this.theaterList });
  }
}
