import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        companies:[],
        searchCompanyBytext:null,
    },
    reducers:{
        setSingleCompany:(state,action)=>{
            state.singleCompany=action.payload;
        },
        setcompanies:(state,action)=>{
            state.companies=action.payload;
        },
        setsearchCompanyBytext:(state,action)=>{
            state.searchCompanyBytext=action.payload;
        }
    }
});
export const {setSingleCompany,setcompanies, setsearchCompanyBytext}=companySlice.actions;
export default companySlice.reducer;