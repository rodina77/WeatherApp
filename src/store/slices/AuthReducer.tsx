"use client";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
 isAuthenticated:boolean;
 user:null |{
    id:string;
    email:string;
    name:string
 };
 token:string | null

}

const initialState : AuthState ={
    isAuthenticated:false,
     user:null , 
     token:null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   loginSuccess(state, action:PayloadAction<{user:any, token:string}>){
    state.isAuthenticated=true;
    state.user=action.payload.user;
    state.token=action.payload.token
   },
   logout(state){
    state.isAuthenticated=false;
    state.user=null;
    state.token=null
   }
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
