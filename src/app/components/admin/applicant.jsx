'use client';
import React, { useEffect } from 'react'
import ApplicantsTable from './ApplicantsTable'
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from "react-hot-toast";
import {setAllApplicants} from'@/redux/applicationslice'
const Applicant = (id) => {

  console.log(id.id);
  const dispatch=useDispatch();

const {applicants}=useSelector(store=>store.Application);
console.log(setAllApplicants);

useEffect(()=>{
const fecthapplicants=async()=>{
    try {
      const res = await fetch(`/api/auth/getapplicants/${id.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(formData),
      });

      const data = await res.json();
       
      if (data) {

         console.log("data",data);
  dispatch(setAllApplicants(data.job))
        // toast.success('Action Performed  Successfully!');
        // router.push("/adminjobs");
    
      } else {
        
        toast.error(data.error || ' Invalid credentials');
      }
    } catch (err) {
      console.log(err)
      toast.error(' Server error');
    }
}
  







fecthapplicants();


},[])


  return (
    <div>
      <Toaster/>
      <div className='max-w-7xl mx-auto'>
        {console.log("appilcant",applicants)}
<h1 className='font-bold text-xl my-5'>Applicants ({applicants?.application.length})

</h1>
<ApplicantsTable/>
      </div>
    </div>
  )
}

export default Applicant
