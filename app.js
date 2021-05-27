const dotenv = require("dotenv");
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const cookieParse= require('cookie-parser');
app.use(cookieParse());

dotenv.config({path:'./config.env'});
//const User = require('./model/userSchema');
require('./db/conn');
app.use(express.json());

app.use(require('./router/auth'));//linking the router files
const PORT = process.env.PORT || 5000;


//Middleware


// app.get("/about",middleware,(req,res)=>{
//     res.send(`Hello world from about me server`);
// });

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
}

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
})