import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchComponent } from './search.component';
import { MovieService } from '../services/movie-service';
import { ApiService } from '../services/api.service';
import { AuthService, Auth0ClientService } from '@auth0/auth0-angular';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from '../interfaces/movie';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [MovieService, ApiService, AuthService, {provide: Auth0ClientService, useValue: {}}],
      declarations: [ SearchComponent ]
    })
    .compileComponents();
  
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty search term', () => {
    expect(component.searchTerm).toEqual('');
  });

  it('should set movies$', () => {
    expect(component.movies$).toBeDefined();
  });
  
  it('should set filteredMovies$', () => {
    expect(component.filteredMovies$).toBeDefined();
  });

  it('should create an empty array for AllUsers', () => {
    expect(component.AllUsers).toEqual([]);
  });

  it('should set genre to "All Movies" if activatedRoute has no genre parameter', () => {
    expect(component.genre).toBe('All Movies');
  });

  it('should filter movies by genre', () => {
    const genre = 'Action';
    const movies: Movie[] = [
      { name: 'Movie 1', rating: 4, genre: 'Action', imgPath: '' },
      { name: 'Movie 2', rating: 3, genre: 'Drama', imgPath: '' },
      { name: 'Movie 3', rating: 5, genre: 'Action', imgPath: '' }
    ];
    component.filterByGenre(genre);
    component.movies$.subscribe(filteredMovies => {
      expect(filteredMovies.length).toBe(2);
      expect(filteredMovies.every(movie => movie.genre === genre)).toBeTruthy();
    });
  });

  it('should navigate to profile page', () => {
    const email = 'test@example.com';
    component.goToProfile(email);
    expect(router.navigate).toHaveBeenCalledWith(['/profile', email]);
  });


});
