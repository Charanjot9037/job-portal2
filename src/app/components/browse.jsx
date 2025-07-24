'use client';

import React from 'react'
import AllJobs from './AllJobs'
import {Label} from './ui/label'
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setsearchquery } from "@/redux/jobSlice";
import userGetAllJobs from '../hooks/userGetAllJobs';
const randomjob=[1,2,3]

const Browse = () => {
  userGetAllJobs();
const dispatch=useDispatch();
  useEffect(()=>{
    return()=>{
dispatch(setsearchquery(""));
    }
  },[]);
    const {allJobs}=useSelector(store=>store.job)
  return (
    <div>
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-10 mx-5'>Search Results ({allJobs?.length})</h1>
        <div className='flex-1 h-[88vh] overflow-y-auto pb-5 px-5'>
<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
{
  allJobs?.map((job)=>{
    return <AllJobs  key={job._id} job={job}/>
  })
}
</div>
        </div>


      </div>
    </div>
  )
}

export default Browse
