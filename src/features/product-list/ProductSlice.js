import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts,fetchAllProductsByFilters, fetchBrands,fetchCategories,fetchProductById,addProduct,updateProduct } from './ProductAPI';

const initialState = {
  products:[],
  brands:[],
  categories:[],
  selectedProduct:null,
  status: 'idle',
  totalItem: 0
};


export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchAllProductsByFiltersAsync = createAsyncThunk(
  'product/fetchAllProductsByFilters',
  async ({filter,sort,pagination}) => {
   
    const response = await fetchAllProductsByFilters({filter,sort,pagination});
    // The value we return becomes the `fulfilled` action payload 
    return response.data;
  }
);
export const addProductAsync = createAsyncThunk(
  'product/addProduct',
  async (product) => {
   
    const response = await addProduct(product);
    // The value we return becomes the `fulfilled` action payload 
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (update) => {
   
    const response = await updateProduct(update);
    // The value we return becomes the `fulfilled` action payload 
    return response.data;
  }
);

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
     clearProdut: (state) => {
     
      state.selectedProduct = null;
    },
    
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchAllProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItem=action.payload.totalItems;
      }).addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct= action.payload;
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index= state.products.findIndex((product)=>product.id===action.payload.id);
        state.products[index]=action.payload; 
      });
  },
});

export const { clearProdut } = ProductSlice.actions;


export const selectAllProducts = (state) => state.product.products;
export const selecttotalItem = (state) => state.product.totalItem;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProduct = (state) => state.product.selectedProduct;
export const selectProductstatus = (state) => state.product.status;


export default ProductSlice.reducer;
