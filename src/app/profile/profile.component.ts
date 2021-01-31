import { Component, OnInit, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { HomeService } from '../home/services/home.service';
import { LoginService } from '../core/services/login.service';

import { Store } from '@ngrx/store';
import * as UserState from '../reducers/index';
import { SetUser } from 'src/app/core/store/action/userDetails.action';
import { User } from 'src/app/core/models/user.model';
import { MatDialog } from '@angular/material';

import { FormBuilder, Validators } from '@angular/forms';
import { UserDetailService } from 'src/app/core/services/userDetails.service';
import * as MovieState from '../reducers/index';
import { Language } from '../home/models/languages.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  genresList: any = [];
  theaterList: any = [];
  name;
  userdatas;
  userDetails;
  @ViewChild('successDialog') successDialog: TemplateRef<any>;
  languageList: Language[];
  filteredLanguages: Observable<Language[]>;

  currentSession;
  newPreference = this.fb.group({
    lang: ['', Validators.required],
    generes: ['', Validators.required],
    theaters: ['', Validators.required]
  });

  constructor(
    private homeService: HomeService,
    private loginService: LoginService,
    private userDetailService: UserDetailService,
    private fb: FormBuilder,
    private store: Store<UserState.State>,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.userDetailService.getUserDetailData();
    this.currentSession = JSON.parse(sessionStorage.getItem('authDetails'));
    this.store.select(MovieState.languageList).subscribe(result => {
      this.languageList = Object.values(result) as Language[];
    });
    this.store.select(UserState.userSelector).subscribe(result => {
      this.userDetails = result;
      this.sucess();
    });
    this.homeService.getGenres().subscribe(res => {
      this.genresList = res['genres'];
    });
    this.loginService.getUserData().subscribe(data => (this.name = data.users[0].name));
    this.store.select(MovieState.theaterList).subscribe(result => {
      this.theaterList = Object.values(result);
    });
    this.filteredLanguages = this.newPreference.controls[`lang`].valueChanges.pipe(
      startWith(''),
      map(value => this.filterLanguages(value))
    );
  }

  sucess() {
    this.newPreference.reset();
    this.newPreference.patchValue({
      lang: this.languageList.find(lang => lang.iso_639_1 === this.userDetails.preferences.lang),
      generes: this.userDetails.preferences.generes,
      theaters: this.userDetails.preferences.theaters
    });
    console.log(this.languageList);
    console.log(this.newPreference.value);
    this.matDialog.closeAll();
  }

  submitPreferences() {
    let currentSeesion;
    const {
      lang,
      generes,
      theaters
    } = this.newPreference.value;
    const newPref = {
      lang: lang.iso_639_1,
      generes,
      theaters
    };
    currentSeesion = JSON.parse(sessionStorage.getItem('authDetails'));
    this.homeService.setPreference(newPref, currentSeesion['id']);
    this.matDialog.open(this.successDialog);
  }

  displayLanguage(lang: Language): string {
    return lang && lang.english_name ? lang.english_name : '';
  }

  private filterLanguages(value: string): Language[] {
    const filterValue = (typeof value === 'string') ? value.toLowerCase() : this.newPreference.value.lang.english_name;
    return this.languageList.filter(option => option.english_name.toLowerCase().indexOf(filterValue) === 0);
  }
}
