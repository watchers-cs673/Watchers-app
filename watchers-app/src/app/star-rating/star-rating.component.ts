import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  template: `
    <div class="star-rating" (mouseleave)="onMouseLeave()">
      <span
        *ngFor="let star of stars; let i = index"
        class="star"
        [class.filled]="i < filledStars"
        (mouseover)="onMouseOver(i)"
        (click)="onStarClicked(i)"
      >
        &#9733;
      </span>
      <span>{{rating}}</span>
      </div>
      `,
      styles: [
        `
          .star-rating {
        display: inline-block;
        font-size: 2rem;
        cursor: pointer;
      }
      .star {
        color: #ccc;
      }
      .star.filled {
        color: #3c75df;;
      }
    `,
  ],
})
export class StarRatingComponent implements OnInit {
  @Input() rating = 0;
  @Output() ratingChange = new EventEmitter<number>();

  public ratingWeight = 10;
  filledStars = 0;
  stars = [1, 2, 3, 4, 5];

  constructor() {
  }

  ngOnInit() {
   this.rating = this.rating/2;
   this.filledStars = this.rating;
  }

  onMouseOver(index: number) {
    this.filledStars = index + 1;
  }

  onMouseLeave() {
    this.filledStars = this.rating;
  }

  onStarClicked(index: number) {
    this.rating = parseFloat(((this.rating * (this.ratingWeight-1) + (index + 1))/10).toFixed(2));
    this.ratingChange.emit(this.rating);
  }

  get ratingInTen(): number {
    return Math.round((this.rating / this.stars.length) * 10 * 10) / 10;
  }
}
