import {createSlice} from "@reduxjs/toolkit"
const userSlice=createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        isLoggedIn:false,
        error:false
        },
        reducers:{
            loginStart:(state)=>{
                state.isLoggedIn=true
            },
            loginSuccess:(state,action)=>{
                state.isLoggedIn=false
                state.currentUser=action.payload
            },
            loginFailure:(state)=>{
                state.error = true;
                state.isLoggedIn=false
            },
        }
})
export const {loginStart,loginFailure,loginSuccess}=userSlice.actions;
export default userSlice.reducer;