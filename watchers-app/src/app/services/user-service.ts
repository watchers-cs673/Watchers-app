import { Injectable } from "@angular/core";
import { User } from '../interfaces/user';
import { Comment } from '../interfaces/comment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    public allUsers: User[] = [
        {username: "SophieMcQ", email: 'sophiemcq@live.com', likes: [], comments: [], followers: [], following: []},
        {username: "JohnDoe", email: 'johndoe@bu.edu', likes: [], comments: [], followers: [], following: []}
    ];

    public createUser(username: string, email: string) {
        this.allUsers.push({username: username, email: email, likes: [], comments: [], followers: [], following: []})
    }

    public addLike(userEmail: string, like: any) {
        this.allUsers.find(user => user.email = userEmail)?.likes.push(like);
    }

    public addComment(userEmail: string, comment: any) {
        this.allUsers.find(user => user.email = userEmail)?.comments.push(comment);
    }

    public getUserByEmail(email: string): User{
        let user = this.allUsers.find(user => user.email == email);
        if(user==undefined) {
            user= this.allUsers[0];
        }
        return user;
    }

    public getUserByUsername(username: string): User{
        let user = this.allUsers.find(user => user.username == username);
        if(user==undefined) {
            user= this.allUsers[0];
        }
        return user;
    }

    public getFavorites() {
        let favorites = localStorage.getItem('favoriteMovies');
        if(favorites) {
            return favorites.split(",");
        }
        return [];
    }

    public addFavorite(newFav: string) {
        let favorites = "";
        let tempString = localStorage.getItem('favoriteMovies');
        if(tempString) {
            favorites = tempString + ','+newFav;
        }
        else {
            favorites=newFav;
        }
        localStorage.setItem('favoriteMovies', favorites)
    }

    public removeFavorite(movie: string) {
        let tempString = localStorage.getItem('favoriteMovies');
        if(tempString) {
            let arr = tempString.split(',').filter(a => a != movie);
            let newString = "";
            for(let i=0; i<arr.length; i++) {
                if(i==0) {
                    newString = arr[i];
                }
                else {
                    newString = newString + ","+arr[i]
                }
            }
            localStorage.setItem('favoriteMovies', newString)
        }
    }
}