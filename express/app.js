import express from 'express';
const PORT=process.env.PORT;
const app =express();

app.get("/",(req,res)=>{
    res.send(" Hello world");
});
app.listen(PORT,()=>{
    console.log(`server is running at port: ${PORT}`);
});
