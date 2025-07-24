import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import connectDB from '@/app/lib/config/db.js'
import mongoose from 'mongoose';
import Job from '@/app/lib/models/job.model.js'
import Application from '@/app/lib/models/application.model'
import { populate } from 'dotenv';






export async function POST(request, { params }) {
//job id pass krni a applicants dekhn lai
  try{
  const { id } = await params;
  console.log('ID:', id);
  connectDB();
 const job = await Job.findById(id).populate({
    path:'application',
    options:{sort:{createdAt:-1}},
    populate:{
        path:'applicant'
    }

 });
if(!job){
    return NextResponse.json({message:"job not found",success:"false" })
}

return NextResponse.json({message:"found",job,succes:"true"});
  }
  catch(error){
    console.log(error)
return NextResponse.json(error)
  }
}