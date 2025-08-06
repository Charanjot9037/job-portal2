// // utils/createStorage.js
// import {createWebStorage} from "redux-persist/lib/storage/createWebStorage";

// const createNoopStorage = () => {
//   return {
//     getItem(_key) {
//       return Promise.resolve(null);
//     },
//     setItem(_key, value) {
//       return Promise.resolve(value);
//     },
//     removeItem(_key) {
//       return Promise.resolve();
//     },
//   };
// };

// const storage =
//   typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

// export default storage;
// ✅ FIXED: Correct way to import createWebStorage
import * as storageModule from 'redux-persist/lib/storage/createWebStorage';

const createWebStorage = storageModule.default || storageModule.createWebStorage;

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

export default storage;
