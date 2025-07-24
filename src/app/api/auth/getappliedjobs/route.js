import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import connectDB from '@/app/lib/config/db.js'
import Job from '@/app/lib/models/job.model.js'
import  Application  from '@/app/lib/models/application.model';
import { populate } from 'dotenv';

export async function POST( req ) {
try{

   const refreshToken = req.cookies.get("refreshToken")?.value;
    const decodedref = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const userId = decodedref.userId;
    console.log(userId);


  connectDB();
  const applicantion = await Application.find({applicant:userId}).sort({ createdAt: -1 }).populate({
    path:'job',
    options: {sort:{createdAt:-1}},
     populate:{
            path:'company'
        }
  
    
    // → sorts jobs within each Lease
    // populate:{
    //   path:'company',
    //   // options: {sort:{createdAt: -1}}, // → sorts companies within each job
    // }
  })

  console.log("hook working");


if(!applicantion)
{
  return NextResponse.json({message:"no application ",status:400})
}
return NextResponse.json({message:"application found",applicantion ,success:"true"})
    
}
catch(error)
    {
return NextResponse.json({message:"error internal",error})
    }
  }