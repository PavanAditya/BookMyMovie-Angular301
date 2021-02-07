import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.scss']
})
export class MovieRatingComponent implements OnInit, OnChanges {

  @Input() movieDescription;
  rating = 0;

  constructor() { }

  ngOnInit() {
    this.rating = this.movieDescription ? this.movieDescription.vote_average / 2 : null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.movieDescription = changes.movieDescription ? changes.movieDescription.currentValue : this.movieDescription;
  }

  decimalValue(num: number): boolean {
    return num - Math.floor(num) !== 0;
  }

  ceiledValue(num: number): number[] {
    const array = [];
    for (let index = 0; index < 5 - Math.ceil(num); index++) {
      array[index] = index;
    }
    return array;
  }

  roundedValue(num: number): number[] {
    const array = [];
    for (let index = 0; index < Math.floor(num); index++) {
      array[index] = index;
    }
    return array;
  }

}
