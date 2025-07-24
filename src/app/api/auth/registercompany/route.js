import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import connectDB from '@/app/lib/config/db.js'
import Company from '@/app/lib/models/company.model';
export async function POST(req) {
  try{
        const refreshToken = req.cookies.get("refreshToken")?.value;
    const decodedref = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const userId = decodedref.userId;
    console.log(userId);
    
  const {name,description} = await req.json();
let location="";
let website="";
let imageUrl="";
  await connectDB();

  const existingcompany = await Company.findOne({name});
  if (existingcompany) {
    return NextResponse.json({ error: 'company already registered' }, { status: 400 });
  }



  let company= await Company.create({name,description,userId,location,website,imageUrl});
if(!company){
   return NextResponse.json({message:"not created" });
}
console.log(company)
  return NextResponse.json({ message:"company created",success: true,company });

  }
  catch(error){
     return NextResponse.json({error,success: false});
  }


}
