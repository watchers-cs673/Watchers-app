import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchTerm: string = '';
  options: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  filteredOptions: string[] = [];

  ngOnInit() {
    this.filteredOptions = this.options;
  }

  filterOptions() {
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  catogories = [
    {src: 'assets/pic1_4.png', title: 'movie 1', link: '/discussion'},
    {src: 'assets/pic1_5.png', title: 'movie 2', link: '/discussion'},
    {src: 'assets/pic1_8.png', title: 'movie 3', link: '/discussion'},
    {src: 'assets/pic2_8.png', title: 'movie 4', link: '/discussion'},
    {src: 'assets/pic2_7.png', title: 'movie 5', link: '/discussion'},
    {src: 'assets/pic1_3.png', title: 'movie 6', link: '/discussion'},
  ];

  
}
