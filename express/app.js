import express from 'express';
import {PORT} from "./env.js";
//const PORT=process.env.PORT ||3000;
const app =express();

app.get("/",(req,res)=>{
    res.send(" Hello world");
});
app.listen(PORT,()=>{
    console.log(`server is running at port: ${PORT}`);
});
