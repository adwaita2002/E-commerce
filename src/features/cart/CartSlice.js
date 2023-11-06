import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './CartAPI';
import { addToCart ,fetchItemById,updateCart,deleteCart,deleteItemById} from './CartAPI';

const initialState = {
  value: 0,
  status: 'idle',
  items:[],
};


export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
); 
export const fetchItemByIdAsync = createAsyncThunk(
  'cart/fetchItemById',
  async (userId) => {
    const response = await fetchItemById(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
); 
export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
); 
export const deleteCartAsync = createAsyncThunk(
  'cart/deleteCart',
  async (itemId) => {
    const response = await deleteCart(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
); 
export const deleteItemByIdAsync = createAsyncThunk(
  'cart/deleteItemById',
  async (userId) => {
    const response = await deleteItemById(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
); 

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
     
      state.value += 1;
    },
    
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=action.payload;
      })
      .addCase(deleteItemByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=[];
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index= state.items.findIndex(item=>item.id===action.payload.id);
        state.items[index]=action.payload;
      })
      .addCase(deleteCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index= state.items.findIndex(item=>item.id===action.payload.id);
        state.items.splice(index,1);
      });
  },
});

export const { increment } = CartSlice.actions;


export const selectItems = (state) => state.cart.items;


export default CartSlice.reducer;
