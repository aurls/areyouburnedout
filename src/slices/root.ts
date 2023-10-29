import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Params } from '../types';

import server from '../services/server';
import localStorage from '../services/localStorage';

const defaultParams: Params = {
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

interface State {
  params: Params
  prediction: number | null
  fetching: boolean
  error: boolean
}

const initialState: State = {
  params: defaultParams,
  prediction: null,
  fetching: false,
  error: false
};

const postParams = createAsyncThunk(
  'root/postParams',
  async (params: Params) => {
    const data = await server.postParams(params);

    return data;
  }
);

const root = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setParams: (state, action: PayloadAction<Params>) => {
      state.params = action.payload;
      state.prediction = null;
      state.error = false;

      localStorage.set('alyaska/params', action.payload);
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    reset: () => {
      localStorage.remove('alyaska/params');

      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postParams.pending, (state) => {
        state.fetching = true;
        state.error = false;
      })
      .addCase(postParams.fulfilled, (state, action) => {
        state.prediction = action.payload.prediction;
        state.fetching = false;
        state.error = false;
      })
      .addCase(postParams.rejected, (state) => {
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
