import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public showModalFlag = false;
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}
  
  public showModal() {
    this.showModalFlag = true;
  }
  
  public hideModal() {
    this.showModalFlag = false;
  }

  public createAccount() {
    console.log('create account');
  }

  public forgotPassword() {
    console.log('forgot password');
  }

  public login() {
    console.log('login')
  }
}
