import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.scss']
})
export class MovieRatingComponent implements OnInit {

  @Input() movieDescription;
  rating = 0;

  constructor() { }

  ngOnInit() {
    console.log(this.movieDescription, 'des');
    for (let i = 0; i <= 4; i++) {
      this.rating = this.movieDescription.vote_average / 2;
    }
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
