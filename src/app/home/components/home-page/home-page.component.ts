import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  @Input()
  moviesList;

  @Input()
  upcomingList;

  @Input()
  theaterList;

  @Input()
  userPreference;

  @Output()
  getNewNowPlayingMovies: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  getNewUpcomingMovies: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

  activeTabIndex = 0;
  nowPlayingMovieFetchedPageNum = 1;
  upcomingMoviesFetchedPageNum = 0;
  selectedLanguage = '';
  selectedGenre = '';
  languageList = [{id: 'en', name: 'English'}, {id: 'ja', name: 'Japanese'}, {id: 'zh', name: 'Chinese'}];
  constructor(private homeService: HomeService) { }

  ngOnInit() { }

  trackMovie(index, movie) {
    if (movie) {
      return movie.id;
    } else {
      return -1;
    }
  }
  getNextBatchofMovies(event) {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    if ((end > (this.moviesList.length - 5)) && this.activeTabIndex === 0) {
      const page = this.moviesList.length / 20 + 1;
      if (page > this.nowPlayingMovieFetchedPageNum) {
        this.nowPlayingMovieFetchedPageNum++;
        this.getNewNowPlayingMovies.emit(page);
      }
    }
    if ((end > (this.upcomingList.length - 5) || this.upcomingList.length === 0) && this.activeTabIndex === 1) {
      const page = this.upcomingList.length / 20 + 1;
      if (page > this.upcomingMoviesFetchedPageNum) {
        this.upcomingMoviesFetchedPageNum++;
        this.getNewUpcomingMovies.emit(page);
      }
    }
  }

  tabChanged(event) {
    this.activeTabIndex = event;
  }

  getLanguage(lang) {
    this.selectedLanguage = lang;
  }

  getGenre(g) {
    this.selectedGenre = g;
  }
}
