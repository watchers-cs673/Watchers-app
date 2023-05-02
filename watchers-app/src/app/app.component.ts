import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})

export class AppComponent implements OnInit {
  title = 'watchers-app';


  constructor(private service: ApiService){
  }


ngOnInit(): void {
    this.getALLUsers();
}


getALLUsers() {
  this.service.getAllUsers().subscribe({
    next: (response) => {
      const users = Object.values(response);
      users.forEach(user => {
        console.log(`User name: ${user.username}`);
      });
      
    },
    error: (err) => {
      console.log(err);
    }
  });
}

}


