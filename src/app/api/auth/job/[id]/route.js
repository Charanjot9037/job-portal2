import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import connectDB from '@/app/lib/config/db.js'
import Job from '@/app/lib/models/job.model.js'
import Application from '@/app/lib/models/application.model.js'

export async function POST(req , {params} ) {
try{
   const refreshToken = req.cookies.get("refreshToken")?.value;
    const decodedref = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const userId = decodedref.userId;
    console.log(userId);

    
  const { id } = await params;
  const jobid=id;
  console.log('jobID:',jobid);
  if(!jobid){
    return NextResponse.json({ message:" job id not found", status:"false"})
};
//check if user has already  applied
  connectDB();

 const exsistingapplication = await Application.findOne({job:jobid,applicant:userId})
if(exsistingapplication){
    return NextResponse.status({message:"already registered",success:"false" });
}










    return NextResponse.json("done");
}
catch(error)
{

}}
