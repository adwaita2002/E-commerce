import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchUserData,fetchLoginData, SingOut } from './AuthAPI';
import { addAdress } from '../user/userAPI';

const initialState = {
  selectUser:null,
  status: 'idle',
  error:null,
};


export const fetchUserDataAsync = createAsyncThunk(
  'user/fetchUserData',
  async (userData) => {
    const response = await fetchUserData(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
); 
export const fetchLoginDataAsync = createAsyncThunk(
  'user/fetchLoginData',
  async (logInfo) => {
    const response = await fetchLoginData(logInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
); 
export const SingOutAsync = createAsyncThunk(
  'user/SingOut ',
  async (user) => {
   
    const response = await SingOut(user);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
); 
export const addAdressAsync = createAsyncThunk(
  'user/addAdress',
  async (user) => {
    const response = await addAdress(user);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
); 

export const AuthSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
     
      state.value += 1;
    },
    
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDataAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectUser = action.payload;
        
      })
      .addCase(fetchLoginDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoginDataAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectUser = action.payload;
      })
      .addCase(fetchLoginDataAsync.rejected, (state, action) => {
        state.status = 'idle';
         state.error = action.error;
      })
      .addCase(addAdressAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addAdressAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectUser = action.payload;
      })
      .addCase(SingOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(SingOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectUser = null;
      });
  },
});


export const { increment } = AuthSlice.actions;
export const selectUserId=(state)=>state.auth.selectUser;
export const selectError=(state)=>state.auth.error;
export default AuthSlice.reducer;
