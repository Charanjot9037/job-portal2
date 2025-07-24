'use client';
import React from 'react'

import { useParams } from 'next/navigation';
import UpdateCompany from '@/app/components/admin/UpdateCompany';
const page = () => {
      const params = useParams();
      const companyId = params.companyId ;
  return (
    <div>
   
    <UpdateCompany companyId={companyId}/>
    </div>
  )
}

export default page
