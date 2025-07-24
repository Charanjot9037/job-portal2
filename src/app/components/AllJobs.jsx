'use client';
import React, { useEffect } from 'react'
import {Badge} from "./ui/badge.jsx"
import {Button} from '@/components/ui/button.jsx'
import { Bookmark } from 'lucide-react'

import { Avatar } from './ui/avatar.jsx'
import { AvatarImage } from '@radix-ui/react-avatar'
import Link from 'next/link.js'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setsearchquery } from '@/redux/jobSlice.js';
const jobid="urkhfkf"
const AllJobs = ({job}) => {


    const Router=useRouter();

    function handleclick(){
        Router.push(`/jobdescription/${job._id}`)

    }
  return (
    <div className="p-5 rounded-xl shadow-lg bg-white transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl w-full max-w-2xl mx-auto">
  {/* Top row - posted date */}
  <div className="flex items-center justify-between">
    <p className="text-sm text-gray-500">
      Posted on: {job.createdAt.split("T")[0]}
    </p>
    {/* Optional Bookmark */}
    {/* <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button> */}
  </div>

  {/* Company info */}
  <div className="flex items-center gap-3 my-4">
    <button className="bg-transparent">
      <Avatar className="cursor-pointer transition-transform duration-300 hover:scale-110">
        <AvatarImage src={job.company.imageUrl} />
      </Avatar>
    </button>
    <div>
      <h1 className="font-semibold text-base md:text-lg">{job.company.name}</h1>
      <p className="text-sm text-gray-500">{job.location}</p>
    </div>
  </div>

  {/* Job Title & Description */}
  <div>
    <h1 className="font-bold text-lg md:text-xl my-2">{job.title}</h1>
    <p className="text-sm text-gray-600 leading-relaxed">{job.description}</p>
  </div>

  {/* Badges */}
  <div className="flex flex-wrap gap-2 mt-4">
    <Badge
      className="text-blue-700 font-semibold hover:bg-blue-700 hover:text-white transition-colors"
      variant="ghost"
    >
      Positions: {job.positions}
    </Badge>
    <Badge
      className="text-gray-800 font-semibold hover:bg-black hover:text-white transition-colors"
      variant="ghost"
    >
      {job.jobtype}
    </Badge>
    <Badge
      className="text-[#6A38c2] font-semibold hover:bg-[#6A38c2] hover:text-white transition-colors"
      variant="ghost"
    >
      {job.salary} LPA
    </Badge>
  </div>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mt-6">
    <Button
      variant="outline"
      className="bg-[#6A38c2] text-white hover:bg-[#5631a4] transition-all duration-300"
      onClick={handleclick}
    >
      Details
    </Button>
    {/* <Button className="font-bold text-white hover:bg-[#3e3155] transition-all delay-75">Save For Later</Button> */}
  </div>
</div>

//     <div className='p-5 rounded-md  shadow-lg'>
//         <div className='flex  items-center justify-between'>
//     <p className='text-sm text-gray-500'>Posted on :{job.createdAt.split("T")[0]}</p>
// {/* <Button variant="outline" className="rounded-full " size="icon"><Bookmark></Bookmark></Button> */}
//         </div>

// <div className='flex items-center gap-2 my-2'>
// <button className="bg-transparent">
//  <Avatar className="cursor-pointer">
//                 <AvatarImage src={job.company.imageUrl} />
//               </Avatar>
// </button>
// <div>
//     <h1 className='font-semibold'>
//         {job.company.name}
//     </h1>
//     <p className="text-gray-500">{job.location}</p>
// </div>
// </div>
// <div>
//     <h1 className='font-bold text-lg my-2'>{job.title} </h1>
//     <p className='text-sm text-gray-600'>{job.description}</p>
// </div>
//    <div className='flex items-center gap-2 mt-4 '>
//         <Badge className={'text-blue-700 font-bold hover:bg-blue-700 hover:text-white'} variant="ghost"> Positions:{job.positions} </Badge>
//          <Badge className={'text-black-700 font-bold hover:bg-black hover:text-white'} variant="ghost"> {job.jobtype} </Badge>
//           <Badge className={'text-[#6A38c2] font-bold hover:bg-[#6A38c2] hover:text-white'} variant="ghost"> {job.salary} LPA</Badge>
//     </div>
// <div className='flex items-center justify-end gap-4 mt-4'>
//     <Button variant="outline" className="bg-[#6A38c2] text-white" onClick={handleclick} >Details</Button>
//     {/* <Button className={'font-bold text-white hover:bg-[#3e3155] transition-colors delay-75'} >Save For later</Button> */}
// </div>

//     </div>
  )
}

export default AllJobs
