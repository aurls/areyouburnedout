import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import server from '../services/server';
import { Params } from '../types';

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

interface RootState {
  params: Params,
  prediction: number | null,
  fetching: boolean,
  error: boolean
}

const initialState: RootState = {
  params: defaultParams,
  prediction: null,
  fetching: false,
  error: false
};

const getAttrition = createAsyncThunk(
  'root/getAttrition',
  async (id: string) => {
    const data = await server.getAttrition(id);

    return data;
  }
);

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
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAttrition.pending, (state) => {
        state.prediction = null;
        state.fetching = true;
        state.error = false;
      })
      .addCase(getAttrition.fulfilled, (state, action) => {
        state.prediction = action.payload.prediction;
        state.fetching = false;
        state.error = false;
      })
      .addCase(getAttrition.rejected, (state) => {
        state.prediction = null;
        state.fetching = false;
        state.error = true;
      })
      .addCase(postParams.pending, (state) => {
        state.prediction = null;
        state.fetching = true;
        state.error = false;
      })
      .addCase(postParams.fulfilled, (state, action) => {
        state.prediction = action.payload.prediction;
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
  getAttrition,
  postParams,
  reducer: root.reducer
};
