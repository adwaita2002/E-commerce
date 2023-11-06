import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addOrder ,fetchAllOrder,updateOrder} from './OrderAPI';

const initialState = {
  orders:[],
  status: 'idle',
  currentOrder:null,
  totalItemOrders:0,
};


export const addOrderAsync = createAsyncThunk(
  'order/addOrder',
  async (order) => {
    const response = await addOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
); 
export const fetchAllOrderAsync = createAsyncThunk(
  'order/fetchAllOrder',
  async (pagination) => {
    const response = await fetchAllOrder(pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
); 
export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
); 

export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    deleteOrder: (state) => {
     
      state.currentOrder=null;
    },
    
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder=action.payload;
      })
      .addCase(fetchAllOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders=action.payload.order;
        state.totalItemOrders=action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index= state.orders.findIndex(order=>order.id===action.payload.id);
        state.orders[index]=action.payload;
      });
  },
});

export const { deleteOrder } = OrderSlice.actions;


export const currentOdereItem = (state) => state.order.currentOrder;
export const AllOrders = (state) => state.order.orders;
export const totalOrder = (state) => state.order.totalItemOrders;


export default OrderSlice.reducer;
