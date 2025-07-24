'use client';
import { setAllJobs } from '@/redux/jobSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
const userGetAllJobs = () => {
    const dispatch = useDispatch();
const {searchquery}=useSelector(store=>store.job);
console.log("query",searchquery);
useEffect(()=>{
    const fetchAllJobs=async()=>{
        try{
 const res = await fetch(`/api/auth/getalljobs?keyword=${searchquery}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

    
      });
       const data = await res.json();
        
      if (data) {
        console.log("in hook")
      console.log(data);
       dispatch(setAllJobs(data.jobs));
  
      } else {
        toast.error(data.error || ' Invalid credentials');
      }
        }catch(error){
            console.log(error)
        }
    }
    fetchAllJobs();
},[])
}

export default userGetAllJobs;
