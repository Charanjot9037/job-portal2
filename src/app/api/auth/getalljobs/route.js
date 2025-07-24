import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import connectDB from '@/app/lib/config/db.js'
import Compnay from '@/app/lib/models/company.model'
import Job from '@/app/lib/models/job.model.js'

export async function POST(req) {
try{


const url = new URL(req.url);
const keyword=url.searchParams.get('keyword') ||" ";

console.log(keyword);

connectDB();
const query={
    $or:[
        
        {title:{$regex:keyword, $options:"i"}},
        {description:{$regex:keyword, $options:"i"}},
    ]
};

const jobs = await Job.find(query).populate('company');
if(!jobs){
    return NextResponse.json({message:"job not found " ,status:404 , success:"false"})
} 
console.log(jobs);
   return NextResponse.json({message:"found", success:"true",jobs}) 
}
catch(error){
    console.log(error);
return NextResponse.json(error)
}


}