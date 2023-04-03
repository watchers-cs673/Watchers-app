import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchTerm: string = '';
  catogories: any[];
  filteredCatogories: any[];
  options: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  filteredOptions: any[] = [];

  constructor() {
    this.catogories = [
      {src: 'assets/pic1_4.png', title: 'movie 1', link: '/discussion'},
      {src: 'assets/pic1_5.png', title: 'movie 2', link: '/discussion'},
      {src: 'assets/pic1_8.png', title: 'movie 3', link: '/discussion'},
      {src: 'assets/pic2_8.png', title: 'movie 4', link: '/discussion'},
      {src: 'assets/pic2_7.png', title: 'movie 5', link: '/discussion'},
      {src: 'assets/pic1_3.png', title: 'movie 6', link: '/discussion'},
      {src: "assets/poster1_1.jpg", title: 'avatar', link: '/discussion'},
    ];
    this.filteredCatogories = this.catogories;
  }

  users: string[] = ['User1', 'User2', 'User3'];

  onSearch() {
    this.filteredCatogories = this.catogories.filter(catogory => 
      catogory.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  ngOnInit() {
    this.filteredOptions = this.catogories;
  }

  filterOptions() {
    if (this.searchTerm.startsWith('@')) { // User search
    this.filteredOptions = this.users.filter(user =>
      user.toLowerCase().includes(this.searchTerm.substr(1).toLowerCase())
    );
    } else {
      // Search for categories
      this.filteredOptions = this.catogories.filter(category =>
        category.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // catogories = [
  //   {src: 'assets/pic1_4.png', title: 'movie 1', link: '/discussion'},
  //   {src: 'assets/pic1_5.png', title: 'movie 2', link: '/discussion'},
  //   {src: 'assets/pic1_8.png', title: 'movie 3', link: '/discussion'},
  //   {src: 'assets/pic2_8.png', title: 'movie 4', link: '/discussion'},
  //   {src: 'assets/pic2_7.png', title: 'movie 5', link: '/discussion'},
  //   {src: 'assets/pic1_3.png', title: 'movie 6', link: '/discussion'},
  // ];

  
}
