// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@radix-ui/react-popover";
// import { Edit2, MoreHorizontal ,Eye} from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux";
// import Adminjobs from "./Adminjobs";

// const AdminjobsTable = () => {
//   const router = useRouter();
//   const random=[1,2,3,4];
//   const { companies, searchCompanyBytext } = useSelector((store) => store.company);
    
//    const { allAdminJobs,seachJobNytext } = useSelector((store) => store.job);
    
//   // console.log(allAdminJobs);

//   const [filterJobs, setFilterJobs] = useState(allAdminJobs );

//       const {"":value}=seachJobNytext;
// console.log(value);
//   useEffect(() => {

//     const filteredCompany = allAdminJobs.length >= 0 && allAdminJobs.filter((job)=>{
//      if(!value){
//       return true;
//      }
// return job?.title?.toLowerCase().includes(value.toLowerCase()) || job?.company.name.toLowerCase().includes(value.toLowerCase());
   

// })

//     setFilterJobs(filteredCompany);
//     console.log("filtered Job",{filteredCompany});
//   }, [allAdminJobs,value]);

//   return (
//     <div>
//       <Table>
//         <TableCaption>AList of recent Posted Jobs</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Company Name</TableHead>
//             <TableHead>Role</TableHead>
//             <TableHead>Date</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {
//           filterJobs?.map((job) => (
//             <TableRow>
       
//               <TableCell>{job.company.name}</TableCell>
//               <TableCell>{job.title}</TableCell>
//               <TableCell>{job.createdAt.split("T")[0]}</TableCell>
//               <TableCell className="text-right cursor-pointer">
//                 <Popover>
//                   <PopoverTrigger>
//                     <MoreHorizontal />
//                   </PopoverTrigger>
//                   <PopoverContent className="w-32 shadow-2xl border-black bg-white px-2">
//                     {/* <div onClick={()=>router.push(`/companies/${job._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
//                       <Edit2 className="w-4" />
//                       <span>Edit</span>
                   
//                     </div> */}
//                     <div onClick={()=>router.push(`/applicants/${job._id}`)}  className="flex items-center  w-fit gap-2 cursor-pointer mt-2 ">
//                       <Eye className="w-4"/>
//                       <span>Applicants</span>
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//               </TableCell>
//             </TableRow>
//           ))}


//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default AdminjobsTable;
"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { MoreHorizontal, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const AdminJobsTable = () => {
  const router = useRouter();

  const { allAdminJobs, seachJobNytext } = useSelector((store) => store.job);
  const { "": value } = seachJobNytext||" " ;

  const [filteredJobs, setFilteredJobs] = useState(allAdminJobs || []);

  useEffect(() => {
    const filtered = allAdminJobs?.filter((job) => {
      if (!value) return true;
      const titleMatch = job?.title?.toLowerCase().includes(value.toLowerCase());
      const companyMatch = job?.company?.name?.toLowerCase().includes(value.toLowerCase());
      return titleMatch || companyMatch;
    }) || [];

    setFilteredJobs(filtered);
  }, [allAdminJobs, value]);

  return (
    <div className="overflow-x-auto w-full p-4 bg-white rounded-xl shadow-md">
      <Table>
        <TableCaption className="mb-4 text-sm text-gray-500">
          List of recently posted jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-700 font-semibold">Company</TableHead>
            <TableHead className="text-gray-700 font-semibold">Role</TableHead>
            <TableHead className="text-gray-700 font-semibold">Date</TableHead>
            <TableHead className="text-right text-gray-700 font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredJobs?.length > 0 ? (
            filteredJobs.map((job) => (
              <TableRow key={job._id} className="hover:bg-gray-50 transition">
                <TableCell>{job.company.name}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 hover:bg-gray-100 rounded-md transition">
                        <MoreHorizontal />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36 shadow-xl bg-white border p-2 rounded-md">
                      <div
                        onClick={() => router.push(`/applicants/${job._id}`)}
                        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer transition"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                No jobs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
