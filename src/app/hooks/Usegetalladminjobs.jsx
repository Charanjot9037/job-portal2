// import React from 'react'

// const Usegetalladminjobs = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Usegetalladminjobs
'use client';
import { setAllJobs } from '@/redux/jobSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {setAllAdminJobs} from '@/redux/jobSlice'
const Usegetalladminjobs = () => {
    const dispatch = useDispatch();
useEffect(()=>{
    const fetchAllAdminJobs=async()=>{
        try{
 const res = await fetch('/api/auth/getadminjobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

    
      });
       const data = await res.json();
        
      if (data) {
      console.log(data.jobs);
       dispatch(setAllAdminJobs(data.jobs));
  
      } else {
        toast.error(data.error || ' Invalid credentials');
      }
        }catch(error){
            console.log(error)
        }
    }
    fetchAllAdminJobs();
},[])
}

export default Usegetalladminjobs;
