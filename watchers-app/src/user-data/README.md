# User data

This contains code to interface with the MongoDB database containing the user profile data for the application.

## Usage

### Prequisites

In the repository root directory (the git directory containing the entire project), make sure your repo is up to date with `git fetch`, then `git status` to check. 

If your git is up to date then run `npm install` in the repository root directory.

Install MongoDB on your machine following the directions here: https://www.mongodb.com/docs/manual/administration/install-community/

### Setup (this only needs to be done once per machine/server)

#### Setup MongoDB

In your terminal, run the command `mongod` (this is the MongoDB background process). Alternatively, if you installed via Homebrew (on macOS) run `brew services start mongodb-community`.

<!-- In the terminal, you need to create a user to manage the user-data collection. We will call the user `watchers_app-userdata` and the database `watchers_app_userdb`. This is created by running the MongoDB shell using the command `mongosh` in the terminal, then inputting the following:

```json
db.createUser({

}) -->
```


#### Setup the .env file

Create a file in the watchers-app directory (the git directory containing the entire project), named `.env`.

Within it, add the following text: 

```env
MONGO_URI=<uri here>
```

Where `<uri here>` is replaced by 

#### Run the init file
`node user-data/user-data-init.js`

## User profile data concept

MongoDB is chosen as a NoSQL database. Using the JSON model of data access, it is easy to program with and use while remaining performant at scale.

The user data contains the following components:
- user unique ID
- username
- password hash
- display name

The user posts data are in another collection differentiated using the unique ID
- post type (profile-post)
	- user unique ID
	- post unique ID
	- post text content
	- referenced movie unique ID
	- post likes:
		- user account likes (unique ID list)
	- post comments (only relevant if profile-post):
		- each comment body contains
			- commenting user unique ID
			- comment unique ID
			- comment text content
			- comment likes:
			- user account likes (unique ID list)
		<!-- - comment unique IDs (these are loaded by querying the comments from the commenting user's comment-type posts by the unique ID) -->
			
<!-- OR, in the case of a commment

- post type (comment)
	- commenting user unique ID
	- comment unique ID
	- comment text content
	- comment likes:
		- user account likes (unique ID list)

Comments themselves do not allow comments on themselves... this is disallowed on the server-side and client-side. This distinguishes comments from profile posts. -->

## User authentication

MongoDB includes a user authentication functionality: https://www.mongodb.com/docs/manual/tutorial/create-users/

## TODO/future goals

- The unique IDs could be created in a manner similar to the [Snowflake ID](https://en.wikipedia.org/wiki/Snowflake_ID) used by Twitter. 
	- The snowflake ID is used to dynamically generate the user registration time deterministically yet in a manner that scales. This is also used for posts and comments.
- add media embeds to posts
- implement generation of unique IDs
- expand beyond movies
- consider performance of comment loading mechanism
- do we want to store comments separately? (separate comments and posts e.g. Instagram/Facebook etc) or display comments are also posts i.e. blur boundary between comments and posts (e.g. Twitter)
- consider security of login/hash or use Auth0 or another authentication service