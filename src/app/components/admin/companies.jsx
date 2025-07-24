"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CompaniesTable from "./companiesTable";
import { useRouter } from "next/navigation";
import Getallcompanies from "@/app/hooks/Getallcompany";
// import { useState } from 'react';
import { useDispatch } from "react-redux";
import  {setsearchCompanyBytext}  from "@/redux/companySlice";
const Companies = () => {
  Getallcompanies();
  const router = useRouter();
  const handleclick = () => {
    router.push("/createcompany");
  };
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setsearchCompanyBytext(input));
  }, [input]);
  return (
    <div>
      <div className="max-w-6xl mx-auto my-10 ">
        <div className="flex items-center justify-between  my-5 ">
          <Input
            className="w-fit p-2"
            placeholder="filter By Name"
            onChange={handleChange}
          />

          <Button onClick={handleclick} className="bg-[#6A38c2] text-white">New Company</Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
