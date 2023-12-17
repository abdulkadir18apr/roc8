import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url="https://data-vizz.abdulkadir19.repl.co/"

const initialState={
    isLogin:localStorage.getItem("token")===null?false:true,
    status:"",
    error:null,
    user:localStorage.getItem("user")!==null?JSON.parse(localStorage.getItem("user")):{}
}



export const loginUser=createAsyncThunk("login.user",async({email,password})=>{
    const res=await axios.post(`${url}api/auth/login`,{email,password});
    if(res.data.success){
        console.log("setting")
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("user",JSON.stringify(res.data.user))
    }
    console.log(res)
    return res.data
})
export const signupUser=createAsyncThunk("signup/user",async({firstName,lastName,email,password})=>{
    const res=await axios.post(`${url}api/auth/signup`,{firstName,lastName,email,password});
    if(res.data.succcess){
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("user",JSON.stringify(res.data.user))
    }
    return res.data
})

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:{
        [loginUser.pending]:(state)=>{
            state.status="loading"
        },
        [loginUser.fulfilled]:(state,action)=>{
            state.status="success";
            state.isLogin=true;
            state.user=action.payload.user
        },
        [loginUser.rejected]:(state,action)=>{
            state.status="error";
            state.isLogin=false
            state.error=action.error.message
        },
        [signupUser.pending]:(state)=>{
            state.status="loading"
        },
        [signupUser.fulfilled]:(state,action)=>{
            state.status="success";
            state.isLogin=true;
            state.user=action.payload.user;
        },
        [signupUser.rejected]:(state,action)=>{
            state.status="error";
            state.error=action.error.message
        }

    }
})
export default authSlice.reducer