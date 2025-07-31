// // redux/persistedStore.js
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import authSlice from './authSlice.js';
// import jobSlice from './jobSlice.js';
// import companySlice from './companySlice.js';
// import ApplicationSlice from './applicationslice.js';

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';

// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
// };

// const rootReducer = combineReducers({
//   auth: authSlice,
//   job: jobSlice,
//   company: companySlice,
//   Application: ApplicationSlice,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);
// redux/persistedStore.js

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from './authSlice.js';
import jobSlice from './jobSlice.js';
import companySlice from './companySlice.js';
import ApplicationSlice from './applicationslice.js';

// Always import persist methods
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// For storage, we’ll conditionally import
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company: companySlice,
  Application: ApplicationSlice,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Export a fallback persistor
export const persistor =
  typeof window !== 'undefined' ? persistStore(store) : { purge: () => {}, flush: () => {} };
