
//to return mock movie data


public class Movie {

  private String title;
  private double rating;
  private String genre;

  public Movie(String title, double rating, String genre) {

    this.title = title;
    this.rating = rating;
    this.genre = genre;

  }

  public String getTitle() {

    return title;

  }

  public double getRating() {

    return rating;

  }

  public String getGenre() {

    return genre;
  }

}
