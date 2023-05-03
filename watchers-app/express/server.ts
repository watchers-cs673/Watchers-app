import express from 'express';
import { createPasswordHash, createUserAuthKey } from './user-data/user-authenticate.js';
import { PrismaClient } from '@prisma/client';

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

app.post('/api/post/createuser', async (req, res) => {
  let data = req.body;
  if (!data['displayName']) {
    data['displayName'] = data['username'];
  }
  let passwordHashResult = await createPasswordHash(data['password']);

  let userAuthKey: string = await createUserAuthKey();

  try {
    const user = await prisma.user.create({
      data: {
        username: data['username'],
        email: data['email'],
        passwordHash: passwordHashResult,
        uniqueUserAuthKey: userAuthKey,
        displayName: data['displayName'],
      },
    });
    if(user) {
        res.status(200).send(user);
    }
    else {
      res.status(404).send("Can not create user")
    }
  } catch(e) {
    res.status(500).send('Internal server error');
  }
});


app.get('/api/get/getAllUsers',async(req,res)=>{
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not retrieve users' });
  }
})

app.post('/api/post/getOrCreateUser',async(req,res)=>{
  try {
    let result = null;
    let e = req.body['email'];
    result = await prisma.user.findUnique({
      where: {
        email: e,
      },
    });
    if(!result) {
      let userAuthKey: string = await createUserAuthKey();
      let username: string = e.indexOf('@') != -1 ? e.split('@')[0] : e;
      result = await prisma.user.create({
        data: {
          username: username,
          email: e,
          passwordHash: '123456',
          uniqueUserAuthKey: userAuthKey,
          displayName: username,
        },
      });
    }
    if(result) {
      res.status(200).send(result);
    }
    else {
      res.status(404).send("Can not create user")
    }
  } catch(e) {
    res.status(500).send('Internal server error');
  }
});

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

app.post('/api/post/findPostsFromUser',async(req,res)=>{
  try {
    let e = req.body['userid'];
    const user = await prisma.user.findUnique({
        where: {
          userId: e,
        },
        select: {
          posts: true,
        },
    })
    if(user) {
      res.status(200).send(user);
    }
    else {
      res.status(404).send('Not found');
    }} catch (error) {
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

app.post('/api/post/addWantToWatch',async(req,res)=>{
  try {
    let e = req.body['email'];
    let watch = req.body['wantToWatch'];
    const user = await prisma.user.update({
      where: { email: e },
      data: { wantToWatch: watch },
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

app.post('/api/post/addUserFollowing', async(req, res) => {
  let data = req.body;
  let user = await prisma.user.update({
    where: { email: data['email'] },
    data: { followingList: data['followingList'] },
  });
  if (!user) {
    res.status(404).send('Not found');
  } else {
    res.send(user);
  }
});

app.post('/api/post/addposttouser', async(req, res) => {
  try {
    const id = req.body['userId'];
    const post = req.body['post'];
    const movie = req.body['movie'];
    const result = await prisma.post.create({
      data: {
        postBody: post,
        referencedMovieId: movie,
        rating: 5,
        author: {
          connect: { userId: id },
        },
      },
    });
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Could not add post to user');
  }
  
});

app.listen(express_port, () => {
  console.log('Server listening on port ' + express_port);
});
