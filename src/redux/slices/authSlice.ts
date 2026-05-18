import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import {type RootState } from "../store";


interface User {
  id?: number;
  email?: string;
  name?: string;
  role?: string;
  [key: string]: any;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      console.log('action payload ==>', action.payload);
      
      state.user = action.payload;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      
      //  localStorage mein save karo taki user logout na kare tab tak persistent rahe
      localStorage.setItem("auth", JSON.stringify({
        user: action.payload,
        token: action.payload.token,
        isAuthenticated: true,
      }));
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      
      //  localStorage se clear karo
      localStorage.removeItem("auth");
    },
    //  New action: initialize auth state from localStorage
    initializeAuth(state, action: PayloadAction<AuthState>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});


export const selectUser = (state: any) => state.auth.user;
export const selectUserToken = (state: any) => state.auth.token;
export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;

export const { login, logout, initializeAuth } = authSlice.actions;
export default authSlice;
