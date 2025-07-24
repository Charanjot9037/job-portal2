import mongoose from "mongoose";
import React from 'react'

const connectDB =async ()=>{

try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected");
}catch(err){
    console.log("Error");
}

}
export default connectDB;