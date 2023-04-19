import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface Movie {
    name: string;
    rating: number;
    genre: string;
    imgPath: string;
    runTime?: string;
    year?: number;
    summary?: string;
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

    public csvMovies: any[] = []
    constructor(private httpClient: HttpClient){
        this.getData().subscribe(data => {
            // this is incredibly convoluted because it has to be. Parsing a csv file in typescript is not an easy task
            // especially since a lot of the values have commas (like the movie descriptions and genres have commas)
            // this makes parsing it normally impossible
            const list = data.split("\n");
            list.shift()
            list.forEach(e => {
                const m = e.split(".jpg");
                const n = m[1].split("\"");
                n.shift();
                const w = n[0].split(",")
                w.shift();
                w.pop();               
                let fullArray = [];
                fullArray.push(m[0].split("\"")[1]+".jpg");
                if(w.length >=4) {
                    fullArray.push(w[0]);
                    fullArray.push(w[1]);
                    fullArray.push(w[3]);
                
                    if(w.length==4) {
                    //   this.allMovies.push({name: w[0], year: parseInt(w[1]), rating: parseInt(m[8]), genre: m[9], imgPath: m[0]+".jpg"})
                        fullArray.push(n[1].split(",")[0]);

                        if(n[2].split(",").length==3) {
                            fullArray.push(n[2].split(",")[1]);
                            fullArray.push(n[3]);
                        }
                        else if(n[2].split(",").length==11) {
                            fullArray.push(n[2].split(",")[1]);
                            fullArray.push(n[2].split(",")[2]);
                        }
                    }
                    else {
                        fullArray.push(w[4]);
                        fullArray.push(w[5]);
                        if (w.length==6){
                            fullArray.push(n[1]);
                        }
                        else if(w.length==14){ 
                            fullArray.push(w[6]);
                        }
                    }
                    this.allMovies.push({imgPath: fullArray[0], name: fullArray[1], year: parseInt(fullArray[2]), runTime: fullArray[3], genre: fullArray[4], rating: parseInt(fullArray[5]), summary: fullArray[6]})
                }
            });
        });
    }

    public getGenres() {
        let genres = [...new Set(this.allMovies.map(movie => movie.genre))];
        let genreObjects: { src: string; title: string; link: string; }[] = [];
        genres.forEach(genre => {
            genreObjects.push({src: this.getRandomMovie(genre).imgPath, title: genre, link: '/discussion'})
        });
        return genreObjects;
    }

    public getData() {
        return this.httpClient.get('assets/movies.csv', {responseType: 'text'});
    }

    public getMovie(name: string) {
        return this.allMovies.find(movie => movie.name == name);
    }

    private getRandomMovie(genre: string) {
        let filteredMovies = this.allMovies.filter(movie => movie.genre == genre);
        let randomIndex = Math.floor(Math.random() * filteredMovies.length);
        return filteredMovies[randomIndex];
    }
}