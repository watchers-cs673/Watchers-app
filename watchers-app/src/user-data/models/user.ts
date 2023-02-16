// import {Joi} from "joi";
import { Schema, model, connect } from 'mongoose';

import * as dotenv from 'dotenv';
dotenv.config();

interface IUser {
  username: string;
  displayname: string;
  password: string
}

const user_schema = new Schema<IUser>({
  username: { type: String, required: true },
  displayname: { type: String, required: true },
  password: { type: String, required: true, minlength: 8, maxlength: 1024 }
});

const User = model<IUser>('User', user_schema);

run().catch(err => console.log(err));

async function run() {
  var uri = process.env['MONGO_URI'];
  if (uri == undefined) {
    uri = "mongodb://127.0.0.1:27017/watchers_db"
  }

  await connect(uri);
}
