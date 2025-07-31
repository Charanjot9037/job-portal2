// app/api/auth/forgot-password/route.js
import connectDB from '@/app/lib/config/db.js';
import { sendMail } from '@/app/lib/mail';
import jwt from 'jsonwebtoken';
import User from '@/app/lib/models/user.model.js';
export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;
console.log(email)
    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

 let user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    console.log(user);
    // if (!user) {
    //   return Response.json({ error: 'Email not found' }, { status: 404 });
    // }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    await sendMail({
      to: email,
      subject: 'Email Sent From Job Portal To  Reset Your Password',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    return Response.json({ message: 'Reset link sent to email' }, { status: 200 });
  } catch (error) {
    console.error('Forgot password error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// import connectDB from '@/app/lib/config/db.js';
// import { sendMail } from '@/app/lib/mail'; // your mail sending logic
// import jwt from 'jsonwebtoken';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).end();

//   const { email } = req.body;
//   console.log(email);
//   const user = await connectDB.user.findUnique({ where: { email } });

//   if (!user) return res.status(404).json({ error: 'Email not found' });

//   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
//     expiresIn: '1h',
//   });

//   const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

//   await sendMail({
//     to: email,
//     subject: 'Reset Your Password',
//     html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
//   });

//   res.json({ message: 'Reset link sent to email' });
// }
