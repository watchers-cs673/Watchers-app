import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../services/movie-service';
import { DomSanitizer } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';

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
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  public searchTerm: string = '';
  public movies$: Observable<Movie[]>;
  public filteredMovies$: Observable<Movie[]>;
  public genre;

  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute) {
    this.movies$ = movieService.getData();
    this.genre = activatedRoute.snapshot.params["genre"];
    if(this.genre) {
      this.filterByGenre(this.genre);
    }
    else {
      this.genre = 'All Movies'
    }
    this.filteredMovies$ = this.movies$;
  }

  public filterByGenre(genre: string) {
    this.movies$ = this.movies$.pipe(map(movies => {
      return movies = movies.filter(movie => movie.genre ==  genre);
    }));
  }

  public onSearch() {
    if (this.searchTerm.startsWith('@')){
      console.log('TODO: user search')
    }
    else {
      this.filteredMovies$ = this.movies$.pipe(map(movies => {
        return movies.filter(movie => movie.name.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase()))
      }));
    }
  }

}
