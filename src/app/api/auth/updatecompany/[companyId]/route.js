import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/app/lib/config/db.js'
import Company from '@/app/lib/models/company.model';
export async function POST(req,{params}) {

try{
  const { companyId } = await params;
  console.log('companyid:', companyId);
const {name,description,website,location,imageUrl} =await req.json();
console.log(imageUrl)

 let company = await Company.findById(companyId);
    if (!company) {
      return NextResponse.json({ error: "company not found" }, { status: 404 });
    }

 if (name) company.name = name;
    if (description) company.description = description;
    if (website) company.website = website;
    if (location) company.location = location;
   
    if (imageUrl) {
      company.imageUrl = imageUrl; // ✅ saving Cloudinary URL
      console.log("Resume updated:", imageUrl);
    }

    // 7. Save user
    await company.save();



console.log(company)
if(!company){
        return NextResponse.json({ error: 'company not found' }, { status: 400 });
}
  return NextResponse.json({ message: 'company updated',company });

}catch(error)
{
  console.log(error)
        return NextResponse.json({ error: 'error' }, { status: 400 });
}

}