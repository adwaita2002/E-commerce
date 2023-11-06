import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserOrders,fetchUserInfo,addAdress} from './userAPI';

const initialState = {
  order:[],
  status: 'idle',
  userInfo:null,
};


export const UserOrdersAsync = createAsyncThunk(
  'user/UserOrder',
  async (userId) => {
    const response = await UserOrders(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
); 
export const fetchUserInfosAsync = createAsyncThunk(
  'user/fetchUserInfo',
  async (userId) => {
    const response = await fetchUserInfo(userId);
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

export const userSlice = createSlice({
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
      .addCase(UserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.order = action.payload;
      })
      .addCase(fetchUserInfosAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserInfosAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo= action.payload;
      })
      .addCase(addAdressAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addAdressAsync.fulfilled, (state, action) => {
        state.status = 'idle';
       
      });
  },
});

export const { increment } = userSlice.actions;


export const selectOrder = (state) => state.user.order;
export const  selectUserInfo= (state)=> state.user.userInfo;


export default userSlice.reducer;
