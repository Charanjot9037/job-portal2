"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const AppliedJobTables = () => {
  const { allappliedjob } = useSelector((store) => store.job);

  return (
    <motion.div
      className="w-full overflow-x-auto px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Table className="min-w-[600px] bg-white shadow-lg rounded-xl border border-gray-200">
        <TableCaption className="text-lg font-semibold text-gray-700 my-4">
          List of Applied Jobs
        </TableCaption>
        <TableHeader className="bg-gray-100 rounded-t-xl">
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allappliedjob?.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                You have not applied to any job yet.
              </TableCell>
            </TableRow>
          ) : (
            allappliedjob.map((appliedjob, index) => (
              <motion.tr
                key={appliedjob?._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="hover:bg-gray-50 transition-all"
              >
                <TableCell>
                  {appliedjob?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="font-medium text-gray-800">
                  {appliedjob?.job?.title}
                </TableCell>
                <TableCell>{appliedjob?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`px-3 py-1 rounded-full text-white transition-all duration-300 ${
                      appliedjob?.status === "rejected"
                        ? "bg-red-500"
                        : appliedjob?.status === "pending"
                        ? "bg-black"
                        : "bg-green-600"
                    }`}
                  >
                    {appliedjob?.status}
                  </Badge>
                </TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default AppliedJobTables;

// import React from 'react'
// import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from './ui/table'
// import {Badge} from './ui/badge'
// import { useSelector } from 'react-redux'
//  const AppliedJobTables = () => {
// const {allappliedjob}=useSelector(store=>store.job)
// console.log(allappliedjob);
//   return (
//     <div>
//     <Table>
//         <TableCaption>
//             List of Applied Jobs
//         </TableCaption>
//         <TableHeader>
//             <TableRow>
//                 <TableHead>Date</TableHead>
//                  <TableHead>Job Role</TableHead>
//                   <TableHead>Company</TableHead>
//                    <TableHead className="text-right">Status</TableHead>
//             </TableRow>
//         </TableHeader>
//         <TableBody>
//             {
//     allappliedjob?.length <= 0 ?<span>You Have not Applied in any job</span> :allappliedjob?.map((appliedjob)=>(
//         <TableRow key={appliedjob?._id}>
//             <TableCell>{appliedjob?.createdAt.split("T")[0]}</TableCell>
//                <TableCell>{appliedjob?.job.title}</TableCell>
//                   <TableCell>{appliedjob?.job.company.name}</TableCell>
//                      <TableCell className="text-right py-2 px-2"><Badge className={`${appliedjob?.status=="rejected"? 'bg-red-500':appliedjob?.status=="pending"?'bg-black':'bg-green-800' }`}>{appliedjob?.status}</Badge></TableCell>

//         </TableRow>
//     ))
//             }
        
//         </TableBody>
//     </Table>



//     </div>
//   )
// }

// export default AppliedJobTables
