const { MongoClient } = require("mongodb");
import * as dotenv from 'dotenv';
dotenv.config();

var uri = process.env['MONGO_URI'];
if (uri == undefined) {
  uri = "mongodb://127.0.0.1:27017/"
}

console.log("Begin creating database:")


const client = new MongoClient(uri);
async function main() {
  client.connect((err: Error) => {
    const database = client.db('watchers_db');
    database.create
    client.close();
  })
}
main().catch(console.error);
