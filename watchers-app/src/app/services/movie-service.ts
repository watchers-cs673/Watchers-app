import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { map, Observable } from "rxjs";
import { Movie } from '../interfaces/movie'

@Injectable({
    providedIn: 'root',
})
export class MovieService {

     public allMovies: Movie[];

    public csvMovies: any[] = []
    constructor(private httpClient: HttpClient){
        this.allMovies = [];
    }

    public getGenres() {
        return this.getData().pipe(map(movies => {
            let genres: { src: string; title: string; link: string; }[] = [];
            let genreNames: string[] = [];
            movies.forEach(movie => {
                movie.genre.split(",").forEach(genre => {
                    if(genreNames.indexOf(genre.trim()) ==-1) {
                        genreNames.push(genre.trim());
                    }
                })
            });
            genreNames.forEach(name => {
                let moviesOfGenre = movies.filter(movie => {
                    if(movie.genre.split(",").map(n => n.trim()).includes(name)) {
                        return true;
                    }
                    return false;
                });
                let randomNum = Math.floor(Math.random() * moviesOfGenre.length);
                let randomMovie = moviesOfGenre[randomNum];
                genres.push({src: randomMovie.imgPath, title: name, link:'/discussion'});
            });
            return genres;
        }));
    }

    public getData(): Observable<Movie[]> {
        return this.httpClient.get('assets/movies.csv', {responseType: 'text'}).pipe(map(data => {
            let rows: string[]= [];
            rows = data.split("\n");
            let newdata: Movie[] = [];
            rows.shift();
            rows = rows.filter(row => row.length>0)
            rows.forEach(e => {
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
                        fullArray.push(n[1]);

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
                    newdata.push({imgPath: fullArray[0], name: fullArray[1], year: parseInt(fullArray[2]), runTime: fullArray[3], genre: fullArray[4], rating: parseInt(fullArray[5]), summary: fullArray[6]})
                }            
            });
            return newdata;
        }))
    }

    public getMovie(name: string) {
        return this.getData().pipe(map(movies => {
            return movies.find(movie => movie.name == name)
        }));
    }

}