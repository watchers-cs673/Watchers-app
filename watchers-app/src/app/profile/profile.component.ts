import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../interfaces/user';
import { Comment } from '../interfaces/comment';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie-service';
import { ApiService } from '../services/api.service';
import { Movie } from '../interfaces/movie'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  // variable to store if the current user is following the owner of the profile
  public isFollowing = false;
  // stores follower, following, and comments list for easier access
  public followersList: string[] = [];
  public followingList: string[] = [];
  public comments: Comment[] = [];
  // shows or hides lists of followers or comments
  // profileItems stores the string value of the list we are viewing (comment titles, follower usernames, or following usernames)
  public showList = false;
  public listTitle = '';
  public profileItems: string[] = [];
  public isMyProfile = true;

  //variable for the user data of the profile owner (not necessarily the current user if the user is viewing someone elses profile)
  public user: User = {username: '', email: '', likes: [], comments: [], followingList: ''};
  public loggedInUser: User = {username: '', email: '', likes: [], comments: [], followingList: ''};

  ngOnInit() {
    this.followersList = this.user.followingList? this.user.followingList.split(',') : [];
    this.followingList = this.user.followingList? this.user.followingList.split(',') : [];
    this.comments = [];
  }

  constructor(
    public auth: AuthService, 
    public activatedRoute: ActivatedRoute, 
    public router: Router, 
    public movieService: MovieService,
    public apiService: ApiService) {
    
          // if no url param exists, the user is viewing their own profile, so we get teh data from auth0 and then call the db
    // If user has an Auth0 account, try and get their data from the database
    auth.user$.subscribe((data) => {
      if (data?.email && data.email) {
        this.apiService.getOrCreateUser(data.email).subscribe((data: any) => {
          this.loggedInUser = {
            username:data['username'],
            email: data['email'],
            likes: [],
            comments: data['comments'],
            followingList: data['followingList'] ? data['followingList'].split(',') : []
          }
          if(!activatedRoute.snapshot.params["email"]) {
            this.user=this.loggedInUser;
          }
        });
      }
      else {
        // if no user is logged in or specific in the params, we should route back to the homepage
        // this scenario would only happen if the user appends '/profile' manually to the url
        router.navigate(['/']);
      }
    });
    // if a url param exists, the user is viewing someone elses profile, so we get the data right from the db
    if(activatedRoute.snapshot.params["email"]) {
      console.log(activatedRoute.snapshot.params)
      this.isMyProfile = false;
      this.apiService.getUser(activatedRoute.snapshot.params["email"]).subscribe(data => {
        console.log(data)
        this.user = {
          username:data['username'],
          email: data['email'],
          likes: [],
          comments: data['comments'],
          followingList: data['followingList'] ? data['followingList'].split(',') : []
        }
        // if user doesn't exist (ie. user manually adds the parameter or user was deleted for some reason)
        // we should route back to the home page
        if(!this.user) {
          router.navigate(['/']);
        }
      });
    }

  }

  public followUser() {
    // only follow use if it is not user's profile (you can't follow yourself)
    if(this.user.email !== this.loggedInUser.email) {
      let currentFollowing = this.loggedInUser.followingList ? this.loggedInUser.followingList  : '';
      // if they are already following this user, remove them
      if(currentFollowing && currentFollowing.indexOf(this.user.email)!==-1) {
        if(currentFollowing.indexOf(","+this.user.email)!==-1) {
          currentFollowing = currentFollowing.replace(","+this.user.email, "");
        }
        else if(currentFollowing.indexOf(this.user.email+",")!==-1){
          currentFollowing = currentFollowing.replace(this.user.email+",", "");
        }
        else {
          currentFollowing = "";
        }
      }
      // if they are not following this user, and they already have following users, append to following list
      else if (currentFollowing && currentFollowing.length >0) {
        currentFollowing = currentFollowing + ","+this.user.email;
      }
      // if they have no following list, create the following list
      else {
        currentFollowing = this.user.email;
      }
      this.apiService.addFollowing(this.loggedInUser.email, currentFollowing).subscribe(user => {
        this.isFollowing = !this.isFollowing;
      });
    }
  }

  // maps followers list to just usernames for easier viewing
  public showFollowers() {
    this.listTitle = 'Followers';
  //  this.profileItems = this.followersList;
    this.showList = true;
  }
  // maps posts to just main content for easier viewing
  public showPosts() {
    this.listTitle = 'Posts';
  //  this.profileItems = this.comments.map(comment => comment.content);
    this.showList = true;
  }
  // maps followers to just username for easier viewing
  public showFollowing() {
    this.listTitle = 'Following';
    let list = this.user.followingList;
    if(list) {
      if(list.length>0 && list.indexOf(',')!=-1) {
        this.profileItems = list.split(',');
      }
      else {
        this.profileItems = [list]
      }
    }
    this.showList = true;
  }
}
