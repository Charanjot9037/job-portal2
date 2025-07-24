import React from 'react'
import {Badge} from "../ui/badge.jsx"
import { useSelector } from "react-redux";
import Jobs from '../jobs.jsx';
import { motion } from 'framer-motion';
import { Avatar ,AvatarImage} from './avatar.jsx'
import { useRouter } from 'next/navigation';
const LatestJobCards = ({job}) => {
  const Router=useRouter();

    function handleclick(){
        Router.push(`/jobdescription/${job._id}`)

    }
  return (
    <motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  onClick={handleclick}
  className="p-4 sm:p-5 w-full max-w-xl mx-auto rounded-xl shadow-2xl bg-white border border-purple-200 cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
>
  {/* Company Info */}
  <div className="flex items-center gap-3 mb-3">
    <Avatar className="h-10 w-10">
      <AvatarImage src={job?.company.imageUrl} />
    </Avatar>
    <h1 className="text-base sm:text-lg font-semibold">{job?.company.name}</h1>
  </div>

  {/* Location */}
  <p className="text-sm sm:text-base text-gray-600 mb-2">
    <span className="font-medium text-black">Location:</span> {job?.location}
  </p>

  {/* Title & Description */}
  <div className="mb-3">
    <h1 className="font-semibold text-base sm:text-lg text-black mb-1">{job?.title}</h1>
    <p className="text-sm sm:text-[15px] text-gray-700 line-clamp-3">{job?.description}</p>
  </div>

  {/* Tags/Badges */}
  <div className="flex flex-wrap gap-2 mt-4">
    <Badge className="text-blue-700 font-bold hover:bg-blue-700 hover:text-white" variant="ghost">
      Positions: {job?.positions}
    </Badge>
    <Badge className="text-black font-bold hover:bg-black hover:text-white" variant="ghost">
      {job?.jobtype}
    </Badge>
    <Badge className="text-[#6A38c2] font-bold hover:bg-[#6A38c2] hover:text-white" variant="ghost">
      {job?.salary} LPA
    </Badge>
  </div>
</motion.div>

  //   <motion.div
          
  //           initial={{ opacity: 0, y: 50 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.5 }}
  //           className="p-5 rounded-md shadow-2xl bg-white border-purple-400 cursor-pointer " onClick={handleclick}>
    
  //       <div className='flex gap-2 my-2'>
  //            <Avatar className="cursor-pointer">
  //               <AvatarImage src={job?.company.imageUrl} />
  //             </Avatar>
  // <h1 className=' text-lg font-[600]'>{job?.company.name}</h1>
   

  //       </div>
  //       <div>
  //            <p className='text-sm text-gray-600'>Location-{job?.location}</p>
  //       </div>
  //       <div>
  //           <h1 className='font-[500] text-lg my-2'>{job?.title}</h1>
  //           <p className='text-sm text-gray-600'>{job?.description}</p>
  //       </div>
  //   <div className='flex items-center gap-2 mt-4 '>
  //       <Badge className={'text-blue-700 font-bold hover:bg-blue-700 hover:text-white'} variant="ghost">Positions:{job?.positions} </Badge>
  //        <Badge className={'text-black-700 font-bold hover:bg-black hover:text-white'} variant="ghost">{job?.jobtype}</Badge>
  //         <Badge className={'text-[#6A38c2] font-bold hover:bg-[#6A38c2] hover:text-white'} variant="ghost"> {job?.salary} LPA </Badge>
  //   </div>
  //   </motion.div>
  )
}

export default LatestJobCards
