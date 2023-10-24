import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import server from '../services/server';
import { Value } from '../types';

const defaultValue: Value = {
  age: 23,
  gender: 'Male',
  maritalStatus: 'Single'
}

interface RootState {
  value: Value,
  prediction: boolean | null,
  fetching: boolean,
  error: boolean
}

const initialState: RootState = {
  value: defaultValue,
  prediction: null,
  fetching: false,
  error: false
};

const postParams = createAsyncThunk(
  'root/postParams',
  async (params: Value) => {
    const prediction = await server.postParams(params);

    return prediction;
  }
);

const root = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
      state.prediction = null;
      state.error = false;
    },
    resetValue: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postParams.pending, (state) => {
        state.prediction = null;
        state.fetching = true;
        state.error = false;
      })
      .addCase(postParams.fulfilled, (state, action) => {
        state.prediction = action.payload;
        state.fetching = false;
        state.error = false;
      })
      .addCase(postParams.rejected, (state) => {
        state.prediction = null;
        state.fetching = false;
        state.error = true;
      })
  }
});

export default {
  ...root.actions,
  postParams,
  reducer: root.reducer
};
