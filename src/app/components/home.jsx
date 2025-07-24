"use client";
import React, { useEffect } from 'react'
import HeroSection from './heroSection'
import CategoryCarousel from './CategoryCarousel'
import Latestjob from './Latestjob'
import Footer from './footer'
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';

import  userGetAllJobs from '../hooks/userGetAllJobs'

import { setsearchquery } from "@/redux/jobSlice";
const Page1 = () => {
const dispatch=useDispatch();
 // ✅ Empty array = only runs on unmount
  useEffect(()=>{
    return()=>{
dispatch(setsearchquery(""));
    }
  },[]);
   userGetAllJobs();
   const router=useRouter();
   const{User}=useSelector(store=>store.auth);
   useEffect(()=>{
    if(User?.role=='recruiter'){
router.push("/admin")
    }
   },[])
 
  return (
    <div>
    < HeroSection />
    <CategoryCarousel/>
    <Latestjob/>
    <Footer />
    </div>
  )
}




export default Page1
