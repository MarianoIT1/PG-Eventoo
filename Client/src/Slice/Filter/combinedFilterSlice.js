import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../App";

export const axiosCombinedFilter = createAsyncThunk(
  'filter/axiosCombinedFilter',
  async (resultSuperQuery) => {
    const res = await API.get('/home/events?' + resultSuperQuery)
    return res.data
  })

export const combinedFilterSlice = createSlice({
  name: 'filter',
  initialState: {
    filter: []
  },
  reducers: { },
  extraReducers: {
    [axiosCombinedFilter.pending]: (state) => {
      state.loading = true
    },
    [axiosCombinedFilter.fulfilled]: (state, action) => {
      state.filter = action.payload
      state.loading = false
      state.error = null
    },
    [axiosCombinedFilter.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    }
  }
}
)

export const {
  setCombinedFilter
} = combinedFilterSlice.actions


export default combinedFilterSlice.reducer