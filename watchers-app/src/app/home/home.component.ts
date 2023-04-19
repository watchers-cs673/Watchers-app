import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { MovieService } from '../services/movie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public images: any[];
  randomImages: { imgPath: string, link: string, name: string }[] = [];
  public title = 'watchers';
  public profile = this.auth.user$;
  constructor(public auth: AuthService, private movieService: MovieService) {
    this.images = movieService.allMovies,
    this.getRandomImages();
  }


  getRandomImages() {
    const randomIndices = this.getRandomIndices(this.images.length, 3);
    const randomImages = randomIndices.map(i => this.images[i]);
    this.randomImages = this.shuffle(randomImages);
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

  catogories = [
    {src: 'assets/pic1_2.png', title: 'Horror', link: '/discussion'},
    {src: 'assets/pic1_7.png', title: 'Musical', link: '/discussion'},
    {src: 'assets/pic1_6.png', title: 'Romance', link: '/discussion'},
    {src: 'assets/pic2_9.png', title: 'Action', link: '/discussion'},
    {src: 'assets/pic1_1.png', title: 'Comedy', link: '/discussion'},
  ];
  currentIndex = 1;

  public nextImage() {
    if (this.currentIndex == 2) {
      this.currentIndex = 0;
    } else {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }
  }

  public prevImage() {
    if (this.currentIndex == 0) {
      this.currentIndex = 2;
    } else {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    }
    
  }

  public imageClicked(index: number) {
    this.currentIndex = index;
  }

  
}
