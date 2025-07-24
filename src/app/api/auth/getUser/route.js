import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  try {
    const accessToken = req.cookies.get('accessToken')?.value;

    const refreshToken = req.cookies.get('refreshToken')?.value;
    
      

    if (!accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
const decodedref = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    return NextResponse.json({ userId: decodedref.userId, email: decodedref.email });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}
