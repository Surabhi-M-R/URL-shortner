import {db} from './config/db.js';
import {usersTable} from './drizzle/schema.js';

const main=async()=>{
    // const insertUsers=await db.insert(usersTable).values([
    //     {name:"sddwsh",age:20,email:"sudfh@exampwdle.com"},
    //     {name:"johdwewdn",age:25,email:"johndd@exadmple.com"},
    //     {name:"jawdqwewwdne",age:30,email:"jddfane@ewedxample.com"},
    //     {name:"dofwede",age:35,email:"ddoe@exasdmpwedle.com"},
    // ])
    // console.log(insertUsers)
    // read operation
    // const reading=await db.select().from(usersTable);
    // console.log(reading);
    
    // const reading2=await db.select().from(usersTable).where({
    //     email:"sudfh@exampwdle.com",
    // })
    // console.log(reading2);

    // update operation
    // const update1=await db
    // .update(usersTable)
    // .set({name:"updatedName"})
    // .where({email:"johndd@exadmple.com"});
    // console.log(update1);  

    // const reading2=await db.select().from(usersTable).where({
    //     email:"johndd@exadmple.com",
    // })
    // console.log(reading2);

    // delete operation
    const delete1=await db
    .delete(usersTable)
    .where({email:"johndd@exadmple.com"});
    console.log(delete1);

    const reading2=await db.select().from(usersTable).where({id:19});
    console.log(reading2);
}
main().catch((error)=>{
    console.log(error);
})