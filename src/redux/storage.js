// redux/storage.js
const isServer = typeof window === 'undefined';

const storage = {
  getItem: (key) => {
    if (isServer) return null;
    return localStorage.getItem(key);
  },
  setItem: (key, value) => {
    if (isServer) return;
    localStorage.setItem(key, value);
  },
  removeItem: (key) => {
    if (isServer) return;
    localStorage.removeItem(key);
  },
};

export default storage;
