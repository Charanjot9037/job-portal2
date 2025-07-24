'use client'
import React from "react";
import LatestJobCards from "./ui/LatestJobCards";
import { useSelector } from "react-redux";
const randomjobs =[1,2,3,4,5,6,7,8]
import{motion} from"framer-motion"
import { useRouter } from 'next/navigation';

const Latestjob = () => {
const {allJobs}=useSelector(store=>store.job)

  
  return (
    <div className="max-w-7xl mx-5 lg:mx-15 my-20 ">
      
      <h1 className="text-4xl font-bold  ">
        <span className="text-[#6A38c2] ">Latest & Top</span> Job Openings{" "}
      </h1>
{/* Outer Wrapper */}
<div className="sm:hidden overflow-x-auto px-2 py-4 scrollbar-hide">
  <div className="flex gap-4 w-max">
    {allJobs?.length <= 0 ? (
      <span className="text-2xl font-bold">Please Login to Apply</span>
    ) : (
      allJobs?.slice(0, 6).map((job) => (
        <LatestJobCards
          key={job?._id}
          job={job}
          className="min-w-[280px] max-w-sm flex-shrink-0"
        />
      ))
    )}
  </div>
</div>

{/* Grid view for tablet and desktop */}
<div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-4 my-5 px-4">
  {allJobs?.length <= 0 ? (
    <span className="text-2xl font-bold">Please Login to Apply</span>
  ) : (
    allJobs?.slice(0, 6).map((job) => (
      <LatestJobCards
        key={job?._id}
        job={job}
        className="cursor-pointer"
      />
    ))
  )}
</div>


      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5 px-4">
  {allJobs?.length <= 0 ? (
    <span className="text-2xl font-bold">Please Login to Apply</span>
  ) : (
    allJobs?.slice(0, 6).map((job) => (
      <LatestJobCards className="cursor-pointer" key={job?._id} job={job} />
    ))
  )}
</div> */}

      {/* <div className="grid grid-cols-3 gap-4 my-5"> 
  {
      allJobs?.length<= 0 ?<span className="text-2xl font-bold">Please Login for  Aplly </span>: allJobs?.slice(0,6).map((job)=> <LatestJobCards className="cursor-pointer"  key={job?._id} job={job}/>)
      }
      </div> */}
    

     
    </div>
  );
};

export default Latestjob;
