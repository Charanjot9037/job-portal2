// app/ClientLayout.jsx
'use client';

import dynamic from 'next/dynamic';
import ProgressBar from './components/progressbar';
import Navbar from './components/shared/Navbar';
import { Toaster } from 'react-hot-toast';

const ProvidersWrapper = dynamic(() => import('@/app/providers/ProvidersWrappergi'), {
  ssr: false,
});

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
