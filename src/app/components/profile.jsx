'use client';
import React from 'react'
import { Avatar , AvatarImage} from '../components/ui/avatar'
import {Button} from '@/components/ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import {Badge} from "../components/ui/badge"
import {Label} from "../components/ui/label"
import AppliedJobTables from './AppliedJobTables'
import { useState } from 'react';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useDispatch, useSelector } from "react-redux";
import useGetAppliedjob from "@/app/hooks/useGetAppliedjob"
// const {User}=useSelector(store=>store.auth)
const Skills=["html","css","js"]
const resume=true;
const Profile = () => {
  useGetAppliedjob();
  const { User } = useSelector(store => store.auth);
  const [open,setOpen]=useState(false);
  return (
    <div>
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-xl'>
        <div className='flex justify-between '>
      <div className='flex items-center gap-4'>
 <Avatar
  className="cursor-pointer h-20 w-20 border-2 border-[#] rounded-full">
                <AvatarImage className="rounded-full"  src={User?.profile?.profilephoto} />
              </Avatar>
              <div>
  <h1 className='font-medium text-xl '>{User?.fullname}</h1>
              <p>{User?.profile?.bio}</p>
              </div>
             
        </div>
 <Button onClick={()=>setOpen(true)} className="text-right" variant="outline"><Pen/></Button>
        </div>
  <div>
    <div className='flex gap-2 items-center my-2'>
<Mail/><span>{User?.fullname}</span>
    </div>
<div className='flex gap-2 items-center my-2'>
<Contact/><span>{User?.phonenumber}</span>
</div>


  </div>

  <div className='my-4'>
    <h1>Skills</h1>
    <div className=' flex items-center gap-2'>
    {
      
     User?.profile?.skills?.length != 0?  User?.profile?.skills.map((item,index)=> <Badge  key={index}>{item}</Badge>) : <span className='font-bold'>Na</span>
    }
    </div>

  </div>
            <div className=' grid w-full max-w-sm items-center gap-1.5'>
              <Label className="text-md font-bold ">Resume</Label>
              {
                resume?<a target="_self" href={User?.profile?.resume} className='text-blue-500 cursor-pointer hover:underline'>Resume.img</a>:<span>NA</span>
              }
            </div>
          
      </div>
        <div className='max-w-4xl mx-auto bg-white rounded-e-2xl'>
              <h1 className='font-bold text-lg my-5 mx-2' >Applied Jobs</h1>
<AppliedJobTables/>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile
