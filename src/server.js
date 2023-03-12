import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import allRoutes from './routes/allRoutes.js';

mongoose.set('strictQuery', false);


// ES5 codes
// const express = require("express")

//configuring dotenv
dotenv.config();

//creating server instance
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(
    express.urlencoded({
        extended: false
    })
) 

// morgan for logs
if (process.env.NODE_ENV === "development") {
    app.use(morgan())
};

// Route- Home Route
app.get('/', (req,res) =>{
    res.status(200).send(
        `<h1 >Welcome to my home page</h1>`
    )
})

// define some variables
const port = process.env.PORT || 5000
// const host = process.env.HOST 

//connection
try {
    const con = async() => await mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }) 
    if(con) {
        console.log('DB connected')
    }
} catch (error) {
    console.log(err)
}

app.use('/api', allRoutes);
//listening to your server instance
// const startServer = () => app.listen(port)

// promises to await for con and startServer instance
// Promise.all([con(), startServer()])
// .then (() => {
//     console.log("MONGODB connected...")
//     console.log(`server listening at port`)
// })

app.listen(port, () =>{
    console.log(`server listening at http://127.0.0.1:${port}`);
});
