import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { MovieService } from '../services/movie-service';
import { Movie } from '../interfaces/movie'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public images$: Observable<Movie[]>;
  public catogories$: Observable<any[]>;
  randomImages: { imgPath: string, link: string, name: string }[] = [];
  public title = 'watchers';
  constructor(public auth: AuthService, private movieService: MovieService) {
    this.images$ = movieService.getData();
    this.catogories$ = movieService.getGenres();
    this.getHighestRating(0,1,2);
  }


  getHighestRating(left: number, mid: number, right: number) {
    this.images$.subscribe(image => {
      const sortedImages = image.sort((a, b) => b.rating - a.rating);
      const randomIndices = [left,mid,right];
      const randomImages = randomIndices.map(i => sortedImages[i]);
      this.randomImages = this.shuffle(randomImages);
    });
  }


  shuffle(array: any[]): any[] {
    const shuffledArray = [...array];
    return shuffledArray;
  }

  currentIndex = 1;
  imageIndex = 1;

  public nextImage() {
    this.imageIndex++;
    this.getHighestRating((this.imageIndex - 1) % 10, this.imageIndex % 10, (this.imageIndex + 1) % 10);
  }

  public prevImage() {
    this.imageIndex--;
    if (this.imageIndex < 1) {
      this.imageIndex = this.imageIndex + 10;
    }
    this.getHighestRating((this.imageIndex - 1) % 10, this.imageIndex % 10, (this.imageIndex + 1) % 10);
    
  }

  public imageClicked(index: number) {
    this.currentIndex = index;
  }

  
}
