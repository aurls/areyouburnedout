import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Value } from '../types';

const defaultValue: Value = {
  age: 23,
  gender: 'Male'
}

interface RootState {
  value: Value
}

const initialState: RootState = {
  value: defaultValue
};

const root = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    }
  }
});

export default {
  ...root.actions,
  reducer: root.reducer
};
