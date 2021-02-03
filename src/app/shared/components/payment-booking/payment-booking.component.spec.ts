import { TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf } from 'rxjs';
import { PaymentBookingComponent } from './payment-booking.component';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { HomeService } from 'src/app/home/services/home.service';

@Injectable()
class MockHomeService { addBooking() { } }

describe('PaymentBookingComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        StoreModule.forRoot({}, {}),
      ],
      declarations: [
        PaymentBookingComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        MatDialog,
        { provide: MatDialog, useValue: { open() { } } },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { 'bookingDetails': null } },
          }
        },
        Store,
        { provide: HomeService, useClass: MockHomeService }
      ]
    }).overrideComponent(PaymentBookingComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PaymentBookingComponent);
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
    component.ngOnInit();
  });

});
