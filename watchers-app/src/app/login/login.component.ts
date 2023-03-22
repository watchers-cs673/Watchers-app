import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public showModalFlag = false;
  
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
