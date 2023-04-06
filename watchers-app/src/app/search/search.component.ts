import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../services/movie-service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  public searchTerm: string = '';
  public catogories: any[];
  public movies: any[];
  public filteredMovies: any[];

  constructor(private movieService: MovieService) {
    this.catogories = movieService.allMovies.map(movie => movie.genre);
    this.movies = movieService.allMovies;
    this.filteredMovies = this.movies;
  }

  public onSearch() {
    if (this.searchTerm.startsWith('@')){
      console.log('TODO: user search')
    }
    else {
      this.filteredMovies = this.movies.filter(movie => 
        movie.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

}
