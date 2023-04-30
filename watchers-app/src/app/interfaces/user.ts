export interface User {
    username: string;
    email: string;
    likes: any[];
    comments: any[];
    followers: User[];
    following: User[];
}