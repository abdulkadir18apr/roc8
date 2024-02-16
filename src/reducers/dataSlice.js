import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
    getUserPreferencesFromCookies,
    clearUserPreferencesCookies,
    setUserPreferenceInCookies,
  } from '../cookies/cookieManager';

const url="https://838c06f6-ff2e-434a-953a-e5aa8f782a3e-00-2p5qshp60xa8t.spock.replit.dev/";
const headers = {
    'Content-Type': 'application/json',
    'authorization': localStorage.getItem('token')
  };
  
export const fetchData=createAsyncThunk("fetch/Data",async()=>{
    console.log("headers",headers)
    const res=await axios.get(`${url}api/data/fetchData`,{headers:{...headers}});
    return res.data.data;
})
const initialState={
    data:[],
    status:"",
    error:null,
    filters:{
        category:'A',
        startDate:"",
        endDate:"",
        gender:"",
        age:""
    },
    
}
export const dataSlice=createSlice({
    name:"data",
    initialState,
    reducers:{
        setDateFilters:(state,action)=>{
            state.filters.startDate=action.payload.startDate;
            state.filters.endDate=action.payload.endDate
        },
        setLineChartCategory:(state,action)=>{
            state.filters.category=action.payload
        },
        setAgeFilter:(state,action)=>{
            console.log(action.payload)
            state.filters.age=action.payload
        },
        setGenderFilter:(state,action)=>{
            state.filters.gender=action.payload
        },
        initializeFilters:(state,action)=>{
            console.log("initializing Filters")
            state.filters.startDate=action.payload.startDate
            state.filters.endDate=action.payload.endDate
            state.filters.age=action.payload.age
            state.filters.gender=action.payload.gender
        }
        
    },
    extraReducers:{
        [fetchData.pending]:(state)=>{
            state.status="loading"
            
        },
        [fetchData.fulfilled]:(state,action)=>{
            state.status="success";
            state.data=action.payload
        },
        [fetchData.rejected]:(state,action)=>{
            state.status="error";
            console.log(action.error)
            state.error=action.error.message
        },
       
    }
})
export const {setDateFilters,setLineChartCategory,setAgeFilter,setGenderFilter,initializeFilters} =dataSlice.actions;


export const initializeUserPreferences = () => (dispatch) => {
    const { filters, dates } = getUserPreferencesFromCookies();
    const startDate=dates?.startDate?dates.startDate:""
    const endDate=dates?.endDate?dates.endDate:""
    const age=filters?.age?filters.age:""
    const gender=filters?.gender?filters.gender:""
    dispatch(initializeFilters({startDate,endDate,age,gender}))

  };
  
export const saveUserPreferences = (filters, dates) => (dispatch) => {
    console.log(filters,dates)
    const {startDate,endDate}=dates
    dispatch(setDateFilters({startDate,endDate}));
    dispatch(setAgeFilter(filters?.age?filters.age:""))
    dispatch(setGenderFilter(filters?.gender?filters.gender:""))
    console.log("I am here")
    setUserPreferenceInCookies(filters, dates);
  };
  
  export const clearUserPreferences = () => (dispatch) => {
    dispatch(setDateFilters({startDate:"",endDate:""}))
    dispatch(setAgeFilter(""))
    dispatch(setGenderFilter(""))
    clearUserPreferencesCookies();
  };


export default dataSlice.reducer
