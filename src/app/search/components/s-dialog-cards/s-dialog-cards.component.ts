import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';

// import { MoviePipePipe } from './../../pipes/movie-pipe.pipe';
import { HomeFilterPipe } from '../../../shared/pipes/home-filter.pipe';
import { SortMoviePipe } from '../../../shared/pipes/sort-movie.pipe';
import * as UserState from '../../../reducers/index';
import { Store } from '@ngrx/store';

// import { MatCardModule } from '@angular/material'

@Component({
  selector: 'app-s-dialog-cards',
  templateUrl: './s-dialog-cards.component.html',
  styleUrls: ['./s-dialog-cards.component.scss']
})
export class SDialogCardsComponent implements OnChanges, OnInit {
  @Input() movieList; // movie seperated by language
  @Input() movieFilter; // genre
  @Input() languageList; // list of languages
  @Input() selectedLanguage; // user language selection
  userPreference: any = [];

  // movieList DS
  // key: language.name,
  // code: language.key,
  // value: []

  constructor(private userStore: Store<UserState.State>) {}

  ngOnInit(): void {
    this.userStore.select(UserState.userSelector).subscribe(result => {
      this.userPreference = result.preferences;
      // console.log('uspref', this.userPreference);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, 'chan');
    this.movieList = changes.movieList ? changes.movieList.currentValue : this.movieList;
    this.movieFilter = changes.movieFilter ? changes.movieFilter.currentValue : this.movieFilter;
    this.languageList = changes.languageList ? changes.languageList.currentValue : this.languageList;
    this.selectedLanguage = changes.selectedLanguage ? changes.selectedLanguage.currentValue : this.selectedLanguage;
  }

}
