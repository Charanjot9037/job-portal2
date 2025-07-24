import mongoose, { Schema, model, models } from 'mongoose';

const companySchema = new Schema({
    name:{
         type:String,
         unique:true,
         required:true
    },
      description:{

     type:String
     },
    imageUrl:{
        type:String //url
    },
    location:{
type:String
    },website:{
type:String
    },
     userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
       
    }
},
{timestamps:true});




const Company = models.Company || model('Company',companySchema);
export default Company;






















// import mongoose from "mongoose";


// const companySchema =new mongoose.Schema({
//     name:{
//         type:String,
//         unique:true,
//         required:true
//     },
//     description:{

//     type:String
//     },
//     location:{
// type:String
//     },
//     logo:{
//         type:String //url
//     },
    
//     // userId:{
//     //     type:mongoose.Schema.Types.ObjectId,
//     //     ref:'user',
       
//     // }
// },
// {timestamps:true});

// export const company = mongoose.model("company",companySchema);