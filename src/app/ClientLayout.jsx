// app/ClientLayout.jsx
'use client';

import dynamic from 'next/dynamic';
import ProgressBar from './components/progressbar';
import Navbar from './components/shared/Navbar';
import { Toaster } from 'react-hot-toast';
import ProvidersWrapper from '@/app/providers/ProvidersWrapper';

// const ProvidersWrapper = dynamic(() => import('@/app/providers/ProvidersWrapper'), {
//   ssr: false,
// });


export default function ClientLayout({ children }) {
  return (
    <ProvidersWrapper>
      <ProgressBar />
      <Navbar />
      <Toaster position="top-center" />
      {children}
    </ProvidersWrapper>
  );
}
