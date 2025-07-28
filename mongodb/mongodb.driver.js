import {MongoClient} from "mongodb";
const client = new MongoClient('mongodb://localhost:27017');
await client.connect();

const db=client.db("node_js");
const userCollection=db.collection("user");
userCollection.insertOne({names:"sush", age:"21"});