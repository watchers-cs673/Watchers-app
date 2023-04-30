import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from '../services/user-service';
import { User } from '../interfaces/user';
import { Comment } from '../interfaces/comment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public isFollowing = false;
  public email = '';
  public followersList: User[] = [];
  public followingList: User[] = [];
  public comments: Comment[] = [];
  public showList = false;
  public listTitle = '';
  public profileItems: string[] = [];

  public userEmail = 'sophiemcq@live.com';
  public user: User = {username: '', email: '', likes: [], comments: [], followers: [], following: []};

  @Output() followersData = new EventEmitter<User[]>();

  ngOnInit() {
    this.followersList = this.user.followers;
    this.followingList = this.user.following;
    this.comments = this.user.comments;
  }

  constructor(public auth: AuthService, private userService: UserService) {
    auth.user$.subscribe((data) => {
      if (data?.email) {
        this.user = this.userService.getUser(data.email? data.email : '');
      }
    });
  }

  public followUser() {
    // Add logic to follow the user and update the isFollowing property
    this.isFollowing = true;
  }

  public showFollowers() {
    this.listTitle = 'Followers';
    this.profileItems = this.followersList.map(user => user.username);
    this.showList = true;
  }

  public showPosts() {
    this.listTitle = 'Posts';
    this.profileItems = this.comments.map(comment => comment.content);
    this.showList = true;
  }

  public showFollowing() {
    this.listTitle = 'Following';
    this.profileItems = this.user.following.map(user => user.username);
    this.showList = true;
  }
}
