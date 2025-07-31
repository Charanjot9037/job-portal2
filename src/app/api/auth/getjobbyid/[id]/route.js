import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import connectDB from '@/app/lib/config/db.js'
import mongoose from 'mongoose';
import Job from '@/app/lib/models/job.model.js'
import Company from'@/app/lib/models/company.model'
//job for students

export async function POST(request, { params }) {
try{

     const { id } = await params;
  console.log('ID:', id);
  connectDB();
const job = await Job.findById(id).populate('company');

if(!job){
    return NextResponse.json({message:"job  not found",success:"false" });
}
return NextResponse.json({message:"job found" ,job })
}catch(error)
{
console.log(error);
}

}