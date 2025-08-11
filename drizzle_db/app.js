import {db} from './config/db.js';
import {usersTable} from './drizzle/schema.js';

const main=async()=>{
    const insertUsers=await db.insert(usersTable).values([
        {name:"ssh",age:20,email:"suh@example.com"},
        {name:"john",age:25,email:"john@example.com"},
        {name:"jane",age:30,email:"jane@example.com"},
        {name:"doe",age:35,email:"doe@example.com"},
    ])
}
main().catch((error)=>{
    console.log(error);
})