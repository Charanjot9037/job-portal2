'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

nProgress.configure({ showSpinner: false, trickleSpeed: 100 });

export default function ProgressBar() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      nProgress.start();
      prevPath.current = pathname;

      setTimeout(() => {
        nProgress.done();
      }, 400); // Simulate slight delay
    }
  }, [pathname]);

  return null;
}