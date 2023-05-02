import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../services/movie-service';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { ApiService } from '../services/api.service';
import { EventEmitter } from 'stream';
import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user'
import { AuthService } from '@auth0/auth0-angular';
import { Movie } from '../interfaces/movie';

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
  public headerText = '';
  public AllUsers: User[] = [];
  public showProfileButton = false;
  public router: Router;


  constructor(
    private movieService: MovieService, 
    private activatedRoute: ActivatedRoute, 
    private apiService: ApiService, 
    private auth: AuthService,
    router: Router) {
    this.router = router;
    this.movies$ = movieService.getData();
    this.showProfileButton = auth.user$ != null;
    this.genre = activatedRoute.snapshot.params["genre"];
    if(this.genre) {
      this.filterByGenre(this.genre);
    }
    else {
      this.genre = 'All Movies'
    }
    this.headerText = this.genre;
    this.filteredMovies$ = this.movies$;
  }

  public filterByGenre(genre: string) {
    this.movies$ = this.movies$.pipe(map(movies => {
      return movies = movies.filter(movie => movie.genre.indexOf(genre)!==-1);
    }));
  }

  public onSearch() {
    if (this.searchTerm.startsWith('@')){
      this.headerText = "Users";
      this.apiService.getAllUsers().subscribe((users) => {
        this.AllUsers = users as User[];
      });
    }

    else {
      this.headerText = this.genre;
      this.filteredMovies$ = this.movies$.pipe(map(movies => {
        return movies.filter(movie => movie.name.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase()))
      }));
    }
  }

  public goToProfile(email: string) {
    this.router.navigate(['/profile', email])
  }

}
