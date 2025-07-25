import express from 'express';
import {PORT} from "./env.js";
import path from 'path';
//const PORT=process.env.PORT ||3000;
const app =express();
// const __filename=new URL(import.meta.url).pathname;
// console.log(__filename);

// serving static file 
 const staticPath=path.join(import.meta.dirname ,"public");
app.use(express.static(staticPath));


// app.get("/",(req,res)=>{
    
//     const homePagePath=path.join(import.meta.dirname ,"public","index.html");
//     res.sendFile(homePagePath);

// });
app.listen(PORT,()=>{
    console.log(`server is running at port: ${PORT}`);
});
