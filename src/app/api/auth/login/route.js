import { NextResponse } from 'next/server';
import User from '@/app/lib/models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/app/lib/config/db.js'
export async function POST(req) {
  try {
    const { email, password} = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password and role is required ' }, { status: 400 });
    }

    await connectDB();

    let user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
    // if(role!= user.role){
    //       return NextResponse.json({ error: 'this role is not valid' }, { status: 401 });
    // }

   let currentUser={
    _id:user._id,
    fullname:user.fullname,
    email:user.email,
    phonenumber:user.phonenumber,
    role:user.role,
    profile:user.profile
  }

const tokenData={
  userId:user._id
}

    // Create access token (short expiry)
    const accessToken = jwt.sign(
      { tokenData, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Create refresh token (long expiry)
    const refreshToken = jwt.sign(
      { userId: user._id ,email:user.email},
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Save refresh token in DB
    user.refreshTokens.push(refreshToken);
    await user.save();

    const response = NextResponse.json({ message: 'Login successful' , currentUser});

    // Set HTTP-only cookies
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 15, // 15 minutes
      path: '/',
      sameSite: 'strict',
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      sameSite: 'strict',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
