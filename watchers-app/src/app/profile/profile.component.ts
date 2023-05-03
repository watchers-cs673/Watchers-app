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
  public comments: Comment[] = [];
  // shows or hides lists of followers or comments
  // profileItems stores the string value of the list we are viewing (comment titles, follower usernames, or following usernames)
  public showList = false;
  public listTitle = '';
  public profileItems: string[] = [];

  // variable to store if this is the user's profile so that we can hide certain components (ie. the Follow button)
  // since we don't want the user to follow themselves
  public isMyProfile = true;

  //variable for the user data of the profile owner (not necessarily the current user if the user is viewing someone elses profile)
  public user: User = {username: '', email: '', likes: [], comments: [], favorites: [], followingList: [], wantToWatch: []};
  public loggedInUser: User = {username: '', email: '', likes: [], comments: [], favorites: [], followingList: [], wantToWatch: []};
  // we store all Users because the profile owner's followers are obtained by checking the 'followingList' of all the application users
  public allUsers: any[] = [];

  public posts: any[] = [];

  public ngOnInit() {
    this.comments = [];
  }

  constructor(
    public auth: AuthService, 
    public activatedRoute: ActivatedRoute, 
    public router: Router, 
    public movieService: MovieService,
    public apiService: ApiService) {
    //first we get the user data so we can see whose profile we're on
    this.getUserData();
  }

  public getUserData() {
    // if no url param exists, the user is viewing their own profile, so we get the data from auth0 and then call the db
    // If user has an Auth0 account, try and get their data from the database
    this.auth.user$.subscribe((data) => {
      // first we check Auth0 to see if the user has created a profile
      if (data?.email && data.email) {
        // if the user exists in Auth0, we check the database for their data
        this.apiService.getOrCreateUser(data.email).subscribe((data: any) => {
          this.apiService.getAllUsers().subscribe(response => {
            // we have to call getAllUsers because this is how we obtain their list of followers
            const users = Object.values(response);
            let followers:any[] = [];
            users.forEach(user => {
              if(user.followingList && user.followingList.split(",").includes(data['email'])) {
                followers.push(user.email);
              }
            });
            // we need to separate the loggedIn user from the user of the profile, because the user might be viewing someone
            // else's profile
            this.loggedInUser = {
              username:data['username'],
              email: data['email'],
              likes: [],
              comments: data['comments'],
              favorites: data['favorites'] ? data['favorites'].split(',') : [],
              followingList: data['followingList'] ? data['followingList'].split(',') : [],
              wantToWatch: data['wantToWatch'] ? data['wantToWatch'].split(',') : [],
              followerList: followers
            }
            // if there is no profile route, then the user is viewing their own profile, and we set the user as the logged in user
            if(!this.activatedRoute.snapshot.params["email"]) {
              this.user=this.loggedInUser;
              this.apiService.getUserComments(data['userId']).subscribe(posts => {
                this.posts = Object.values(posts)[0].filter((post:any) => post.referencedMovieId && post.referencedMovieId!=='').map((post: any) => {
                  let time = post.postTime.indexOf('T') ? post.postTime.split('T')[0] : post.postTime;
                  return post.referencedMovieId+": "+post.postBody+" - "+time;
                });
              });
            }
          })
        });
      }
      else {
        // if no user is logged in or specific in the params, we should route back to the homepage
        // this scenario would only happen if the user appends '/profile' manually to the url
        this.router.navigate(['/']);
      }
    });
    // if a url param exists, the user is viewing someone elses profile, so we get the profile owner's data from the db
    if(this.activatedRoute.snapshot.params["email"]) {
      this.isMyProfile = false;
      this.apiService.getUser(this.activatedRoute.snapshot.params["email"]).subscribe(data => {
        this.apiService.getAllUsers().subscribe(response => {
          // same concept as above, we get all the users to find the profile owner's followers
          // then we get the data from the db and set our user
          const users = Object.values(response);
          let followers:any[] = [];
          users.forEach(user => {
            if(user.followingList && user.followingList.split(",").includes(data['email'])) {
              followers.push(user.email);
            }
          });
          this.user = {
            username:data['username'],
            email: data['email'],
            likes: [],
            favorites: data['favorites'] ? data['favorites'].split(',') : [],
            comments: data['comments'],
            followingList: data['followingList'] ? data['followingList'].split(',') : [],
            wantToWatch: data['wantToWatch'] ? data['wantToWatch'].split(',') : [],
            followerList: followers
          }
          this.apiService.getUserComments(data['userId']).subscribe(posts => {
            this.posts = Object.values(posts)[0].filter((post:any) => post.referencedMovieId && post.referencedMovieId!=='').map((post: any) => {
              let time = post.postTime.indexOf('T') ? post.postTime.split('T')[0] : post.postTime;
              return post.referencedMovieId+": "+post.postBody+" - "+time;
            });
          });
          // if user doesn't exist (ie. user manually adds the parameter or user was deleted for some reason)
          // we should route back to the home page
          if(!this.user) {
            this.router.navigate(['/']);
          }
        });
      });
    }
  }

  public followUser() {
    // only follow if it is not user's profile (you can't follow yourself)
    if(this.user.email !== this.loggedInUser.email) {
      let currentFollowing = this.loggedInUser.followingList ? this.loggedInUser.followingList  : [];
      // if they are already following this user, remove them
      if(currentFollowing && currentFollowing.indexOf(this.user.email)!==-1) {
        currentFollowing = currentFollowing.filter(c => c !== this.user.email)
      }
      // if they are not following this user, and they already have following users, append to following list
      else if (currentFollowing && currentFollowing.length >0) {
        currentFollowing.push(this.user.email);
      }
      // if they have no following list, create the following list
      else {
        currentFollowing = [this.user.email];
      }
      let str = '';
      for(let i=0; i<currentFollowing.length; i++) {
        if(i==0) {
          str = str+currentFollowing[i];
        }
        else {
          str = str + ","+ currentFollowing[i]
        }
      }
      // call the api with the newly created list 
      this.apiService.addFollowing(this.loggedInUser.email, str).subscribe(user => {
        if(this.loggedInUser.followingList && this.loggedInUser.followingList.indexOf(this.user.email)==-1 ) {
          this.user.followerList?.push(this.loggedInUser.email);
          this.loggedInUser.followingList.push(this.user.email);
        }
        else {
          this.user.followerList = this.user.followerList?.filter(follower => {
            follower !== this.loggedInUser.email;
          });
          this.loggedInUser.followingList = this.loggedInUser.followingList?.filter(item => {
            item !== this.user.email;
          });
        }
      });
    }
  }

  // maps followers list to just usernames for easier viewing
  public showFollowers() {
    this.listTitle = 'Followers';
    this.profileItems = this.user.followerList ? this.user.followerList : [];
    this.showList = true;
  }
  // maps posts to just main content for easier viewing
  public showPosts() {
    this.listTitle = 'Posts';
    this.profileItems = this.posts;
    this.showList = true;
  }
  // maps followers to just username for easier viewing
  public showFollowing() {
    this.listTitle = 'Following';
    this.profileItems = this.user.followingList ? this.user.followingList : [];
    this.showList = true;
  }
  // If you click on the profile of the user in your follower/following list, you can view their profile
  public goToProfile(item: string) {
    if(this.listTitle == 'Posts') {
      this.router.navigate(['/discussion', item.split(":")[0]]);
    }
    else {
      this.router.navigate(['/profile', item]).then(() => {
        window.location.reload();
      });
    }
  }

  public goToMoviePage(item: string) {
    this.router.navigate(['/discussion', item.split(":")[0]]);
  }
}
