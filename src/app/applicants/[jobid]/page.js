'use client';
import React from 'react'
import Applicant from '@/app/components/admin/applicant'
import { useParams } from 'next/navigation';
const page = () => {
   const params = useParams();
        const jobid = params.jobid;

        
  return (
    <div>
      <Applicant id={jobid}/>
    </div>
  )
}

export default page
