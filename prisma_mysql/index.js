//import {PrismaClient} from '@prisma/client';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

export const prisma =new PrismaClient();

// const main=async()=>{
//     const user=await prisma.user.create({
//         data:{
//             name:"sush",
//             email:"sush@gmail.com",
//         }
//     })
// }

 const main=async()=>{
//     const newUser=await prisma.user.createMany({
//         data:[
//             {name:"sush",email:"sush@gmail.com"},
//             {name:"ram",email:"ram@gmail.com"},
//                 ],
//     })
// 

// const users =await prisma.user.findMany();
// console.log(users);

// get a single id
// const users=await prisma.user.findUnique({
//     where :{id:2},
// });
// console.log(users.email)

// get unique with preferred
// const users=await prisma.user.findUnique({
//     where :{email:"ram@gmail.com"},
// });
// console.log(users);

// update operation
// const updateUser=await prisma.user.update({
//     where: {id:2},
//     data:{name:"Ram the Lord"},
// });
// console.log(updateUser);

// update many users
// const updateUser=await prisma.user.updateMany({
//     where: {id:2},
//     data:{name:"Ram "},
// });
// console.log(updateUser);
const deleteUser=await prisma.user.delete({
    where:{id:2},
})
console.log(deleteUser);


}

main()
    .catch((error)=>console.error(error))
    .finally(async ()=>{
        await prisma.$disconnect();
    })
