// hooks/useCompanyById.js
"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import toast from "react-hot-toast";

const useCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!companyId) return;

    const fetchSingleCompany = async () => {
      try {
        const res = await fetch(`/api/auth/getcompanyid/${companyId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (data?.company) {
          dispatch(setSingleCompany(data.company));
        } else {
          toast.error(data.error || "Company not found");
        }
      } catch (error) {
        console.error("Fetch company failed:", error);
        toast.error("Failed to fetch company");
      }
    };

    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useCompanyById;


// "use client";
// import { setSingleCompany } from "@/redux/companySlice";
// import { setAllJobs } from "@/redux/jobSlice";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";


// const Companybyid = (companyId) => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     console.log("from hook",companyId);

//     const fetchsinglecompany = async () => {
//       try {
//         const res = await fetch(`/api/auth/getcompanyid/${companyId}`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//         });
//         const data = await res.json();
//         if (data) {
//           console.log(data.company);
    
//               dispatch(setSingleCompany(data.company))
           
//         } else {
//           toast.error(data.error || " Invalid credentials");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchsinglecompany();
//   }, []);
// };

// export default Companybyid;
