"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CompaniesTable from "./companiesTable";
import { useRouter } from "next/navigation";
import Getallcompanies from "@/app/hooks/Getallcompany";
import Usegetalladminjobs from "@/app/hooks/Usegetalladminjobs"
// import { useState } from 'react';
import AdminjobsTable from './AdminjobsTable'
import { useDispatch } from "react-redux";
import  {setsearchCompanyBytext}  from "@/redux/companySlice";
import {setseachJobBytext} from "@/redux/jobSlice"
const Adminjobs = () => {
  Usegetalladminjobs();
  const router = useRouter();
  const handleclick = () => {
    router.push("/postjobs");
  };
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setseachJobBytext(input));
  }, [input]);
  return (
    <div>
      <div className="max-w-6xl mx-auto my-10 ">
        <div className="flex items-center justify-between  my-5 ">
          <Input
            className="w-fit"
            placeholder="filter by name,role"
            onChange={handleChange}
          />

          <Button onClick={handleclick} className="bg-[#6A38c2] text-white">New Job</Button>
        </div>
        <AdminjobsTable />
      </div>
    </div>
  );
};

export default Adminjobs;
