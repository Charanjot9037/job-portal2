"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOutIcon, Menu, X, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { User } = useSelector((store) => store.auth);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        toast.success("Logged out successfully");
        router.push("/login");
        dispatch(setUser(null));
      } else {
        toast.error("Logout failed");
      }
    } catch (err) {
      toast.error("Server error during logout");
    }
  };

  return (
    <nav className="bg-white border-b border-[#6A38C2] shadow-xl z-50 relative">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <h1 className="text-2xl font-bold text-gray-800">
            Job{" "}
            <span className="text-[#6A38C2] hover:text-[#5b30a6] transition duration-150 ease-linear">
              Portal
            </span>
          </h1>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <Menu/>
            </button>
          </div>
        </div>

        {/* Links (desktop) */}
        <div className="hidden lg:flex items-center gap-5">
          <ul className="flex gap-5 items-center font-semibold">
            {User && User.role === "recruiter" ? (
              <>
                <Link href="/admin">Companies</Link>
                <Link href="/adminjobs">Jobs</Link>
              </>
            ) : (
              <>
                <Link href="/">
                  <span className="text-[#6A38C2]">H</span>ome
                </Link>
                <Link href="/Jobs">
                  <span className="text-[#6A38C2]">J</span>obs
                </Link>
                <Link href="/Browse">
                  <span className="text-[#6A38C2]">B</span>rowse
                </Link>
              </>
            )}
          </ul>
          {/* Auth Buttons */}
          {!User ? (
            <div className="flex gap-2">
              <Button variant="outline">
                <Link href="/login">Login</Link>
              </Button>
              <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] transition duration-100 ease-linear">
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer h-10 w-10">
                  <AvatarImage
                    src={
                      User.profile?.profilephoto?.trim() === ""
                        ? "https://github.com/shadcn.png"
                        : User.profile.profilephoto
                    }
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-2 shadow-md bg-white mt-3">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage
                      src={
                        User.profile?.profilephoto?.trim() === ""
                          ? "https://github.com/shadcn.png"
                          : User.profile.profilephoto
                      }
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{User.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{User.role}</p>
                  </div>
                </div>
                <div className="mt-2">
                  {User?.role === "student" && (
                    <div className="flex items-center gap-1">
                      <User2 />
                      <Button variant="link">
                        <Link href="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <LogOutIcon />
                    <Button variant="link" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <ul className="flex flex-col items-start px-4 py-3 gap-3 font-semibold">
            {User && User.role === "recruiter" ? (
              <>
                <Link href="/admin">Companies</Link>
                <Link href="/adminjobs">Jobs</Link>
              </>
            ) : (
              <>
                <Link href="/">Home</Link>
                <Link href="/Jobs">Jobs</Link>
                <Link href="/Browse">Browse</Link>
              </>
            )}
            {!User ? (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register">Sign up</Link>
              </>
            ) : (
              <>
                {User.role === "student" && <Link href="/profile">View Profile</Link>}
                <button
                  onClick={handleLogout}
                  className="text-left text-red-600 font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


// "use client";
// import React from "react";
// import Link from "next/link";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@radix-ui/react-popover";
// import { Avatar } from "../ui/avatar";

// import { Button } from "../ui/button";
// import { AvatarImage } from "../ui/avatar";
// import { AvatarFallback } from "../ui/avatar";
// import { LogOutIcon, Search, User2 } from "lucide-react";
// import { store } from "@/redux/store";
// import { useDispatch, useSelector } from "react-redux";
// import toast, { Toaster } from "react-hot-toast";
// import { useRouter } from 'next/navigation';
// import { setUser } from "@/redux/authSlice";



// const Navbar = () => {
//   const dispatch = useDispatch();
// const router=useRouter();
//   const handleLogout = async () => {
//     try {
//       const res = await fetch("/api/auth/logout", { method: "POST" });
//       if (res.ok) {
//         toast.success("Logged out successfully");
// router.push("/login");
//         dispatch(setUser(null));
//       } else {
//         toast.error("Logout failed");
//       }
//     } catch (err) {
//       toast.error("Server error during logout", err);
//     }
//   };
//   const { User } = useSelector((store) => store.auth);

//   return (
//     <div className="bg-white border-[#6A38C2] shadow-xl">
//       <Toaster position="top-center" />
//       <div className="flex flex-col lg:flex-row items-center justify-between mx-auto max-w-7xl h-16">
//         <div>
//           <h1 className="text-2xl font-bold">
//             Job{" "}
//             <span className="text-[#6A38C2] hover:text-[#5b30a6]  duration-100 ease-linear">
//               Portal
//             </span>
//           </h1>
//         </div>
//         <div className="lg:flex items-center gap-5">
//           <ul className=" lg:flex gap-5 items-center font-[600]">

//            {
//             User && User.role == "recruiter" ?(
//               <>
//               <Link href="/admin">Companies</Link>
//             <Link href="/adminjobs">Jobs</Link>
//               </>
//             ):(<>
          
//              <Link href="/"><span className="text-[#6A38C2]">H</span>ome</Link>
//             <Link href="/Jobs"><span className="text-[#6A38C2]">J</span>obs</Link>
//             <Link href="/Browse"><span className="text-[#6A38C2]">B</span>rowse</Link>
//             </>)
             
//            }


           
           

//           </ul>

//           {!User ? (
//             <div className="flex gap-2">
              
//               <Button variant="outline">
//                 <Link href="/login">Login</Link>
//               </Button>
//               <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]  duration-100 ease-linear">
//                 <Link href="/register">Sign up</Link>
//               </Button>
//             </div>
//           ) : (



            
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Avatar className="cursor-pointer h-10 w-10">
//                    {
//                       User.profile.profilephoto==' '&&(
//                          <AvatarImage src="https://github.com/shadcn.png" />
//                       )
//                     }  
                  
//                   <AvatarImage src={User.profile.profilephoto } />
//                 </Avatar>
//               </PopoverTrigger>
//               <PopoverContent className="w-80 p-2 shadow-md bg-white mt-3">
//                 <div>
//                   <div className="flex gap-4 space-y-2">
//                     <Avatar className="cursor-pointer">

//                     {
//                       User.profile.profilephoto==' '&&(
//                          <AvatarImage src="https://github.com/shadcn.png" />
//                       )
//                     }  
//                       <AvatarImage src={User.profile?.profilephoto } />
//                     </Avatar>
//                     <div>
//                       <h4 className="font-medium">{User.fullname}</h4>
//                       <p className="text-sm text-muted-foreground">
//                         {User.role}
//                       </p>
//                     </div>
//                   </div>
//                   <div>
//                     {
//                       User && User.role == 'student' && (
//                           <div className="lg:flex w-fit items-center  cursor-pointer">
//                       <User2></User2>
//                       <Button variant="link">
//                         <Link href="/profile">View Profile</Link>
//                       </Button>
//                     </div>
//                       )
//                     }
                  
//                     <div className="lg:flex w-fit items-center cursor-pointer">
//                       <LogOutIcon></LogOutIcon>
//                       <Button variant="link" onClick={handleLogout}>
//                         Logout
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
