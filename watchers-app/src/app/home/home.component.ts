import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'watchers';
  images = [
    {src: 'https://picsum.photos/900/500?random=1', alt: 'Image 1', link: '/discussion'},
    {src: 'https://picsum.photos/900/500?random=2', alt: 'Image 2', link: '/discussion'},
    {src: 'https://picsum.photos/900/500?random=3', alt: 'Image 3', link: '/discussion'},
    // ...
  ];
  catogories = [
    {src: 'assets/pic1_2.png', title: 'Horror', link: '/discussion'},
    {src: 'assets/pic1_7.png', title: 'Musical', link: '/discussion'},
    {src: 'assets/pic1_6.png', title: 'Romantic', link: '/discussion'},
    {src: 'assets/pic2_9.png', title: 'Action', link: '/discussion'},
    {src: 'assets/pic1_1.png', title: 'Comedy', link: '/discussion'},
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
