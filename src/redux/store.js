
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from './authSlice.js';
import jobSlice from './jobSlice.js';
import companySlice from './companySlice.js';
import ApplicationSlice from './applicationslice.js';

const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company: companySlice,
  Application: ApplicationSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
