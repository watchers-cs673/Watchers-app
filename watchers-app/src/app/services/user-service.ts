import { Injectable } from "@angular/core";

interface User {
    userId: string;
    username: string;
    email?: string;
    passwordHash?: string;
    uniqueUserAuthKey?: string;
    displayName: string;
    posts?: any[];
    likes?: any[];
    comments?: any[];
    follower?: any[];
    following?: any[];
}

@Injectable({
    providedIn: 'root',
})
export class UserService {
    public allUsers: User[] = [
        {userId: 'Sophie', username: "SophieMcQ", displayName: 'sophie'},
        {userId: 'Anish', username: "Anish", displayName: 'Anish'},
        {userId: 'Yuhe', username: "Yuhe", displayName: 'sophie'},
        {userId: 'Charles', username: "Charles", displayName: 'charles'},
    ];

    public getUser(id: string) {
        return this.allUsers.find(user => user.userId == id);
    }

    public getAllUsers() {
        return this.allUsers;
    }

}