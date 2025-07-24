import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import connectDB from '@/app/lib/config/db.js'
import mongoose from 'mongoose';
import Job from '@/app/lib/models/job.model.js'
import { populate } from 'dotenv';

import Application from '@/app/lib/models/application.model.js'




export async function POST(req,{params}) {

  try{
  const { id } = await params;
  console.log('ID:', id);
  connectDB();
console.log("helllo");

 const { status } = await req.json();
console.log("status",status);
if(!status)
{
    return NextResponse.json({message:"status is required", succes:"false"})
};
console.log(status);
// find the application by applicantion id


const applicantion = await Application.findOne({_id:id})
console.log(applicantion);

if(!applicantion)
{
    return NextResponse({message:"not found any application",status :404})
}
// //update status
applicantion.status=status;

await applicantion.save();

return NextResponse.json({message:"status updated",succes:"true"});
  }
  catch(error){
    console.log(error)
return NextResponse.json({error})
  }
}