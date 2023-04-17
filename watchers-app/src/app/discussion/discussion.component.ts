import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit{
  title = "watchers";
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

  name: string | null = null;
  imgPath: string | null = null;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.imgPath = this.route.snapshot.paramMap.get('imgPath');
    this.name = this.route.snapshot.paramMap.get('name');
  }

}
