create database if not exists `watchersUserDB`;

use `watchersUserDB`;

drop table if exists `user_data`;
create table `user_data` (
  user_id int(16) not null auto_increment primary key,
  username varchar(16) not null,
  email varchar(255),
  password_hash varchar(255) not null,
  display_name varchar(32)
);

drop table if exists `follow_relations`;
create table `follow_relations` (
  watche_user_id int(16),
  watched_user_id int(16)
);

drop table if exists `posts`;
create table `posts` (
  post_id int(16) not null auto_increment primary key,
  post_user_id int(16) not null,
  post_body varchar(1024) not null,
  referenced_movie_id varchar(10)
);

drop table if exists `likes`;
create table `likes` (
  liked_post_id int(16) not null,
  liked_user_id int(16) not null
);

drop table if exists `comments`;
create table `comments` (
  comment_id int(16) not null auto_increment primary key,
  commenting_original_post_id int(16) not null,
  commenter_user_id int(16) not null,
  comment_body varchar(255) not null
);
