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
// ✅ Use the correct path with .js extension
import createWebStorage from 'redux-persist/lib/storage/createWebStorage.js';

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
  typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export default storage;
