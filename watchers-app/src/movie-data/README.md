# Movie Data
The movie database uses **MySQL** interfacing via [Prisma](https://www.prisma.io/), an ORM interface which generates code to interact with databases programatically. And Prisma is an [open source](https://github.com/prisma/prisma) next-generation ORM. It greatly simplifies coding of database operations, and allows a relational model to be defined. The MySQL data source connector connects Prisma to a  [MySQL](https://www.mysql.com/)  database server.

## Movie data concept
Movie data contains the information of movies.
The movie data contains the following components:
 - Movie ID
 - title
 - genres
 - production_companies
 - original_language
 - overview
 - popularity
 - release_date
 - status
 - vote_average
 - vote_count
 - credits
 - keywords
 - poster_path
 - runtime

Every movie data must have an unique ID, except ID, title and poster_path also should be [Not Null](https://www.w3schools.com/mysql/mysql_notnull.asp#:~:text=By%20default,%20a%20column%20can,a%20value%20to%20this%20field.).
The full layout of the movie data and data types can be seen in the moiveSchematic file,  [ **movieSchema.prisma**](https://github.com/watchers-cs673/Watchers-app/blob/main/watchers-app/prisma/movieSchema.prisma).
