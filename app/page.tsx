'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from './loading/page';

interface AppInfo {
  id: string;
  name: string;
}

export default function Page() {
  
  const router = useRouter();
  const [psApp, setPsApp] = useState<AppInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const foundAppTrue = true;

  useEffect(() => {
    const fetchRelatedApps = async () => {
      if (navigator.getInstalledRelatedApps) {
        try {
          const relatedApps: AppInfo[] = await navigator.getInstalledRelatedApps();
          const foundApp = relatedApps.find(app => app.id === "https://tailwind-css-starter-blog-ivory-one.vercel.app/");
          if (foundApp) {
            router.push('/main');
            setLoading(false)
          } else {
            router.push('/landing');
            setLoading(false)
          }
        } catch (error) {
          console.log('Error fetching related apps', error);
        }
      }
    }

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js');
      });
      fetchRelatedApps();
    }

  }, [router]);

  return (
    <>
      {loading && <Loading />}
    </>
  );
}
