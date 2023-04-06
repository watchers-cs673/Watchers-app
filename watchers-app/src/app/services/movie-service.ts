import { Injectable } from "@angular/core";

interface Movie {
    name: string;
    rating: number;
    genre: string;
    imgPath: string;
}
@Injectable({
    providedIn: 'root',
})
export class MovieService {
    public allMovies: Movie[] = [
        {name: "The Dark Knight", rating:8.9, genre: "Action", imgPath: 'assets/thedarkknight.jpeg'},
        {name: "Inception", rating:9.2, genre: "Action", imgPath: 'assets/inception.jpeg'},
        {name: "The Matrix", rating:9.2, genre: "Action", imgPath: 'assets/thematrix.jpeg'},
        {name: "Saw II", rating:9.2, genre: "Action", imgPath: 'assets/sawii.jpeg'},
        {name: "Get Out", rating:9.2, genre: "Horror", imgPath: 'assets/getout.jpeg'},
        {name: "The Descent", rating:9.2, genre: "Horror", imgPath: 'assets/thedescent.jpeg'},
        {name: "Texas Chainsaw Massacre", rating:9.2, genre: "Horror", imgPath: 'assets/texaschainsawmassacre.jpeg'},
        {name: "Psycho", rating:9.2, genre: "Horror", imgPath: 'assets/psycho.jpeg'},
        {name: "Hairspray", rating:9.2, genre: "Musical", imgPath: 'assets/hairspray.jpeg'},
        {name: "Mary Poppins", rating:9.2, genre: "Musical", imgPath: 'assets/marypoppins.jpeg'},
        {name: "The Lion King", rating:9.2, genre: "Musical", imgPath: 'assets/thelionking.jpeg'},
        {name: "Never Let Me Go", rating:9.2, genre: "Romance", imgPath: 'assets/neverletmego.jpeg'},
        {name: "The Titanic", rating:9.2, genre: "Romance", imgPath: 'assets/titanic.jpeg'},
        {name: "Love Actually", rating:9.2, genre: "Romance", imgPath: 'assets/loveactually.jpeg'},
        {name: "The Notebook", rating:9.2, genre: "Romance", imgPath: 'assets/thenotebook.jpeg'},
        {name: "Superbad", rating:9.2, genre: "Comedy", imgPath: 'assets/superbad.jpeg'},
        {name: "Borat", rating:9.2, genre: "Comedy", imgPath: 'assets/borat.jpeg'},
        {name: "Bridesmaids", rating:9.2, genre: "Comedy", imgPath: 'assets/bridesmaids.jpeg'},
        {name: "Deadpool", rating:9.2, genre: "Comedy", imgPath: 'assets/deadpool.jpeg'},
    ];
    public getMovies() {
        return this.allMovies;
    }


}