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

// const UserId=req.id; //logged in userid
const companies = await Company.find({userId});


if(!companies){
        return NextResponse.json({ error: 'company not  found' }, { status: 400 });
}


  return NextResponse.json({ message: 'companies  found' , status: 200 ,companies});

}catch(error)
{
        return NextResponse.json({ error: 'error' }, { status: 400 });
}

}