'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AppInfo {
  id: string;
  name: string;
}

export default function Page() {
  
  const router = useRouter();
  const [psApp, setPsApp] = useState<AppInfo | null>(null);

  const foundAppTrue = true;

  useEffect(() => {
    const fetchRelatedApps = async () => {
      if (navigator.getInstalledRelatedApps) {
        try {
          const relatedApps: AppInfo[] = await navigator.getInstalledRelatedApps();
          const foundApp = relatedApps.find(app => app.id === "com.example.myapp");
          if (foundApp) {
            router.push('/main');
          } else {
            router.push('/landing');
          }
        } catch (error) {
          console.log('Error fetching related apps', error);
        }
      }
    };

    fetchRelatedApps();
  }, [router]);

  return <div>Loading...</div>
}
