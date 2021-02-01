import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingIncompleteModalComponent } from './booking-incomplete-modal.component';

describe('BookingIncompleteModalComponent', () => {
  let component: BookingIncompleteModalComponent;
  let fixture: ComponentFixture<BookingIncompleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingIncompleteModalComponent ]
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
});
