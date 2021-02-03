import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf } from 'rxjs';
import { MoviePageComponent } from './movie-page.component';
import { MatDialog, MatDialogModule } from '@angular/material';

describe('MoviePageComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, MatDialogModule ],
      declarations: [
        MoviePageComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        MatDialog,
        { provide: MatDialog, useValue: {} },
      ]
    }).overrideComponent(MoviePageComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(MoviePageComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnChanges()', async () => {
    component.theaterList = 0;
    component.selectTheater = component.selectTheater || {};
    component.selectTheater.setValue();
    component.selectTheater.valueChanges = observableOf({});
    component.date = component.date || {};
    component.date.valueChanges = observableOf({});
    expect(component.theaterList).toEqual(0);
  });

  it('should run #onValChange()', async () => {
    component.onValChange({});
  });

  it('should run #isInvalid()', async () => {
    component.selectedTheater = component.selectedTheater || {};
    component.selectedTheater.name = 'name';
    component.isInvalid();
  });

  it('should run #trackCastandCrew()', async () => {
    component.trackCastandCrew({}, {
      id: {}
    });
  });

});
