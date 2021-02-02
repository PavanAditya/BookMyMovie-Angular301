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
    this.rating = this.movieDescription.vote_average / 2;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.movieDescription = changes.movieDescription ? changes.movieDescription.currentValue : this.movieDescription;
  }

  decimalValue(num: number): boolean {
    return num - Math.floor(num) !== 0;
  }

  ceiledValue(num: number): number {
    return Math.ceil(num);
  }

  roundedValue(num: number): number {
    return Math.floor(num);
  }

}
