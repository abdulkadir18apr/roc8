import  {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./reducers/authSlice";
import {dataSlice} from "./reducers/dataSlice";

export default configureStore({
    reducer:{
        auth:authSlice.reducer,
        data:dataSlice.reducer
    }
})