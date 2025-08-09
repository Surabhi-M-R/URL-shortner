import { PrismaClient } from '@prisma/client';

const prisma=new PrismaClient();

const main=async()=>{
    const user=await prisma.user.create({
        data:{
            name:"sus",
            email:"wth@gmail.com",

        }
    })
console.log(user);
}

main()
.catch((error)=>console.error(error))
.finally(async()=>{
    await prisma.$disconnect();
})

