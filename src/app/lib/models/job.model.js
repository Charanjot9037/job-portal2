import { application } from "express";
import mongoose, { Schema, model, models } from 'mongoose';

const jobSchema= new mongoose.Schema({
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
requirements:[{
    type:String,
    
}],
salary:{
    type:String,
    required:true
},
location:{
    type:String,
    required:true
},
jobtype:{
    type:String,
    required:true
},
positions:{
    type:Number,
    required:true
},
company:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Company',
    required:true
},
createdby:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    
    required:true
},
application:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Application',
    
   
}],

applications:{
    type:String
}
},{timestamps:true});

const Job= models.Job || model('Job',jobSchema);
export default Job;


// export const Job = mongoose.model("Job",jobSchema);