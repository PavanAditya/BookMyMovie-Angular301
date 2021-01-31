import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { HomeService } from 'src/app/home/services/home.service';
import { FormControl } from '@angular/forms';
import { Language } from 'src/app/home/models/languages.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-movie-dropdowns',
  templateUrl: './movie-dropdowns.component.html',
  styleUrls: ['./movie-dropdowns.component.scss']
})
export class MovieDropdownsComponent implements OnInit, OnChanges {
  genresList: any = [];
  @Input() layout;
  @Input() languageList: Language[];
  @Output() languageChange$: EventEmitter<any>;
  @Output() genreChange$: EventEmitter<any>;
  @Output() distanceChange$: EventEmitter<any>;
  languageSelected = false;
  genreSelected = false;
  genreObj = { value: '' };
  distanceSelected: number;
  languageSelector: FormControl;
  generSelector: FormControl;
  filteredLanguages: Observable<Language[]>;

  constructor(private homeService: HomeService) {
    this.languageChange$ = new EventEmitter();
    this.genreChange$ = new EventEmitter();
    this.distanceChange$ = new EventEmitter();
    this.languageSelector = new FormControl();
    this.generSelector = new FormControl();
  }

  ngOnInit() {
    this.homeService.getGenres().subscribe(resp => {
      this.genresList = resp['genres'];
    });
    this.languageSelector.valueChanges.subscribe((value) => {
      this.languageSelected = value ? true : false;
      this.languageChange$.emit(value.iso_639_1);
    });
    this.generSelector.valueChanges.subscribe((value) => {
      this.genreSelected = value ? true : false;
      this.genreObj.value = value;
      this.genreObj = Object.assign({}, this.genreObj);
      this.genreChange$.emit(this.genreObj);
    });
  }

  ngOnChanges(changes) {
    this.languageList = changes.languageList.currentValue;
    this.filteredLanguages = this.languageSelector.valueChanges.pipe(
      startWith(''),
      map(value => this.filterLanguages(value))
    );
  }

  displayLanguage(lang: Language): string {
    return lang && lang.english_name ? lang.english_name : '';
  }

  private filterLanguages(value: string): Language[] {
    const filterValue = (typeof value === 'string') ? value.toLowerCase() : this.languageSelector.value.english_name;
    return this.languageList.filter(option => option.english_name.toLowerCase().indexOf(filterValue) === 0);
  }
}
