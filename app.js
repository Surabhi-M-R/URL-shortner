
import express from 'express';
import {shortenedRoutes} from "./routes/shortener.routes.js";

const app=express();
const PORT=3005;

app.use(express.static("public")); //middleware
app.use(express.urlencoded({ extended: true }));

// express router
app.use(shortenedRoutes);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
app.set("view engine","ejs");
app.listen(PORT,()=>{
    console.log(`server running at https://localhost:${PORT}`);
});



