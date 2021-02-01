import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-booking-incomplete-modal',
  templateUrl: './booking-incomplete-modal.component.html',
  styleUrls: ['./booking-incomplete-modal.component.scss']
})
export class BookingIncompleteModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BookingIncompleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
  }

  yes() {
    this.dialogRef.close(true);
  }

  no() {
    this.dialogRef.close(false);
  }

}
