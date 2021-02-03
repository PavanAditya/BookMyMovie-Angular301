import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatDialogModule, MatDialogRef, MatDividerModule, MAT_DIALOG_DATA } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { BookingIncompleteModalComponent } from './booking-incomplete-modal.component';

describe('BookingIncompleteModalComponent', () => {
  let component: BookingIncompleteModalComponent;
  let fixture: ComponentFixture<BookingIncompleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatDividerModule,
        MatDialogModule,
        StoreModule.forRoot({}, {}),
      ],
      declarations: [BookingIncompleteModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingIncompleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.ngOnInit();
  });

  // it('should run #yes()', async () => {
  //   component.yes();
  //   expect(component.yes).toHaveBeenCalled();
  // });

  // it('should run #no()', async () => {
  //   component.no();
  //   expect(component.no).toHaveBeenCalled();
  // });
});
