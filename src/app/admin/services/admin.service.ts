import { Injectable } from '@angular/core';
import { HttpClient } from '@angular//common/http';
import { TMDB_URLS, JSON_SERVER_URLS, BASE_URL } from '../../shared/config';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import * as AdminState from '../../reducers/index';
import * as MoviesState from '../../reducers/index';
import { AddTheaters } from '../store/actions/admin.action';
import { Theater } from 'src/app/home/models/theater.model';
import { SetTheaters } from 'src/app/home/store/actions/home.action';
const SEARCH_URL = BASE_URL.TMDB_API + TMDB_URLS.SEARCH_URL;
const THEATERS_URL = environment.JSONSERVER + JSON_SERVER_URLS.THEATER_URL;

@Injectable()

export class AdminService {

  constructor(private http: HttpClient, private store: Store<AdminState.State>, private moviesStore: Store<MoviesState.State>) { }

  newTheater(data: { theaters: Theater[] }) {
    this.http.put(THEATERS_URL, data).subscribe((res: { theaters: Theater[] }) => {
      console.log(data, res);
      this.moviesStore.dispatch(new SetTheaters(res));
    }, (e) => console.log(e, 'while updating data'));
  }

  searchMovie(term) {
    return this.http.get(SEARCH_URL + environment.API_KEY + '&query=' + term);
  }

  saveNowPlaying(theatersList) {
    this.http.put(THEATERS_URL, theatersList).subscribe((res: { theaters: Theater[] }) => {
      this.moviesStore.dispatch(new SetTheaters(res));
    }, err => {
      console.log('failed at put call', err);
    });
  }
}
