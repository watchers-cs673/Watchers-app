import express, { Express, Request, Response } from 'express';
// const express = require('express');
// import { Express, Request, Response } from 'express';
import { createUser } from './user-data/create-user.js';
import { userLogin, validateToken } from './user-data/user-authenticate.js';
import { PrismaClient } from '@prisma/client';
import { userPost } from './user-data/user-post.js';
import {
  getUserFollowing,
  getUserFollowers,
  getUserDisplayName,
  getUserLikes,
  getUserComments,
  viewPostsFromUser,
} from './user-data/read-info.js';
import { userSearchDatabase } from './user-data/user-search.js';

// require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
// backend runs on this port
const express_port = 3000;
// TODO: later generalize this using env
const angularURL = 'http://localhost:4200';

// handling CORS
// comment out this section if testing using cURL or another HTTP request program
app.use((req, res, next) => {
  // allow from origin, the frontend port
  res.header(
    'Access-Control-Allow-Origin',
    // the frontend domain and port
    angularURL
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.json());

// route for handling requests from the Angular client
// app.get('/api/message', (req, res) => {
//   res.json({
//     message: 'test api GET from /api/message',
//   });
// });

app.post('/api/post/createuser', function (req, res) {
  let data = req.body;
  if (!data['displayName']) {
    data['displayName'] = data['username'];
  }
  let userCreated = createUser(
    prisma,
    data['username'],
    data['email'],
    data['password'],
    data['displayName']
  );
  if (!userCreated) {
    res.status(404).send('User not created');
  } else {
    res.status(201).send('User created');
  }
});

app.post('/api/post/userlogin', async (req, res) => {
  let data = req.body;
  // let jwt = userLogin(prisma, data['username'], data['password']);
  let jwt = await userLogin(prisma, data['email'], data['password']);
  if (!jwt) {
    res.status(401);
  } else {
    res.send(jwt);
  }
});

app.post('/api/post/userpost', function (req, res) {
  let data = req.body;
  let token = data['token'];
  let userPostBody = data['post_body'];
  // let userpostcreated = userPost(prisma, token,)
  // res.status(401).send("failure");
  // TODO: implement
});

app.post('/api/post/addposttouser', function(req, res) {
  const user_id = req.body.user_id;
  const post = req.body.post;

  // TODO: add post to user's posts list in the database

  res.sendStatus(200);
});


app.get('/api/get/viewpostsfromuser', (req, res) => {
  let data = req.body;
  // let token = data['token'];
  let user_id = data['user_id'];
  // res.status(401).send("fail");
  let userPosts = viewPostsFromUser(prisma, user_id);
  if (!userPosts) {
    res.status(404).send('Not found');
  } else {
    res.send(userPosts);
  }
});

app.get('/api/get/getuserfollowing', (req, res) => {
  let data = req.body;
  let user_id = data['user_id'];
  let userFollowing = getUserFollowing(prisma, user_id);
  if (!userFollowing) {
    res.status(404).send('Not found');
  } else {
    res.send(userFollowing);
  }
});

app.get('/api/get/getuserfollowers', (req, res) => {
  let data = req.body;
  let user_id = data['user_id'];
  let userFollowers = getUserFollowers(prisma, user_id);
  if (!userFollowers) {
    res.status(404).send('Not found');
  } else {
    res.send(userFollowers);
  }
});

app.get('/api/get/getuserlikes', (req, res) => {
  let data = req.body;
  let user_id = data['user_id'];
  let userLikes = getUserLikes(prisma, user_id);
  if (!userLikes) {
    res.status(404).send('Not found');
  } else {
    res.send(userLikes);
  }
});

app.get('/api/get/getusercomments', (req, res) => {
  let data = req.body;
  let user_id = data['user_id'];
  let userComments = getUserComments(prisma, user_id);
  if (!userComments) {
    res.status(404).send('Not found');
  } else {
    res.send(userComments);
  }
});

app.get('/api/get/getuserdisplayname', (req, res) => {
  let data = req.body;
  let user_id = data['user_id'];
  let userDisplayName = getUserDisplayName(prisma, user_id);
  if (!userDisplayName) {
    res.status(404).send('Not found');
  } else {
    res.send(userDisplayName);
  }
});

/**
 * search by username
 */
app.get('/api/get/search/usernamesearch', (req, res) => {
  let data = req.body;
  let user_search_query = data['usernamequery'];
  let users = userSearchDatabase(prisma,user_search_query);
  if (users==null) {
    //
  } else {
    res.send(users);
  }
})

app.get('/api/get/getAllUsers',async(req,res)=>{
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not retrieve users' });
  }
})

app.post('/api/post/getUser',async(req,res)=>{
  try {
    let e = req.body['email'];
    const result = await prisma.user.findUnique({
      where: {
        email: e,
      },
    });
    if(result) {
      res.status(200).send(result);
    }
    else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not retrieve user' });
  }
});

app.post('/api/post/addFavorites',async(req,res)=>{
  try {
    let e = req.body['email'];
    let favs = req.body['favorites'];
    const user = await prisma.user.update({
      where: { email: e },
      data: { favorites: favs },
    })
    if(user) {
      res.status(200).send(user);
    }
    else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not retrieve user'});
  }
});

app.listen(express_port, () => {
  console.log('Server listening on port ' + express_port);
});
