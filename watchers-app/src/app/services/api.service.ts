import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const expressURL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  public createUser(email: string, username: string, password: string) {
    return this.http.post(expressURL + '/api/post/createuser', {email: email, username: username, password: password});
  }
  public getOrCreateUser(email: string) {
    return this.http.post(expressURL + '/api/post/getOrCreateUser', {email: email});
  }

  public userPost() {}

  public getUser(e: string) {
    return this.http.post<any>(expressURL+'/api/post/getUser', { email: e});
  }

  public addPostToUser(userId: string, post: any, movie: string) {
    return this.http.post(expressURL + '/api/post/addposttouser', { userId: userId, post: post, movie: movie });
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
    return this.http.post(expressURL+'/api/post/findPostsFromUser',{userid: user_id});
  }

}
