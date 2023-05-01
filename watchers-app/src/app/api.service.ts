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
  public createUser(userCreateJSON: JSON) {
    return this.http.post(expressURL + '/api/post/createuser', userCreateJSON);
  }

  public userLogin(userLoginInfo: JSON) {
    return this.http.post(expressURL + '/api/post/userlogin', userLoginInfo);
  }

  public userPost() {}

  public viewPostsFromUser(user_id: string) {
    return this.http.get(expressURL+'/api/get/viewpostsfromuser'+'?userid='+user_id);
  }

  public addPostToUser(user_id: string, post: JSON) {
    return this.http.post(expressURL + '/api/post/addposttouser', { user_id: user_id, post: post });
  }

  public getUser(e: string) {
    return this.http.post<any>(expressURL+'/api/post/getUser', { email: e});
  }

  public getAllUsers(){
    return this.http.get(expressURL+'/api/get/getAllUsers')
  }


}
