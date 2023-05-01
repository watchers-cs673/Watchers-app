import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from '../services/user-service';
import { User } from '../interfaces/user';
import { Comment } from '../interfaces/comment';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie-service';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  // variable to store if the current user is following the owner of the profile
  public isFollowing = false;
  // we should not show the 'follow' button if it's the users own profile, so we store this is the isMyProfile var
  public isMyProfile = true;
  // stores follower, following, and comments list for easier access
  public followersList: User[] = [];
  public followingList: User[] = [];
  public comments: Comment[] = [];
  // shows or hides lists of followers or comments
  // profileItems stores the string value of the list we are viewing (comment titles, follower usernames, or following usernames)
  public showList = false;
  public listTitle = '';
  public profileItems: string[] = [];

  //variable for the user data of the profile owner (not necessarily the current user if the user is viewing someone elses profile)
  public user: User = {username: '', email: '', likes: [], comments: [], followers: [], following: []};
  public favoriteMovies: string[] = [];

  ngOnInit() {
    this.followersList = this.user.followers;
    this.followingList = this.user.following;
    this.comments = this.user.comments;
  }

  constructor(
    public auth: AuthService, 
    private userService: UserService, 
    public activatedRoute: ActivatedRoute, 
    public router: Router, 
    public movieService: MovieService,
    public apiService: ApiService) {
    
    // if a url param exists, the user is viewing someone elses profile, so we get the data right from the db
    if(activatedRoute.snapshot.params["email"]) {
      this.isMyProfile = false;
      // if user doesn't exist (ie. user manually adds the parameter or user was deleted for some reason)
      // we should route back to the home page
      if(!this.user) {
        router.navigate(['/']);
      }
      this.apiService.getUser(activatedRoute.snapshot.params["email"]).subscribe(data => {
        console.log(data);
        this.user = {
          username:data['username'],
          email: data['email'],
          likes: [],
          comments: data['comments'],
          followers: [],
          following: []
        }
      });
    }
    // if no url param exists, the user is viewing their own profile, so we get teh data from auth0 and then call the db
    else {
      auth.user$.subscribe((data) => {
        if (data?.email && data.email) {
         // this.user = this.userService.getUserByEmail(data.email? data.email : '');
          this.apiService.getUser(data.email).subscribe(data => {
            console.log(data)
            this.user = {
              username:data['username'],
              email: data['email'],
              likes: [],
              comments: data['comment'],
              followers: [],
              following: []
            }
          });
        }
        // if no user is logged in or specific in the params, we should route back to the homepage
        // this scenario would only happen if the user appends '/profile' manually to the url
        else {
          router.navigate(['/']);
        }
      });
    }
    this.favoriteMovies = this.userService.getFavorites();
  }

  public followUser() {
    // Add logic to follow the user and update the isFollowing property
    this.isFollowing = !this.isFollowing;
  }

  // maps followers list to just usernames for easier viewing
  public showFollowers() {
    this.listTitle = 'Followers';
    this.profileItems = this.followersList.map(user => user.username);
    this.showList = true;
  }
  // maps posts to just main content for easier viewing
  public showPosts() {
    this.listTitle = 'Posts';
    this.profileItems = this.comments.map(comment => comment.content);
    this.showList = true;
  }
  // maps followers to just username for easier viewing
  public showFollowing() {
    this.listTitle = 'Following';
    this.profileItems = this.user.following.map(user => user.username);
    this.showList = true;
  }
}
