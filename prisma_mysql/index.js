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
    const newUser=await prisma.user.createMany({
        data:[
            {name:"sush",email:"sush@gmail.com"},
            {name:"ram",email:"ram@gmail.com"},
                ],
    })
}
main()
    .catch((error)=>console.error(error))
    .finally(async ()=>{
        await prisma.$disconnect();
    })