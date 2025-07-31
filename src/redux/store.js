
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import authSlice from './authSlice.js'
// import  jobSlice from './jobSlice.js'
// import companySlice from'./companySlice.js'
// import ApplicationSlice from './applicationslice.js'
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'


// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
// }
// const rootReducer=combineReducers({
//     auth:authSlice,
//     job:jobSlice,
//     company:companySlice,
//     Application:ApplicationSlice
// })
// const persistedReducer = persistReducer(persistConfig, rootReducer)


// const Store = configureStore({
//       reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),


// });
// export default  Store;
// redux/store.js
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
