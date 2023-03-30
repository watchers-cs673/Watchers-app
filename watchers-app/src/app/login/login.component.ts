import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public showModalFlag = false;
  public hasAccount = false;
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
  loginForm = new FormGroup({
    firstName: new FormControl(''),
    userName: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}
  
  public showModal() {
    this.showModalFlag = true;
  }
  
  public hideModal() {
    this.showModalFlag = false;
  }

  public signUp() {
    this.hasAccount=true;
  }

  public signIn() {
    console.log("Sign In");
  }

  public createAccount() {
    console.log(this.loginForm);
  }

  public forgotPassword() {
    console.log('forgot password');
  }

  public login() {
    console.log('login')
  }
}
