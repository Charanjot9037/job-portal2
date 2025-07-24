import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import connectDB from '@/app/lib/config/db.js'
import { cookies } from "next/headers";

import Job from '@/app/lib/models/job.model.js'
export async function POST(req) {
  try {
const {title,description,requirements,salary,location,jobtype,experiance,positions,companyid}= await req.json()
   
//useruid of login person
const refreshToken = req.cookies.get("refreshToken")?.value;
    const decodedref = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const userId = decodedref.userId;
    console.log(userId);
    
if(!title || !description || !requirements || !salary || !location || !jobtype || !experiance || !positions || !companyid)
{
  return NextResponse.json({ error: "Somethig  is missing " }, { status: 400 });


}
const applications=null;
connectDB();
const job = await Job.create({
title,
description,
requirements:requirements.split(" , "),
salary:Number(salary),
location,
jobtype,
experiancelevel:experiance,
positions,
company:companyid,
createdby:userId,

});


  
  return NextResponse.json({ message: 'OK',success:"true"});


}
  catch(error){

  
  return NextResponse.json({ error});
  }}