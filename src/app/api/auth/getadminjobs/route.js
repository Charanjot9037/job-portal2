import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken";
import connectDB from '@/app/lib/config/db.js';
import Job from '@/app/lib/models/job.model.js';
import Company from '@/app/lib/models/company.model.js'; 
export async function POST(req) {
  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;
    const decodedref = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const userId = decodedref.userId;
    console.log(userId);

    await connectDB(); // ✅ Make sure it's awaited

    const jobs = await Job.find({ createdby: userId }).populate('company'); // ✅ fixed

    if (!jobs) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Jobs found", jobs });

  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import jwt from "jsonwebtoken";
// import connectDB from '@/app/lib/config/db.js'

// import Job from '@/app/lib/models/job.model.js'

// export async function POST(req) {
// try{

//    const refreshToken = req.cookies.get("refreshToken")?.value;
//     const decodedref = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
//     const userId = decodedref.userId;
//     console.log(userId);
// connectDB();
// const jobs = await Job.find({createdby:userId}).populate('companies');
// if(!jobs){
//     return NextResponse.json({message:"not found"})
// }
// return NextResponse.json({message:"jobs found",jobs})
// }
// catch(error){

// }}