import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { theaterList } from 'src/app/reducers';
import { AdminService } from '../../services/admin.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-change-show',
  templateUrl: './change-show.component.html',
  styleUrls: ['./change-show.component.scss']
})
export class ChangeShowComponent implements OnInit {
  @Input() theaterList;
  movieInput: FormControl;
  selectTheater: FormControl;
  movieResult;
  selectedTheater;
  nowShowing = [];
  nowPlaying = [];
  movieInList = false;
  @ViewChild('successDialog') successDialog: TemplateRef<any>;

  constructor(private adminService: AdminService, private matDialog: MatDialog) {
    this.movieInput = new FormControl();
    this.selectTheater = new FormControl();
  }

  ngOnInit() {
    this.movieInput.valueChanges.subscribe(value => {
      if (value) {
        this.adminService.searchMovie(value).subscribe(movies => {
          this.movieResult = movies['results'];
        });
      }
    });
    this.selectTheater.valueChanges.subscribe(value => {
      this.selectedTheater = value;
      this.nowShowing = [];
    });
  }
  addMovie(movie) {
    if (this.theaterList) {
      this.movieInList = false;
      if (this.theaterList.find(el => el.tid === this.selectTheater.value.tid)) {
        const movies = this.theaterList.find(el => el.tid === this.selectTheater.value.tid).movies;
        this.nowPlaying = movies ? movies : [];
      }
      if (this.nowPlaying.indexOf(movie.id) === -1) {
        this.nowShowing.push(movie.name);
        this.nowPlaying.push(movie.id);
      } else {
        this.movieInList = true;
      }
    }
  }

  save() {
    this.matDialog.open(this.successDialog);
    this.theaterList.forEach(theater => {
      if (theater.tid === this.selectTheater.value.tid) {
        theater.movies = this.nowPlaying;
      }
    });
    this.adminService.saveNowPlaying(this.theaterList);
  }
  cancel() {
    this.nowShowing = [];
  }
  dialogOk() {
    this.nowShowing = [];
    this.movieInput.reset();
    this.selectTheater.reset();
    this.matDialog.closeAll();
    this.movieResult = [];
  }
}
