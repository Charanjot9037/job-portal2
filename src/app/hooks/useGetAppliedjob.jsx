'use client';

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {setallappliedjobs} from '@/redux/jobSlice'

const useGetAppliedjob = () => {

const dispatch=useDispatch();

useEffect(()=>{
const fetchappliedjob=async()=>{

try {
        const res = await fetch(`/api/auth/getappliedjobs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data) {
        //   console.log("data",data.applicantion);
          dispatch(setallappliedjobs(data.applicantion));
        } else {
          toast.error(data.error || " Invalid credentials");
        }
      } catch (error) {
        console.log(error);
      }
    




}

fetchappliedjob();
},[])


 
}

export default useGetAppliedjob;
