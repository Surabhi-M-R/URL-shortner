export const PORT=isNaN(process.env.PORT) ? 3000 :parseInt(process.env.PORT);



// this is just an example

// const ageSchema=z.number().min(18).max(100).int();
// const userAge=19;

// const parseAge=ageSchema.parse(userAge);
// console.log(parseAge);

// import {z} from 'zod';
// const portSchema=z.coerce.number().min(1).max(65535).default(3000);

// export const PORT=portSchema.parse(process.env.PORT ?? undefined);
// console.log("process.env.PORT =", process.env.PORT);
// console.log("parsed PORT =", PORT);
