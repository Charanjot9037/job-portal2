'use client';

import { Provider } from 'react-redux';
import { store, persistor } from '@/redux/persistedStore'; // ✅ adjust path if needed
import { PersistGate } from 'redux-persist/integration/react';

export default function ProvidersWrapper({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

// 'use client';

// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from "@/redux/persistedStore";

// export default function ProvidersWrapper({ children }) {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         {children}
//       </PersistGate>
//     </Provider>
//   );
// }


