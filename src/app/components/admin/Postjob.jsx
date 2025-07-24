// 'use client';
// import React from 'react'
// import {Input} from '@/components/ui/input'
// import{Button} from'../ui/button'
// import { Label } from '@/components/ui/label'
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import toast, { Toaster } from "react-hot-toast";
// import { useSelector } from 'react-redux';
// import  {Select, SelectTrigger, SelectValue,SelectContent, SelectGroup, SelectItem  } from'@/components/ui/select';
// import { ArrowLeft, Loader2 } from "lucide-react";

// const companyArray=[]

// const Postjob = () => {
//    const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };
//    const [formData, setFormData] = useState({
  
//      title:'',
//      description:'',
//      requirements:'',
//      salary:'',
//      location:'',
//      jobtype:'',
//      experiance:'',
//      positions:'',
//      companyid:''

//     });
//     const router=useRouter();
//   const [Loading,setLoading]=useState(false);
// const {companies}=useSelector(store=>store.company)
//   const selectChangeHandler=(value)=>{
//     const selectedcompany=companies.find((company)=>company.name==value);
//     setFormData({...formData,companyid:selectedcompany._id});
//     console.log(selectedcompany);
//   }
//    const handleSubmit = async (e) => {
// e.preventDefault();
// console.log(formData);
//     try {

// setLoading(true);
//       const res = await fetch('/api/auth/postjob', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
        
//       if (data.success) {
//       //  dispatch(setSingleCompany(data.company))
//         toast.success('Job Posted Successfully!');
//         router.push("/adminjobs");
//       //  const companyId=data.company._id;
//         //  setTimeout(() => router.push(`/companies/${companyId}`), 1500);
//       } else {
//         toast.error(data.error || ' Invalid credentials');
//       }
//     } catch (err) {
//       toast.error(' Server error');
//     }finally{
//       setLoading(false);
//     }
//   };
 
//   return (
//     <div>
//       <Toaster/>
//         <h1 className="text-2xl font-bold text-center py-5">
//             Post{" "}
//             <span className="text-[#6A38C2] hover:text-[#5b30a6]  duration-100 ease-linear">
//               Job
//             </span>
//           </h1>
// <div className='flex flex-col items-center justify-center  my-5 mt-5  '>
//   <form className='shadow-lg rounded-2xl py-10 '>


//     <div className='grid grid-cols-2 gap-2  px-10 '>
   
// <div>
// <Label>Title</Label>
// <Input 
// type="text"
// name="title"
// onChange={handleChange}
// value={formData.title}
// className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
// />
// </div>
// <div>
// <Label>Description</Label>
// <Input 
// type="text"
// name="description"
// onChange={handleChange}
// value={formData.description}
// className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
// />
// </div>
// <div>
// <Label>Requirements</Label>
// <Input 
// type="text"
// name="requirements"
// onChange={handleChange}
// value={formData.requirements}
// className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
// />
// </div>
// <div>
// <Label>salary</Label>
// <Input 
// type="text"
// name="salary"
// onChange={handleChange}
// value={formData.salary}
// className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
// />
// </div>
// <div>
// <Label>location</Label>
// <Input 
// type="text"
// name="location"
// onChange={handleChange}
// value={formData.location}
// className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
// />
// </div>
// <div>
// <Label>Experiance</Label>
// <Input 
// type="number"
// name="experiance"
// onChange={handleChange}
// value={formData.experiance}
// className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
// />
// </div>
// <div>
// <Label>Positions</Label>
// <Input 
// type="number"
// name="positions"
// onChange={handleChange}
// value={formData.positions}
// className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
// />
// </div>
// <div>
// <Label>Job Type </Label>
// <Input 
// type="text"
// name="jobtype"
// onChange={handleChange}
// value={formData.jobtype}
// className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
// />



// </div>

// <div >
// {
//   companies.length > 0&&(
//     <Select onValueChange={selectChangeHandler}>
//       <SelectTrigger className="w-[180px]">
//         <SelectValue placeholder="Select a Company" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//         {
//           companies.map((company)=>{
//             return(
//                 <SelectItem value={company.name} key={company._id}>{company.name}</SelectItem>
                
//             )
//           })
//         }
  
        
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   )
// }
// </div>
//     </div>
    
//      <Button type="submit" className="w-full mx-3 mt-5" onClick={handleSubmit}>
//             {Loading ? <Loader2 className="animate-spin" /> : "Post Job"}
//           </Button>
         


//        {
//             companies.length===0 && <p className='text-xs text-red-600 font-bold text-center my-3 '>Please Register Company First,Beofre posting Job</p>
//           }
//   </form>

// </div>

//     </div>
//   )
// }

// export default Postjob
"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const Postjob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobtype: "",
    experiance: "",
    positions: "",
    companyid: "",
  });

  const router = useRouter();
  const [Loading, setLoading] = useState(false);
  const { companies } = useSelector((store) => store.company);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name === value);
    setFormData({ ...formData, companyid: selectedCompany._id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/postjob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Job Posted Successfully!");
        router.push("/adminjobs");
      } else {
        toast.error(data.error || "Invalid credentials");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-20 bg-gray-50">
      <Toaster />
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-bold text-center text-gray-800 mb-10"
      >
        Post{" "}
        <span className="text-purple-600 hover:text-purple-700 transition duration-200">
          Job
        </span>
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Title", name: "title" },
            { label: "Description", name: "description" },
            { label: "Requirements", name: "requirements" },
            { label: "Salary(LPA)", name: "salary" },
            { label: "Location", name: "location" },
            { label: "Experience", name: "experiance", type: "number" },
            { label: "Positions", name: "positions", type: "number" },
            { label: "Job Type", name: "jobtype" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <Label>{label}</Label>
              <Input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="my-1 focus-visible:ring-1 focus-visible:ring-purple-500"
                placeholder={`Enter ${label}`}
              />
            </div>
          ))}

          {companies.length > 0 && (
            <div>
              <Label>Company</Label>
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem key={company._id} value={company.name}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full mt-8 bg-[#6A38C2] hover:bg-[#6A38C2] transition duration-200"
          disabled={Loading}
        >
          {Loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Post Job"}
        </Button>

        {companies.length === 0 && (
          <p className="text-center mt-4 text-sm text-red-600 font-semibold">
            Please register a company first before posting a job.
          </p>
        )}
      </motion.form>
    </div>
  );
};

export default Postjob;
