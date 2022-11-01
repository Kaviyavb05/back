import express, { application } from "express";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import cors from 'cors';
import bank from './route.js'

const App=express();
App.use(bodyParser.json())
App.use(bodyParser.urlencoded({extended:true}))
App.use(bodyParser.text())

App.use(cors());


App.use('/api/bank',bank);

// mongoose.connect('mongodb://localhost:27017/bank')
// .then(()=>console.log('db connected'))
// .catch((e)=>console.log('error'))
// const port=process.env.PORT||1000;
const DB=async()=>{
    try {
        // console.log("hek");
        await mongoose.connect('mongodb+srv://kavi:Kaviya2001@cluster0.ew09ceb.mongodb.net/bank?retryWrites=true&w=majority')
        console.log("db connected");
    } catch (error) {
        console.log(error.message);
    }
}
DB()
//  App.listen(port,()=>{console.log("server is running on port 3000")})

App.listen(process.env.PORT || 7000,()=>{
    console.log("Done in 7000");
})