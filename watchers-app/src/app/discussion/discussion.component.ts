import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent {
  title = "wAtchers";
  rating: number = 0;
  // current tab
  selectedTab = 'summary';

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
}
