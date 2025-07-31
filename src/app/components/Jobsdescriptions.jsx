"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "../components/ui/badge";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Avatar } from "@/app/components/ui/avatar"; // use shadcn avatar instead
import { AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
const Jobsdescriptions = ({ id }) => {
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { User } = useSelector((store) => store.auth);
  const [isApplied, setisApplied] = useState(false);
const router=useRouter();


  // Apply Handler
  const applyjobhandler = async () => {
    try {
      const res = await fetch(`/api/auth/applyjob/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.message === "already registered") {
        toast.error("You have already applied to this job.");
        return;
      }

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setisApplied(true);

      const updateSingleJob = {
        ...singleJob,
        application: [...singleJob.application, { applicant: User?._id }],
      };

      dispatch(setSingleJob(updateSingleJob));
      toast.success(data.message || "Job applied successfully!");
    } catch (error) {
      console.error("Apply job error:", error);
      toast.error(error.message || "Failed to apply for the job");
    }
  };

  // Fetch Job
  useEffect(() => {
    if (!id) return;

    const fetchSingleJob = async () => {
      try {
        const res = await fetch(`/api/auth/getjobbyid/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (data?.job) {
          const applied = data.job.application.some(
            (application) => application?.applicant === User?._id
          );
          setisApplied(applied);
          dispatch(setSingleJob(data.job));
        } else {
          console.error("Invalid job data");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchSingleJob();
  }, [id, dispatch]);

  if (!singleJob) {
    return (
      <div className="text-center my-10 text-gray-500">
        Loading job details...
      </div>
    );
  }

  return (
    
    <motion.div
      className="max-w-7xl mx-auto px-4 my-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Toaster />

      {/* Header and Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
   

        <div>
               <div className="flex  items-center gap-2 mb-2">
              <Avatar className="w-10 h-10">
                              {singleJob?.company.imageUrl ? (
                                <AvatarImage src={singleJob?.company.imageUrl} alt={singleJob?.company.name } />
                              ) : (
                                <AvatarFallback className="bg-gray-200 text-sm p-2">
                                  {singleJob?.company.name.slice(0, 3).toUpperCase()}
                                </AvatarFallback>
                              )}
                            </Avatar>
                             <h1 className="font-bold text-2xl text-gray-900">
            Company: {singleJob?.company.name}
          </h1>
        </div>
          <h1 className="font-bold text-2xl text-gray-600">
            Job Title: {singleJob?.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Badge className="text-blue-700 font-bold hover:bg-blue-700 hover:text-white" variant="ghost">
              Positions: {singleJob?.positions}
            </Badge>
            <Badge className="text-black font-bold hover:bg-black hover:text-white" variant="ghost">
              {singleJob?.jobtype}
            </Badge>
            <Badge className="text-[#6A38c2] font-bold hover:bg-[#6A38c2] hover:text-white" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <motion.button
          onClick={applyjobhandler}
          disabled={isApplied}
          whileTap={{ scale: 0.96 }}
          className={`w-full md:w-auto px-6 py-2 rounded-2xl text-white font-semibold transition-all duration-300 ${
            isApplied
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[#6A38c2] hover:bg-[#8158aa]"
          }`}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </motion.button>
      </div>

      {/* Divider */}
      <motion.h2
        className="font-bold text-lg border-b-2 border-gray-300 mb-6"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.5 }}
      >
        Description
      </motion.h2>

      {/* Job Detail Info */}
      <div className="space-y-4 text-sm sm:text-base">
        {[
            { label: "Company- ", value: singleJob?.company.name || "N/A" },
          { label: "Location", value: singleJob?.location || "N/A" },
          { label: "Description", value: singleJob?.description || "No description provided." },
          { label: "Experience", value: singleJob?.experience || "N/A" },
          { label: "Salary", value: `${singleJob?.salary} LPA` },
          { label: "Applications", value: singleJob?.application?.length || 0 },
          {
            label: "Posted Date",
            value: singleJob?.createdAt?.split("T")[0] || "N/A",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <span className="font-semibold w-32">{item.label}:</span>
            <span className="pl-2 text-gray-800">{item.value}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Jobsdescriptions;

// "use client";
// import React, { useEffect, useState } from "react";
// import { Badge } from "../components/ui/badge";
// import { setSingleJob } from "@/redux/jobSlice";
// import { useDispatch, useSelector } from "react-redux";
// import toast, { Toaster } from "react-hot-toast";
// // import { application } from 'express';

// const Jobsdescriptions = ({ id }) => {
//   const dispatch = useDispatch();
//   const { singleJob } = useSelector((store) => store.job);
//   const { User } = useSelector((store) => store.auth);
//   const isInitialApplied =
//     singleJob?.application?.some(
//       (application) => application.applicant == User?._id
//     ) || false;
//   const [isApplied, setisApplied] = useState(isInitialApplied);

//   const applyjobhandler = async () => {
//     try {
//       const res = await fetch(`/api/auth/applyjob/${id}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });

//       const data = await res.json();

//       // ✅ Check if already applied and stop further execution
//       if (data.message === "already registered") {
//         toast.error("You have already applied to this job.");

//         return; // ❗ Prevents continuing to the next block
//       }

//       // ❗ Handle unsuccessful response
//       if (!res.ok) {
//         throw new Error(data.message || "Something went wrong");
//       }

//       // ✅ Success case
//       setisApplied(true); //update state

//       const updateSingleJob = {
//         ...singleJob,
//         application: [...singleJob.application, { applicantion: User?._id }],
//       };
//       dispatch(setSingleJob(updateSingleJob));
//       toast.success(data.message || "Job applied successfully!");
//     } catch (error) {
//       console.error("Apply job error:", error);
//       toast.error(error.message || "Failed to apply for the job");
//     }
//   };

//   useEffect(() => {
//     if (!id) return;

//     const fetchSingleJob = async () => {
//       try {
//         const res = await fetch(`/api/auth/getjobbyid/${id}`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//         });

//         const data = await res.json();

//         if (data) {
//           setisApplied(
//             data.job.application.some((application) => application == User._id)
//           );
//           console.log(
//             data.job.application.some(
//               (application) => application.applicant == User._id
//             )
//           );
//           // )
//           console.log("Current user ID:", User._id);
//           dispatch(setSingleJob(data.job));
//         } else {
//           console.error(data.error || "Invalid job data");
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };

//     fetchSingleJob();
//   }, [id, dispatch]);

//   if (!singleJob) {
//     return (
//       <div className="text-center my-10 text-gray-500">
//         Loading job details...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto my-10">
//       <Toaster />
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="font-bold text-xl">Job Title: {singleJob?.title}</h1>
//           <div className="flex items-center gap-2 mt-4">
//             <Badge
//               className="text-blue-700 font-bold hover:bg-blue-700 hover:text-white"
//               variant="ghost"
//             >
//               Positions: {singleJob?.positions}
//             </Badge>
//             <Badge
//               className="text-black-700 font-bold hover:bg-black hover:text-white"
//               variant="ghost"
//             >
//               {singleJob?.jobtype}
//             </Badge>
//             <Badge
//               className="text-[#6A38c2] font-bold hover:bg-[#6A38c2] hover:text-white"
//               variant="ghost"
//             >
//               {singleJob?.salary} LPA
//             </Badge>
//           </div>
//         </div>

//         <button
//           onClick={applyjobhandler}
//           disabled={isApplied}
//           className={`p-2 text-white rounded-2xl ${
//             isApplied
//               ? "bg-gray-500 cursor-not-allowed"
//               : "bg-[#6A38c2] hover:bg-[#8158aa]"
//           }`}
//         >
//           {isApplied ? "Applied" : "Apply Now"}
//         </button>
//       </div>

//       <h1 className="font-bold border-b-2 border-gray-300 my-5">Description</h1>

//       <div className="my-2 space-y-2">
 
//         <div>
//           <span className="font-bold">Location:</span>
//           <span className="pl-4 font-normal text-gray-800">
//             {singleJob?.location || "N/A"}
//           </span>
//         </div>
//         <div>
//           <span className="font-bold">Description:</span>
//           <span className="pl-4 font-normal text-gray-800">
//             {singleJob?.description || "No description provided."}
//           </span>
//         </div>
//         <div>
//           <span className="font-bold">Experience:</span>
//           <span className="pl-4 font-normal text-gray-800">
//             {singleJob?.experience || "N/A"}
//           </span>
//         </div>
//         <div>
//           <span className="font-bold">Salary:</span>
//           <span className="pl-4 font-normal text-gray-800">
//             {singleJob?.salary} LPA
//           </span>
//         </div>
//         <div>
//           <span className="font-bold">Applications:</span>
//           <span className="pl-4 font-normal text-gray-800">
//             {singleJob?.application.length}{" "}
//           </span>
//         </div>
//         <div>
//           <span className="font-bold">Posted Date:</span>
//           <span className="pl-4 font-normal text-gray-800">
//             {singleJob?.createdAt.split("T")[0] || "N/A"}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Jobsdescriptions;
