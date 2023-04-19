import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { MovieService } from '../services/movie-service';

interface Movie {
  name: string;
  rating: number;
  genre: string;
  imgPath: string;
  runTime?: string;
  year?: number;
  summary?: string;
}
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
  public profile = this.auth.user$;
  constructor(public auth: AuthService, private movieService: MovieService) {
    console.log(movieService.getData())
    this.images$ = movieService.getData();
    this.catogories$ = movieService.getGenres();
    this.getRandomImages();
  }


  getRandomImages() {
    this.images$.subscribe(image => {
      const randomIndices = this.getRandomIndices(image.length, 3);
      const randomImages = randomIndices.map(i => image[i]);
      this.randomImages = this.shuffle(randomImages);
    })
  }

  getRandomIndices(max: number, count: number): number[] {
    const indices = Array.from({length: max}, (_, i) => i);
    return indices.sort(() => Math.random() - 0.5).slice(0, count);
  }

  shuffle(array: any[]): any[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  currentIndex = 1;

  // public nextImage() {
  //   if (this.currentIndex == 2) {
  //     this.currentIndex = 0;
  //   } else {
  //     this.currentIndex = (this.currentIndex + 1) % this.images.length;
  //   }
  // }

  // public prevImage() {
  //   if (this.currentIndex == 0) {
  //     this.currentIndex = 2;
  //   } else {
  //     this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  //   }
    
  // }

  public imageClicked(index: number) {
    this.currentIndex = index;
  }

  
}
