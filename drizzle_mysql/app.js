import {db} from './config/db.js';
import { usersTable } from './drizzle/schema.js';

const main =async ()=>{
    const insertUser= await db.insert(usersTable).values({name:"sus",age:"31",email:"sush@gmail.com"});
    console.log(insertUser);
}

main().catch((error)=>{
    console.log(error);
})