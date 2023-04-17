import java.util.ArrayList;

//this is a mock database
//this mock database contains title, rating, genre

public class Main {
    public static void main(String[] args) {

        ArrayList<Movie> movies = new ArrayList<>();

        movies.add(new Movie("The Lion King", 8.9, "Animation"));
        movies.add(new Movie("The Godfather", 9.2, "Crime"));
        movies.add(new Movie("The Shawshank Redemption", 9.3, "Drama"));
        movies.add(new Movie("The Dark Knight", 9.0, "Action"));
        movies.add(new Movie("Forrest Gump", 8.8, "Romance"));
        movies.add(new Movie("The Lord of the Rings: The Fellowship of the Ring", 8.8, "Adventure"));
        movies.add(new Movie("Titanic", 7.8, "Drama"));
        movies.add(new Movie("Star Wars: Episode IV - A New Hope", 8.6, "Action"));
        movies.add(new Movie("Jurassic Park", 8.1, "Action"));
        movies.add(new Movie("Inception", 8.8, "Action"));
        movies.add(new Movie("The Matrix", 8.7, "Action"));
        movies.add(new Movie("Smile", 7.3, "Horror"));
        movies.add(new Movie("The Terminator", 8.0, "Action"));
        movies.add(new Movie("Inception", 8.8, "Action"));
        movies.add(new Movie("Nope", 7.2, "Action"));
        movies.add(new Movie("The Silence of the Lambs", 8.6, "Crime"));


        }
    }

