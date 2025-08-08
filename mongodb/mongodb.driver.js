// import {MongoClient} from "mongodb";
// const client = new MongoClient('mongodb://localhost:27017');
// await client.connect();

// const db=client.db("node_js");
// const userCollection=db.collection("user");
// //userCollection.insertOne({names:"sush", age:"21"});

// userCollection.insertMany([{names:"sura",age: 100},
//     {name:"verru",age:21},
//     {names:"harshitha",age:19}
// ]);

// // Read

//  const userCursor=userCollection.find();
// console.log(userCursor);

// for await (const user of userCursor){
//     console.log(user)
// };

// const userCursor= await userCollection.find().toArray();
// console.log(userCursor);

// const user=await userCollection.findOne({names:"sush"});
// //console.log(user);
// console.log(user._id);

// // update
// await userCollection.updateOne({names:"sush"},{$set:{age:21}});

// await userCollection.deleteOne({names:"sush"});


// import  { MongoClient} from 'mongodb'
// const client =new MongoClient("mongodb://localhost:27017")
// await client.connect();

// const db=client.db("practiseData");
// const userCollection=db.collection("student");
// userCollection.insertOne({name:"sush",age :21});

import { MongoClient } from "mongodb";
const client =new MongoClient("mongodb://localhost:27017");
client.connect();

const db=client.db("surabhi_data_base");
const collections=db.collection("user");
// collections.insertMany([
//     {name: "surabi" ,age:"21"},
//     {name:"harshitha", age:17},
//     {name: "veru" ,age:"14"},
//     {name: "ram" ,age:"123"},
//     {name: "sham" ,age:"34"},
//     {name: "Bam" ,age:"45"},

// ])

// FIND OPERATION ::::::::::::::::::::::::::::::::
// const data=await collections.find().toArray();
// console.log(data);

const data1=await collections.findOne({name:"veeru"});
console.log(data1)


// UPDATE OPERATION:::::::::::::::::::::::::::::::

//     const update1 = await collections.updateOne({ name: "veru" }, { $set: { name: "veeru" } });
//     console.log(update1);

// // DELETE OPERATION :::::::::::::::::::::::::::::::
//     const delete1 = await collections.deleteOne({ name: "veeru" });
//     console.log(delete1);







