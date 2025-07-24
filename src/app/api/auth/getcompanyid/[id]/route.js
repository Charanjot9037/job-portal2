import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/app/lib/config/db.js'
import Company from '@/app/lib/models/company.model';




// app/api/company/[id]/route.js


export async function POST(request, { params }) {
  const { id } = await params;
  console.log('ID:', id);
  connectDB();
  // ... lookup company by id

const company = await Company.findById(id);


  
  return NextResponse.json({ message: 'OK', id ,company});
}





// export async function POST(req,{params}) {

// try{

// // const id={params};
// // console.log({params});

//   const { id } = await params;
//   console.log('ID:', id);

// const company = await Company.find(id);
// if(!company){
//         return NextResponse.json({ error: 'company not found' }, { status: 400 });
// }
//   return NextResponse.json({ message: 'company found' , status: 200 });

// }catch(error)
// {
//         return NextResponse.json({ error: 'error' }, { status: 400 });
// }

// }

