import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  randomImages: { src: string, link: string }[] = [];
  constructor(public auth: AuthService,){this.getRandomImages();}
  public title = 'watchers';
  public profile = this.auth.user$;
  images = [
    {src: 'assets/trending1_3.png', alt: 'Image 1', link: '/discussion'},
    {src: 'assets/trending1_4.png', alt: 'Image 2', link: '/discussion'},
    {src: 'assets/trending1_5.png', alt: 'Image 3', link: '/discussion'},
    {src: 'assets/trending1_8.png', alt: 'Image 4', link: '/discussion'},
    {src: 'assets/trending1_9.png', alt: 'Image 5', link: '/discussion'},
    {src: 'assets/trending2_1.png', alt: 'Image 6', link: '/discussion'},
    {src: 'assets/trending2_2.png', alt: 'Image 7', link: '/discussion'},
    {src: 'assets/trending2_3.png', alt: 'Image 8', link: '/discussion'},
    {src: 'assets/trending2_4.png', alt: 'Image 9', link: '/discussion'},
    {src: 'assets/trending2_5.png', alt: 'Image 10', link: '/discussion'},
    {src: 'assets/trending2_6.png', alt: 'Image 11', link: '/discussion'},
    {src: 'assets/trending2_7.png', alt: 'Image 12', link: '/discussion'},
    {src: 'assets/trending2_8.png', alt: 'Image 13', link: '/discussion'},

    // ...
  ];


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
