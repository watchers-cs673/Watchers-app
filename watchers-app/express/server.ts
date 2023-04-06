import * as express from 'express';
import { Express, Request, Response } from 'express';

// require('dotenv').config();

const app = express()
const port = 3000

// handling CORS
app.use((req, res, next) => {
  // allow from origin, the frontend port
  res.header('Access-Control-Allow-Origin',
    'http://localhost:4200')
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// route for handling requests from the Angular client
app.get('/api/message', (req, res) => {
  res.json({
    message:
      'test api GET from /api/message'
  })
})

app.listen(port, () => {
  console.log('Server listening on port 3000')
})
