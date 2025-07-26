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

// app.get("/product",(req,res)=>{
//     console.log(req.query);
//     res.send(` <h1> User searched for ${req.query.search}</h1>`);
// })


// app.get("/",(req,res)=>{
    
//     const homePagePath=path.join(import.meta.dirname ,"public","index.html");
//     res.sendFile(homePagePath);

// });
app.use(express.urlencoded({extended:true})); //middle ware
app.post("/contact",(req,res)=>{
    console.log(req.body);
    res.redirect("/");
})

// app.get("/profile/:username",(req,res)=>{
//     res.send(`<h1>Hello everyone welcome all ! im  ${req.params.username}</h1>`);
//     console.log(req.params);

// })
// app.get("/profile/:username/article/:slug",(req,res)=>{
//     const reqData=req.params.slug.replace(/-g/," ");
//     res.send(`<h1>article named ${req.params.username} by ${req.params.slug} </h1>`);
//     console.log(req.params);

// })
app.listen(PORT,()=>{
    console.log(`server is running at port: ${PORT}`);
});
