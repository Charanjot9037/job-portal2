import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/app/lib/config/db.js'
import User from '@/app/lib/models/user.model.js';
import multer from 'multer';



export async function POST(req) {
  const {fullname, email, password,phonenumber,role,profile } = await req.json();
if(!fullname||!email||!password||!phonenumber||!role){
     return NextResponse.json({ error: 'somethig missing' }, { status: 400 });
}


multer
//   const storage = multer.memoryStorage();
// const singleUpload = multer({storage}).single("file");
  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({fullname,email, password: hashedPassword ,phonenumber,role,profile});

  return NextResponse.json({ success: true });
}
