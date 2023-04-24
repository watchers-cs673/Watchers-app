import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie-service';
import { Observable, of } from 'rxjs';

interface Movie {
  name: string;
  rating: number;
  genre: string;
  imgPath: string;
  runTime?: string;
  year?: number;
  summary?: string;
}

interface Comment {
  author: string;
  date: string;
  rating: number;
  content: string;
  topic: string; 
}


@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent {
  public title = "watchers";
  public rating: number = 0;
  // current tab
  public selectedTab = 'summary';
  //public movie$: Observable<Movie | undefined>;
  public movie$: Observable<Movie | undefined> = of(undefined);
  public comments: Comment[] = [];
  public comment: string = '';
  name: string = "";
  year: string = "";
  imgPath: string = "";
  description: string = "";

  


  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    let movieName = this.route.snapshot.paramMap.get('name');
    if (name !== null) {
      this.movie$ = this.movieService.getMovie(movieName ? movieName : "");
      // Load comments for this movie from a service and assign them to this.comments
    }
  }
  
   // switch tab
  selectTab(tabName: string) {
    this.selectedTab = tabName;
  }

  Comment = [
    {topic: 'Discussion Topic 1', content: 'Content 1...', date: 'date', author: 'author'},
    {topic: 'Discussion Topic 2', content: 'Content 2...', date: 'date', author: 'author'},
    {topic: 'Discussion Topic 3', content: 'Content 3...', date: 'date', author: 'author'},
    {topic: 'Discussion Topic 4', content: 'Content 4...', date: 'date', author: 'author'},
    {topic: 'Discussion Topic 5', content: 'Content 5...', date: 'date', author: 'author'},
    {topic: 'Discussion Topic 6', content: 'Content 6...', date: 'date', author: 'author'},
    // ...
  ];
  

  submitForm() {
    if (!this.comment) {
      return;
    }
    const newComment: Comment = {
      author: 'User',
      date: new Date().toISOString(),
      rating: this.rating,
      content: this.comment,
      topic: 'Reviews',
    };
    // Add the new comment to the comments array
    this.comments.push(newComment);
    // Reset the form
    this.rating = 0;
    this.comment = '';
  }
}
