import { Injectable } from "@angular/core";
import { User } from '../interfaces/user';
import { Comment } from '../interfaces/comment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    public allUsers: User[] = [
        {username: "SophieMcQ", email: 'sophiemcq@live.com', likes: [], comments: [], followers: [], following: []}
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

    public getUser(email: string): User{
        let user = this.allUsers.find(user => user.email == email);
        if(user==undefined) {
            user= this.allUsers[0];
        }
        return user;
    }

//     public getUser(id: string) {
//         return this.allUsers.find(user => user.userId == id);
//     }

//     public getAllUsers() {
//         return this.allUsers;
//     }

// }