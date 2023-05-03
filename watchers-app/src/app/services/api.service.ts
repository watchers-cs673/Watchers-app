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
  public createUser(email: string, username: string, password: string) {
    return this.http.post(expressURL + '/api/post/createuser', {email: email, username: username, password: password});
  }
  public getOrCreateUser(email: string) {
    return this.http.post(expressURL + '/api/post/getOrCreateUser', {email: email});
  }
  public userLogin(userLoginInfo: JSON) {
    return this.http.post(expressURL + '/api/post/userlogin', userLoginInfo);
  }

  public userPost() {}

  public viewPostsFromUser(user_id: string) {
    return this.http.get(expressURL+'/api/get/viewpostsfromuser'+'?userid='+user_id);
  }

  public addPostToUser(user_id: string, post: any) {
    return this.http.post(expressURL + '/api/post/addposttouser', { user_id: user_id, post: post });
  }

  public getUserFollowers(e: string) {
    return this.http.post(expressURL+'/api/post/getFollowers', {email: e});
  }

  public getUser(e: string) {
    return this.http.post<any>(expressURL+'/api/post/getUser', { email: e});
  }

  public getAllUsers(){
    return this.http.get(expressURL+'/api/get/getAllUsers')
  }

  public addFavorites(e: string, f: string){
    return this.http.post(expressURL+'/api/post/addFavorites', {email: e, favorites: f});
  }

  public addFollowing(e: string, f: string){
    return this.http.post(expressURL+'/api/post/addUserFollowing', {email: e, followingList: f});
  }

  public addWantToWatch(e: string, w: string){
    return this.http.post(expressURL+'/api/post/addWantToWatch', {email: e, wantToWatch: w});
  }

  public getUserComments(user_id: string) {
    return this.http.get(expressURL+'/api/get/getusercomments'+'?userid='+user_id);
  }

}
