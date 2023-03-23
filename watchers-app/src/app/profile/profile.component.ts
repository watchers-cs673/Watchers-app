import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

interface UserData {
    posts: number;
    followers: number;
    following: number;
}

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    public userName = 'Test User';
    public userData: UserData = {posts: 2, followers: 3, following: 2};
    constructor(public auth: AuthService) {
      auth.user$.subscribe((data) => {
        if(data?.email) {
          this.userName = data.email;
        }
      })
    }
}
