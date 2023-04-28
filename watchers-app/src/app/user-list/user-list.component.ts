import { Component, Input } from '@angular/core';

export interface UserList {
  name: string;
  
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  
}
