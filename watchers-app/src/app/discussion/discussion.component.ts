import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie-service';
import { Observable } from 'rxjs';

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
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent {
  public title = "watchers";
  public rating: number = 0;
  // current tab
  public selectedTab = 'summary';
  public movie$: Observable<Movie | undefined>;
  name: string = "";
  year: string = "";
  imgPath: string = "";
  description: string = "";

  // switch tab
  selectTab(tabName: string) {
    this.selectedTab = tabName;
  }

  comments = [
    {topic: 'Discussion Topic 1', content: 'Content 1...', date: 'date', author: 'author'},
    {topic: 'Discussion Topic 2', content: 'Content 2...', date: 'date', author: 'author'},
    {topic: 'Discussion Topic 3', content: 'Content 3...', date: 'date', author: 'author'},
    {topic: 'Discussion Topic 4', content: 'Content 4...', date: 'date', author: 'author'},
    {topic: 'Discussion Topic 5', content: 'Content 5...', date: 'date', author: 'author'},
    {topic: 'Discussion Topic 6', content: 'Content 6...', date: 'date', author: 'author'},
    // ...
  ];


  constructor(private route: ActivatedRoute, private movieService: MovieService) {  
    let movieName = this.route.snapshot.paramMap.get('name');
    this.movie$ = movieService.getMovie(movieName ? movieName : "");
  }

}
