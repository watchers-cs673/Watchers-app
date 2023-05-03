import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { MovieService } from '../services/movie-service';
import { AuthService, Auth0ClientService } from '@auth0/auth0-angular';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { LoginComponent } from '../login/login.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [MovieService, AuthService, {provide: Auth0ClientService, useValue: {}}],
      declarations: [ HomeComponent, ToolbarComponent, LoginComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set catogories$', () => {
    expect(component.catogories$).toBeDefined();
  });

  it('should set images$', () => {
    expect(component.images$).toBeDefined();
  });

  it('should set images$', () => {
    expect(component.images$).toBeDefined();
  });

  it('should initialize randomImages to an empty array', () => {
    expect(component.randomImages).toEqual([]);
  });

  it('should initialize currentIndex to 1', () => {
    expect(component.currentIndex).toEqual(1);
  });

  it('should initialize imageIndex to 1', () => {
    expect(component.imageIndex).toEqual(1);
  });

  it('should shuffle an array correctly', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = component.shuffle(array);
    expect(shuffled).not.toBe(array);
    expect(shuffled.length).toEqual(array.length);
    expect(shuffled.sort()).toEqual(array.sort());
  });

  
});
