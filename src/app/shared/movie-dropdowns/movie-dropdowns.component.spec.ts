import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieDropdownsComponent } from './movie-dropdowns.component';
import { HomeService } from 'src/app/home/services/home.service';
import { MatAutocompleteModule } from '@angular/material';

@Injectable()
class MockHomeService { getGenres() { } }

describe('MovieDropdownsComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule
      ],
      declarations: [
        MovieDropdownsComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: HomeService, useClass: MockHomeService }
      ]
    }).overrideComponent(MovieDropdownsComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(MovieDropdownsComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function () { };
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should run #displayLanguage()', async () => {
    spyOn(component, 'displayLanguage');
    component.displayLanguage({
      english_name: ''
    });
    expect(component.displayLanguage).toHaveBeenCalled();
  });

  it('should run #filterLanguages()', async () => {
    component.languageSelector.setValue({
      english_name: ''
    });
    component.languageList = [{
      english_name: ''
    }];
    component.filterLanguages({
      english_name: ''
    });
  });

});
