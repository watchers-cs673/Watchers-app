import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  showModalFlag = false;
  
  showModal() {
    this.showModalFlag = true;
  }
  
  hideModal() {
    this.showModalFlag = false;
  }
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}
}
