"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Search } from "lucide-react";
import { useRouter } from 'next/navigation';

import React from "react";
import {setsearchquery} from "@/redux/jobSlice"
const HeroSection = () => {
  const dispatch=useDispatch();
  const router=useRouter();
  const [query,setquery]=useState("");
const searchhandler=()=>{
dispatch(setsearchquery(query));
router.push("/Browse");
}

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-5">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#6A38C2] font-medium ">
          Number 1 Job hunt Website
        </span>
        <h1 className="text-4xl font-bold">
          Search, Apply & <br />
          Get Your <span className="text-[#6A38C2]">Dream Job</span>
        </h1>
        <p className="text-gray-600 font-medium p-1">
          A platform where people who need jobs can find jobs and companies
          looking for job seekers can find the perfect employees.
        </p>
        <div
  className="flex w-full sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-2/5 shadow-lg border border-gray-200 px-3 rounded-full items-center gap-2 mx-auto transition-all duration-300 ease-in-out hover:shadow-xl focus-within:shadow-2xl"
>
  <input
    type="text"
    placeholder="Find Your Dream Jobs"
    className="outline-none border-none w-full p-3 text-sm sm:text-base bg-transparent transition duration-200 focus:pl-4"
    onChange={(e) => setquery(e.target.value)}
  />
  <button
    onClick={searchhandler}
    className="transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95"
  >
    <Search className="h-10 w-10 p-2 text-white bg-[#6A38C2] rounded-full hover:bg-[#4d3d69] transition-colors duration-300" />
  </button>
</div>

        {/* <div className="flex w-[40%]  shadow-lg  border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find Your Dream Jobs"
            className="outline-none border-none w-full p-3"
            onChange={(e)=>setquery(e.target.value)}
          />
          <button className="" onClick={searchhandler}>
            <Search className=" h-12 p-2 w-15 text-white  bg-[#6A38C2] rounded-r-full" />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default HeroSection;
