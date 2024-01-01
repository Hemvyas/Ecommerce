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
                state.isLoggedIn=true
                state.currentUser=action.payload
            },
            loginFailure:(state)=>{
                state.error = true;
                state.isLoggedIn=false
            },
            logout: (state) => {
                state.currentUser = null;
                state.isLoggedIn = false;
              },
        }
})
export const {loginStart,loginFailure,loginSuccess,logout}=userSlice.actions;
export default userSlice.reducer;