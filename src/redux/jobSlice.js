import AllJobs from "@/app/components/AllJobs";
import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        singleJob:null,
        allAdminJobs:[],
        seachJobNytext:null,
        allappliedjob:[],
        searchquery:"",
        filterquery:""
    },
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs=action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob= action.payload;
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs=action.payload;
        },
        setseachJobBytext:(state,action)=>{
            state.seachJobNytext=action.payload;
        },
        setallappliedjobs:(state,action)=>{
            state.allappliedjob=action.payload;
        },
        setsearchquery:(state,action)=>{
            state.searchquery=action.payload;
        },
        setfilterquery:(state,action)=>{
            state.filterquery=action.payload;
        }
    }
});
export const {setAllJobs ,setSingleJob,setAllAdminJobs,setseachJobBytext,setallappliedjobs,setsearchquery, setfilterquery}=jobSlice.actions;
export default jobSlice.reducer;