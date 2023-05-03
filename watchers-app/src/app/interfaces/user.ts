export interface User {
    username: string;
    email: string;
    likes: any[];
    comments: any[];
    followingList?: string[];
    followerList?: string[];
    favorites?: string[];
    wantToWatch?: string[];
}