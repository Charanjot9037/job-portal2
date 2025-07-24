// import React from 'react'
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import toast,{Toaster} from 'react-hot-toast';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@radix-ui/react-popover";
// import { MoreHorizontal } from 'lucide-react';
// import { useSelector } from 'react-redux';
// const ApplicantsTable = () => {
//   const sortlist=["Accepted","Rejected"]

// const {applicants}=useSelector(store=>store.Application);


// const statushandler=async(status,id)=>{

// try{
//     const res = await fetch(`/api/auth/updatestatus/${id}`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ status }),
//         });
  
//         const data = await res.json();
//           console.log(data);
//         if (data.succes) {
//         toast.success("Status updated");
      
//         } else {
//           toast.error(data.error || ' Invalid credentials');
//         }

// }
// catch(error){

// }


// }




//     return (
//     <div>
//       <Toaster/>
//     <Table>
//         <TableCaption>A list of recent applied user</TableCaption>
//         <TableHeader>
//             <TableRow>
//                 <TableHead>Full name</TableHead>
//                  <TableHead>Email</TableHead>
//                   <TableHead>Contact</TableHead>
//                    <TableHead>Resume</TableHead>
//                     <TableHead>Date</TableHead>
//                      <TableHead className="text-right">Action</TableHead>
//             </TableRow>
//         </TableHeader>
//         <TableBody>
//           {
//             applicants && applicants.application.map((item)=>(
// <TableRow key={item._id}>
//   {console.log("iertms",item)}
//                 <TableCell>{item.applicant.fullname}</TableCell>
//                 <TableCell>{item.applicant.email}</TableCell>
//                 <TableCell>{item.applicant.phonenumber}</TableCell>
//                 <TableCell className=" cursor-pointer">
                  
//                   {
//                     item.applicant.profile.resume?    <a className='text-blue-600' href={item.applicant.profile.resume}>Resume</a>:<span>N/A</span>
//                   }
//                   {/* <a href={item.applicant.profile.resume}>Resume</a> */}
//                   </TableCell>
                
                
//                 <TableCell>{item.createdAt.split("T")[0]}</TableCell>
//                 <TableCell className="float-right cursor-pointer">
//                   <Popover>
//                     <PopoverTrigger>
//                       <MoreHorizontal></MoreHorizontal>
//                     </PopoverTrigger>
//                     <PopoverContent className='shadow-2xl py-2  px-5 border-neutral-900' >
//        {
//                          sortlist.map((status,index)=>{
//                           return(
//                             <div onClick={()=>statushandler(status.toLowerCase(),item._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
//                               <span>{status}</span>
//                             </div>
//                           )
//                          })
//                     }
//                     </PopoverContent>
//                   </Popover>
             
//                 </TableCell>
            
//             </TableRow>
//             ))
//           }

//         </TableBody>
//     </Table>
      
//     </div>
//   )
// }

// export default ApplicantsTable
'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import toast, { Toaster } from 'react-hot-toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const ApplicantsTable = () => {
  const sortlist = ["Accepted", "Rejected"];
  const { applicants } = useSelector(store => store.Application);

  const statushandler = async (status, id) => {
    try {
      const res = await fetch(`/api/auth/updatestatus/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (data.succes) {
        toast.success("Status updated");
      } else {
        toast.error(data.error || 'Invalid credentials');
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full overflow-x-auto px-4 sm:px-6 lg:px-10 py-6">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-xl overflow-hidden"
      >
        <Table>
          <TableCaption className="text-base font-semibold text-gray-600">A list of recently applied users</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Full name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              applicants?.application.map((item) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50 transition-all"
                >
                  <TableCell>{item.applicant.fullname}</TableCell>
                  <TableCell>{item.applicant.email}</TableCell>
                  <TableCell>{item.applicant.phonenumber}</TableCell>
                  <TableCell>
                    {item.applicant.profile.resume ? (
                      <a
                        className="text-indigo-600 hover:underline"
                        target="_self"
                        href={item.applicant.profile.resume}
                        
                        rel="noopener noreferrer"
                      >
                        Resume
                      </a>
                    ) : (
                      <span className="text-gray-500 italic">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>{item.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="cursor-pointer hover:text-indigo-600 transition-all" />
                      </PopoverTrigger>
                      <PopoverContent className="w-32 shadow-2xl border border-gray-300 rounded-md bg-white p-2">
                        {
                          sortlist.map((status, index) => (
                            <div
                              key={index}
                              onClick={() => statushandler(status.toLowerCase(), item._id)}
                              className="py-1 px-2  text-center hover:bg-indigo-50 rounded-md cursor-pointer text-sm"
                            >
                              {status}
                            </div>
                          ))
                        }
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </motion.tr>
              ))
            }
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
};

export default ApplicantsTable;
