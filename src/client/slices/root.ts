import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import server from '../services/server';
import { Value } from '../types';

const defaultValue: Value = {
  age: 23,
  businessTravel: 'Non-Travel',
  dailyRate: 0,
  department: 'Research & Development',
  distanceFromHome: 0,
  education: 4,
  educationField: 'Technical Degree',
  environmentSatisfaction: 2,
  gender: 'Male',
  hourlyRate: 0,
  jobInvolvement: 2,
  jobLevel: 1,
  jobRole: 'Research Scientist',
  jobSatisfaction: 2,
  maritalStatus: 'Single',
  monthlyIncome: 0,
  monthlyRate: 0,
  numCompaniesWorked: 0,
  overTime: 'No',
  percentSalaryHike: 0,
  performanceRating: 2,
  relationshipSatisfaction: 2,
  stockOptionLevel: 0,
  totalWorkingYears: 0,
  trainingTimesLastYear: 0,
  workLifeBalance: 2,
  yearsAtCompany: 0,
  yearsInCurrentRole: 0,
  yearsSinceLastPromotion: 0,
  yearsWithCurrManager: 0
}

interface RootState {
  value: Value,
  prediction: number | null,
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
    resetValue: () => initialState,
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
