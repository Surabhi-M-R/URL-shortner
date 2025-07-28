import {MongoClient} from "mongodb";
const client = new MongoClient('mongodb://localhost:27017');
await client.connect();

const db=client.db("node_js");
const userCollection=db.collection("user");
//userCollection.insertOne({names:"sush", age:"21"});

userCollection.insertMany([{names:"sura",age: 100},
    {name:"verru",age:21},
    {names:"harshitha",age:19}
]);

// Read

 const userCursor=userCollection.find();
console.log(userCursor);

for await (const user of userCursor){
    console.log(user)
};

const userCursor= await userCollection.find().toArray();
console.log(userCursor);

const user=await userCollection.findOne({names:"sush"});
//console.log(user);
console.log(user._id);

// update
await userCollection.updateOne({names:"sush"},{$set:{age:21}});

await userCollection.deleteOne({names:"sush"});
cd