"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { setSingleCompany } from "@/redux/companySlice";

const Companycreate = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleCancel = () => {
    router.push("/admin");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/auth/registercompany", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        dispatch(setSingleCompany(data.company));
        toast.success("Company Registered successfully!");
        const companyId = data.company._id;
        setTimeout(() => router.push(`/companies/${companyId}`), 1500);
      } else {
        toast.error(data.error || "Invalid credentials");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="p-4 md:p-6"
    >
      <Toaster position="top-center" />
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-xl">
        <div className="mb-8">
          <h1 className="font-bold text-2xl text-gray-800 mb-2">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to name your company? You can change this later.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="name">Company Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="e.g., Job Hunt, Microsoft"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              name="description"
              placeholder="Enter a short company description"
              value={formData.description}
              onChange={handleChange}
              className="mt-2 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            />
          </div>

          <div className="flex items-center gap-4 pt-8">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="hover:bg-gray-100 transition-all"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700 text-white transition-all"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Companycreate;

// 'use client';
// import { useDispatch } from 'react-redux';
// import React from 'react'
// import {Input} from '@/components/ui/input'
// import{Button} from'../ui/button'
// import { Label } from '@/components/ui/label'
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import toast, { Toaster } from "react-hot-toast";
// import { setSingleCompany } from '@/redux/companySlice';
// const Companycreate = () => {
//      const router = useRouter();
//      const handlecancel=()=>{
//   router.push("/admin");
//   }
//    const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };
// const dispatch=useDispatch();
  
//  const [formData, setFormData] = useState({

//     name:'',
//     description:''
//   });


//   const handleSubmit = async () => {
//     try {


//       const res = await fetch('/api/auth/registercompany', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
        
//       if (data.success) {
//        dispatch(setSingleCompany(data.company))
//         toast.success('Company Registered  successfully!');
//        const companyId=data.company._id;
//          setTimeout(() => router.push(`/companies/${companyId}`), 1500);
//       } else {
//         toast.error(data.error || ' Invalid credentials');
//       }
//     } catch (err) {
//       toast.error(' Server error');
//     }
//   };





//   return (
//     <div>
//           <Toaster position="top-center" />
//       <div className='max-w-4-xl mx-40'>
//         <div className='my-10'>
//             <h1 className='font-bold text-2xl'>Your Company Name</h1>
// <p className='text-gray-500'>What would you like to give your company name? you can change this later </p>

//         </div>
// <Label>Company Name</Label>
// <Input type="text"
// className="my-2"
// name="name"
// placeholder="Job hunt, Microsoft,etc"
// onChange={handleChange}
// />

// <Label>Description</Label>
// <Input type="text"
// className="my-2"
// name="description"
// placeholder="Description"
// onChange={handleChange}
// />

// <div className='flex items-center gap-2 my-10'>
// <Button variant="outline" onClick={handlecancel}>Cancel</Button>
// <Button onClick={handleSubmit}>Continue </Button>
// </div>
//       </div>
//     </div>
//   )
// }

// export default Companycreate
