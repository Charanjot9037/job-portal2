

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from './authSlice.js';
import jobSlice from './jobSlice.js';
import companySlice from './companySlice.js';
import ApplicationSlice from './applicationslice.js';
import storage from './storage.js'; // adjust path as needed


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
// export const persistor =
//   typeof window !== 'undefined' ? persistStore(store) : { purge: () => {}, flush: () => {} };
let persistor;

if (typeof window !== 'undefined') {
  persistor = persistStore(store);
}

export { store, persistor };
