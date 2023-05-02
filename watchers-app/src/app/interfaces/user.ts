export interface User {
    username: string;
    email: string;
    likes: any[];
    comments: any[];
    followingList?: string;
    favorites?: string[];
    wantToWatch?: string[];
}