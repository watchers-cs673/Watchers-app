import { Component } from '@angular/core';

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
}
