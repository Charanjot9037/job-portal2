import { NextResponse } from "next/server";
import User from "@/app/lib/models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/config/db.js";
import { cookies } from "next/headers";
export async function POST(req) {
  try {
    const { fullname, email, phonenumber, bio, skills} = await req.json();
    return Response.json({ message: "Success" });
  }
  catch(err){

  }
}