
// import connectDB from '@/app/lib/config/db.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).end();

//   const { token, newPassword } = req.body;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     await connectDB.user.update({
//       where: { id: decoded.userId },
//       data: { password: hashedPassword },
//     });

//     res.json({ message: 'Password updated successfully' });
//   } catch (error) {
//     res.status(400).json({ error: 'Invalid or expired token' });
//   }
// }
import connectDB from "@/app/lib/config/db.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "@/app/lib/models/user.model.js";
export async function POST(req) {
  try {
    const body = await req.json();
    const { token, newPassword } = body;
console.log(token);
console.log(newPassword);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.userId);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
console.log(hashedPassword);
  const userId = decoded.userId;
  
   await connectDB();
   let user = await User.findById(userId);
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  if (newPassword) user.password = hashedPassword;

  await user.save();
    return Response.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
