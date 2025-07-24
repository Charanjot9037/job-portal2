"use client";
import React, { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import AllJobs from "./AllJobs";
import { useSelector } from "react-redux";
import { setsearchquery } from "@/redux/jobSlice";
import userGetAllJobs from '../hooks/userGetAllJobs';
import {setfilterquery} from "@/redux/jobSlice"
import{motion} from"framer-motion"
const JobArray = [1, 2, 3, 4, 5, 6, 7, 8];
import { useDispatch } from "react-redux";
const Jobs = () => {

   userGetAllJobs();
  const dispatch = useDispatch();
  const { allJobs, filterquery} = useSelector((store) => store.job);

  const [filterjob, setfilteredjob] = useState(allJobs);
  useEffect(() => {
    if (filterquery) {
      const filteredjob = allJobs.filter((job) => {
        return (
          job.title.includes(filterquery) ||
          job.description.includes(filterquery) ||
          job.location.includes(filterquery) ||
          job.salary.includes(filterquery)
        );
      });
      setfilteredjob(filteredjob);
    } else {
      setfilteredjob(allJobs);
    }
  }, [filterquery, allJobs]);
  useEffect(() => {
  return () => {
    dispatch(setfilterquery("")); // Cleanup only on unmount
  };
}, []); // ✅ Empty array = only runs on unmount

  return (
    <div className="mt-5">
      <div className="max-w-7xl mx-5 ">
        <div className="flex flex-col lg:flex-row gap-5 ">
          <div className=" sm:w-[40%] lg:w-[25%] xl:w-[20%] px-2">
  <FilterCard />
</div>

       

          {filterjob.length <= 0 ? (
            <span>JOB NOT FOUND</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5 px-2">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {filterjob.map((job) => (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.2 }}
        key={job._id}
      >
        <AllJobs job={job} />
      </motion.div>
    ))}
  </div>
</div>

            // <div className="flex-1 h-[88vh]  overflow-y-auto pb-5">
            //   <div className=" grid grid-cols-3 gap-4">
            //     {filterjob.map((job) => (
            //       <motion.div
            //       initial={{opacity:0,x:100}}
            //         animate={{opacity:1,x:0}}
            //         exit={{opacity:0,x:-100}}
            //        transition={{duration:0.2}}
            //       key={job._id}>
            //         <AllJobs job={job} />
            //       </motion.div>
            //     ))}
            //   </div>
            // </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
