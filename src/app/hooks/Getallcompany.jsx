"use client";
import {setSingleCompany} from "@/redux/companySlice"
import { setAllJobs } from "@/redux/jobSlice"; 
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setcompanies } from "@/redux/companySlice";

const Getallcompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const  Fetchcompanies = async () => {
      try {
        const res = await fetch(`/api/auth/getcompany`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data) {
          console.log(data.companies);
          dispatch(setcompanies(data.companies));
        } else {
          toast.error(data.error || " Invalid credentials");
        }
      } catch (error) {
        console.log(error);
      }
    };
    Fetchcompanies();
  }, []);
};

export default Getallcompanies;
