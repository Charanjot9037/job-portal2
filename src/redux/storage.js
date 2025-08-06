// // utils/createStorage.js
// import createWebStorage from "redux-persist/lib/storage/createWebStorage";

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
// src/redux/storage.js

let storage;

if (typeof window !== 'undefined') {
  // Only require on client side
  storage = require('redux-persist/lib/storage').default;
} else {
  // Noop for server
  storage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };
}

export default storage;
