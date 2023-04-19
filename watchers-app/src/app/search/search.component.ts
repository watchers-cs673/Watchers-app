import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../services/movie-service';
import { DomSanitizer } from '@angular/platform-browser';

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
  public genre: string = '';

  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.catogories = movieService.allMovies.map(movie => movie.genre);
    this.movies = movieService.allMovies;
    this.genre = activatedRoute.snapshot.params["genre"];
    if(this.genre) {
      this.filterByGenre(this.genre);
    }
    else {
      this.genre = 'All Movies'
    }
    this.filteredMovies = this.movies;
  }

  public getSantizeUrl(url : string) {
    console.log(url);
    return this.sanitizer.bypassSecurityTrustUrl(`url(`+url+')');
  }

  public filterByGenre(genre: string) {
    this.movies = this.movies.filter(movie => movie.genre==genre);
    console.log(this.filteredMovies)
  }

  public onSearch() {
    if (this.searchTerm.startsWith('@')){
      console.log('TODO: user search')
    }
    else {
      this.filteredMovies = this.movies.filter(movie => 
        movie.name && movie.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

}
