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
});
