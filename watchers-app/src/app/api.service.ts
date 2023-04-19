import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO: later generalize this using env
const expressURL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  // getMessage() {
  //   return this.http.get(expressURL + '/api/message');
  // }
  // add the api calls for express backend here
  createUser(userCreateJSON: JSON) {
    return this.http.post(expressURL + '/api/post/createuser', userCreateJSON);
  }

  userLogin(userLoginInfo: JSON) {
    return this.http.post(expressURL + '/api/post/userlogin', userLoginInfo);
  }

  userPost() {}

  viewPostsFromUser(user_id: string) {
    return this.http.get(expressURL+'/api/get/viewpostsfromuser'+'?userid='+user_id);
  }

  searchForUsername(usernamequery: string) {
    return this.http.get(expressURL+'/api/get/search/usernamesearch'+'?usernamequery='+usernamequery);
  }
}
