import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DiscussionComponent } from './discussion.component';
import { MovieService } from '../services/movie-service';
import { AuthService, Auth0ClientService } from '@auth0/auth0-angular';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { LoginComponent } from '../login/login.component';

describe('DiscussionComponent', () => {
  let component: DiscussionComponent;
  let fixture: ComponentFixture<DiscussionComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [MovieService, AuthService, {provide: Auth0ClientService, useValue: {}}],
      declarations: [ DiscussionComponent,ToolbarComponent,LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the movie$', () => {
    expect(component.movie$).toBeDefined();
  });

  it('should set the User', () => {
    expect(component.currentUser).toBeDefined();
  });

  it('should set the favorites', () => {
    expect(component.favorites).toBeDefined();
  });

  it('should set the want to watch movies', () => {
    expect(component.wantToWatch).toBeDefined();
  });

  it('should set the comments', () => {
    expect(component.comments).toBeDefined();
  });

  it('should set the rating', () => {
    expect(component.rating).toEqual(0);
  });

  it('should set the default selected tab summary', () => {
    expect(component.selectedTab).toEqual('summary');
  });

  it('should change the selected tab', () => {
    const tabName = 'tabName1';
    component.selectTab(tabName);
    expect(component.selectedTab).toBe(tabName);
  });

  it('should sort comments by likes in descending order', () => {
    const comments = [
      { author: 'Alice', content: 'I agree', topic: 'Summary', date: new Date('2023-05-02'), likes: 3 },
      { author: 'John', content: 'Great movie!', topic: 'Summary', date: new Date('2023-05-01'), likes: 5 },
      { author: 'Bob', content: 'Not my cup of tea', topic: 'Summary', date: new Date('2023-05-03'), likes: 1 },
    ];
    component.comments = comments;
    const sorted = component.sortByLikes();
    expect(sorted).toEqual([
      { author: 'John', content: 'Great movie!', topic: 'Summary', date: new Date('2023-05-01'), likes: 5 },
      { author: 'Alice', content: 'I agree', topic: 'Summary', date: new Date('2023-05-02'), likes: 3 },
      { author: 'Bob', content: 'Not my cup of tea', topic: 'Summary', date: new Date('2023-05-03'), likes: 1 },
    ]);
  });

  it('should sort comments by date in descending order', () => {
    const comments = [
      { author: 'Alice', content: 'I agree', topic: 'Summary', date: new Date('2023-05-02'), likes: 3 },
      { author: 'John', content: 'Great movie!', topic: 'Summary', date: new Date('2023-05-01'), likes: 5 },
      { author: 'Bob', content: 'Not my cup of tea', topic: 'Summary', date: new Date('2023-05-03'), likes: 1 },
    ];
    component.comments = comments;
    const sorted = component.sortByDate();
    expect(sorted).toEqual([
      { author: 'Bob', content: 'Not my cup of tea', topic: 'Summary', date: new Date('2023-05-03'), likes: 1 },
      { author: 'Alice', content: 'I agree', topic: 'Summary', date: new Date('2023-05-02'), likes: 3 },
      { author: 'John', content: 'Great movie!', topic: 'Summary', date: new Date('2023-05-01'), likes: 5 },
    ]);
  });

  // it('should return a friendly date string', () => {
  //   const date = new Date('2023-05-01');
  //   const result = component.getFriendlyDate(date);
  //   expect(result).toEqual('5/1/2023');
  // });

  it('should like a comment', () => {
    const comment = {
      author: 'Jane Doe',
      content: 'Great movie!',
      topic: 'discussion',
      date: new Date(),
      likes: 0
    };
    component.comments = [comment];
    component.likeComment(comment);
    expect(component.comments[0].likes).toBe(1);
  });
  
  it('should add a comment', () => {
    component.addComment('topic', 'comment');
    expect(component.comments.length).toBe(1);
    expect(component.selectedTab).toBe('new');
  });

  it('should add movie to favorites if it is not already a favorite', () => {
    const movie = 'The Shawshank Redemption';
    spyOn(component.favorites, 'includes').and.returnValue(false);
    component.addToFavorites(movie);
    expect(component.favorites).toContain(movie);
  });

  it('should remove movie from favorites if it is already a favorite', () => {
    const movie = 'The Dark Knight';
    spyOn(component.favorites, 'includes').and.returnValue(true);
    component.addToFavorites(movie);
    expect(component.favorites).not.toContain(movie);
  });

  it('should add movie to want to watch movies if it is not already a want to watch movies', () => {
    const movie = 'The Shawshank Redemption';
    spyOn(component.wantToWatch, 'includes').and.returnValue(false);
    component.addToFavorites(movie);
    expect(component.wantToWatch).toContain(movie);
  });

  it('should remove movie from want to watch movies if it is already a want to watch movies', () => {
    const movie = 'The Dark Knight';
    spyOn(component.wantToWatch, 'includes').and.returnValue(true);
    component.addToFavorites(movie);
    expect(component.wantToWatch).not.toContain(movie);
  });
});
