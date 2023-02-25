import { Component, Input, Output, EventEmitter } from '@angular/core';

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
        color: yellow;
      }
    `,
  ],
})
export class StarRatingComponent {
  @Input() rating = 0;
  @Output() ratingChange = new EventEmitter<number>();

  filledStars = 0;
  stars = [1, 2, 3, 4, 5];

  constructor() {}

  onMouseOver(index: number) {
    this.filledStars = index + 1;
  }

  onMouseLeave() {
    this.filledStars = this.rating;
  }

  onStarClicked(index: number) {
    this.rating = index + 1;
    this.ratingChange.emit(this.rating);
  }

  get ratingInTen(): number {
    return Math.round((this.rating / this.stars.length) * 10 * 10) / 10;
  }
}
