import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken";
import connectDB from '@/app/lib/config/db.js';
import Job from '@/app/lib/models/job.model.js';
import Application from '@/app/lib/models/application.model.js';

export async function POST(req, { params }) {
  try {
    await connectDB();

    // Get token from cookies
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json({ message: "Unauthorized: No token provided", success: false }, { status: 401 });
    }

    let decodedref;
    try {
      decodedref = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      return NextResponse.json({ message: "Invalid or expired token", success: false }, { status: 403 });
    }

    const userId = decodedref.userId;
  

    
  const { id } = await params;
  const jobid=id;
 

    if (!jobid) {
      return NextResponse.json({ message: "Job ID not provided", success: false }, { status: 400 });
    }

    // Check if job exists
    const job = await Job.findById(jobid);
    if (!job) {
      return NextResponse.json({ message: "Job not found", success: false }, { status: 404 });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({ job: jobid, applicant: userId });
    if (existingApplication) {
      return NextResponse.json({ message: "already registered", success: false }, { status: 409 });
    }

    // Create application
    const newApplication = await Application.create({
      job: jobid,
      applicant: userId,
    });

    // Push to job's application list
    job.application.push(newApplication._id);
    
    await job.save();

    return NextResponse.json({ message: "Job applied successfully", success: true }, { status: 200 });

  } catch (error) {
    console.error("Apply Job Error:", error);
    return NextResponse.json({ message: "Server error", error: error.message, success: false }, { status: 500 });
  }
}


// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import jwt from "jsonwebtoken";
// import connectDB from '@/app/lib/config/db.js'
// import Job from '@/app/lib/models/job.model.js'
// import  Application  from '@/app/lib/models/application.model';

// export async function POST(req , {params} ) {
// try{

//    const refreshToken = req.cookies.get("refreshToken")?.value;
//     const decodedref = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
//     const userId = decodedref.userId;
//     console.log(userId);


//   const { id } = await params;
//   const jobid=id;
//   console.log('jobID:',jobid);
//   console.log("hello");

// if(!jobid){
//     return NextResponse.json({ message:" job id not found", status:"false"})
// };
// //check if user has already  applied
//   connectDB();
// const exsistingapplication = await Application.findOne({job:jobid,applicant:userId})
// if(exsistingapplication){
//     console.log("already applied");
//     return NextResponse.status({message:"already registered",success:"false" });
// }
// //check if job exsist
// const job =await Job.findById(jobid);
// if(!job){
//     return NextResponse.json({message:"job not found",status:"false"})
// }
// //create new application
// const newapplication=  await Application.create({
// job:jobid,
// applicant:userId

// });
// job.application.push(newapplication._id);
// await job.save();

// return NextResponse.json({message:"Job applied succesfully",succes:true})
    
// }

//     catch(error)
//     {
// return NextResponse.json("error",error)
//     }}