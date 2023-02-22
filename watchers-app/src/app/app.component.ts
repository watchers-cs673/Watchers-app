import { transition } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})

export class AppComponent {
  title = 'watchers-app';
  images = [
    {src: 'https://picsum.photos/900/500?random=1', alt: 'Image 1'},
    {src: 'https://picsum.photos/900/500?random=2', alt: 'Image 2'},
    {src: 'https://picsum.photos/900/500?random=3', alt: 'Image 3'},
    // ...
  ];
  catogories = [
    {src: 'assets/pic1_2.png', title: 'Horror'},
    {src: 'assets/pic1_7.png', title: 'Musical'},
    {src: 'assets/pic1_6.png', title: 'Romantic'},
    {src: 'assets/pic2_9.png', title: 'Action'},
    {src: 'assets/pic1_1.png', title: 'Comedy'},
  ];
  currentIndex = 1;

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  imageClicked(index: number) {
    this.currentIndex = index;
  }
}

