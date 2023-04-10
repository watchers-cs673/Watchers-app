import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../user-list/user-list.component';

interface UserData {
  posts: number;
  followers: number;
  following: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements User {
  public userName = 'Test User';
  public email = '';
  public userData: UserData = {posts: 2, followers: 3, following: 2};
  public followersList: User[] = [
    {name: 'John Doe'},
    {name: 'Jane Smith'},
    {name: 'Hugh Jass'}
  ];
  public followingList: User[] = [
    {name: 'Bob Johnson'},
    {name: 'Alice Brown'}
  ];
  public showList = false;
  public listTitle = '';
  public profileItems: string[] = [];

  @Output() followersData = new EventEmitter<User[]>();

  ngOnInit() {
    this.userData.posts = 3; // replace with the actual number of posts
    this.userData.followers = this.followersList.length;
    this.userData.following = this.followingList.length;
  }

  constructor(public auth: AuthService) {
    auth.user$.subscribe((data) => {
      if (data?.email) {
        this.userName = data.name || '';
        this.email = data.email || '';
      }
    });
  }
  name!: string;

  public showFollowers() {
    this.listTitle = 'Followers';
    this.profileItems = this.followersList.map(user => user.name);
    this.showList = true;
    this.followersData.emit(this.followersList);
    this.userData = {
      posts: this.userData.posts,
      followers: this.followersList.length,
      following: this.userData.following
    };
  }

  public showPosts() {
    this.listTitle = 'Posts';
    this.profileItems = ['Post 1', 'Post 2', 'Post 3'];
    this.showList = true;
    this.userData = {
      posts: this.profileItems.length,
      followers: this.userData.followers,
      following: this.userData.following
    };
  }

  public showFollowing() {
    this.listTitle = 'Following';
    this.profileItems = this.followingList.map(user => user.name);
    this.showList = true;
    this.userData = {
      posts: this.userData.posts,
      followers: this.userData.followers,
      following: this.followingList.length
    };
  }
}
