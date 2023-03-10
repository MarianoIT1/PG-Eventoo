import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../App";


export const axiosModeCategories = createAsyncThunk(
  'categories/axiosModeCategories',
  async () => {
    const res = await API.get('/home/categories')  
    // res.data.categories.sort(function (a, b) {
    //   if (a.name > b.name) {
    //     return 1;
    //   }
    //   if (a.name < b.name) {
    //     return -1;
    //   }
    //   return 0;
    // }); 

    return res.data
  }) 


export const categorieSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: false,
    error: null,
    filter: ''
  },
  reducers: {
    selectedFilter: (state, action) => {
      state.filter = action.payload
    }
  },
  extraReducers: {
    [axiosModeCategories.pending]: (state) => {
      state.loading = true;
    },
    [axiosModeCategories.fulfilled]: (state, action) => {      
      state.categories = action.payload
      state.loading = false;
      state.error = null;
      
    },
    [axiosModeCategories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  }
}
)
export default categorieSlice.reducer
