'use client';
import Image from "next/image";
import Register from "./register/page.js"
import Navbar from "./components/shared/Navbar.jsx";
import HeroSection from "./components/heroSection.jsx";
import Page1 from "./components/home.jsx"
import userGetAllJobs from '@/app/hooks/userGetAllJobs.jsx'
export default function Home() {
  userGetAllJobs();
  return (
  <>
 
{/* <Navbar /> */}
< Page1 />
  

  
  
  
  </>
    
  );
}
