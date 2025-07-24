
import { NextResponse } from "next/server";
import User from "@/app/lib/models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/config/db.js";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    // 1. Extract updated profile data
    const { fullname, email, phonenumber, bio, skills, imageUrl ,profileurl} = await req.json();
    console.log("in backend", profileurl);

    // 2. Check access token
    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    jwt.verify(accessToken, process.env.JWT_SECRET); // token valid

    // 3. Get user ID from refresh token
    const refreshToken = req.cookies.get("refreshToken")?.value;
    const decodedref = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const userId = decodedref.userId;
    console.log("User ID:", userId);

    // 4. Parse skills
    const skillsArray = skills ? skills.split(",") : [];

    // 5. Connect to DB & find user
    await connectDB();
    let user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 6. Update user profile fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phonenumber) user.phonenumber = phonenumber;
    if (bio) user.profile.bio = bio;
    if (skillsArray.length) user.profile.skills = skillsArray;
    if (imageUrl) {
      user.profile.resume = imageUrl; // ✅ saving Cloudinary URL
      console.log("Resume updated:", imageUrl);
    }
    if(profileurl)
    {
      user.profile.profilephoto=profileurl; 
        console.log("photo updated:", profileurl);
    }

    // 7. Save user
    await user.save();

    // 8. Construct returned user object
    const currentUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: {
        skills: user.profile.skills,
        bio: user.profile.bio,
        resume: user.profile.resume, // ✅ correct value
        profilephoto:user.profile.profilephoto 
      },
    };

    console.log("Returning user:", currentUser);

    return NextResponse.json({ message: "Success", accessToken, currentUser });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


// import { NextResponse } from "next/server";
// import User from "@/app/lib/models/user.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import connectDB from "@/app/lib/config/db.js";
// import { cookies } from "next/headers";

// export async function POST(req) {
//   try {
//     const { fullname, email, phonenumber, bio, skills,imageUrl} = await req.json();

//   console.log("in backend",imageUrl)



//     const accessToken = req.cookies.get("accessToken")?.value;
//     if (!accessToken) {
//       return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//     }

//     const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);


// //use this to get user id

//     const refreshToken = req.cookies.get("refreshToken")?.value;
//     const decodedref = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
//     const userId = decodedref.userId;
//     console.log(userId);

  

//     let skillsArray;

//     if (skills) {
//       skillsArray = skills.split(",");
//     }



//     await connectDB();

//     let user = await User.findById(userId);
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     user.save();
//     // updating data
//     if (fullname) {
//       user.fullname = fullname;
//     }

//     if (email) {
//       user.email = email;
//     }
//     if (phonenumber) {
//       user.phonenumber = phonenumber;
//     }
//     if (bio) {
//       user.profile.bio = bio;
//     }

//     if (skills)
//        {user.profile.skills =skillsArray;

//        }
// if(imageUrl){
//   user.profile.resume=imageUrl;
//   console.log("hello");
// }
//     let currentUser = {
//       _id: user._id,
//       fullname: user.fullname,
//       email: user.email,
//       phonenumber: user.phonenumber,
//       role: user.role,
//       profile:{
//  skills:user.profile.skills,
//       bio:user.profile.bio,
//       resume:user.profile.imageUrl
//       }
  
   
   
//     };

//    console.log(currentUser);

//     return Response.json({ message: "Success", accessToken, currentUser });

  
//   } catch (error) {
//     console.error("Login error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
