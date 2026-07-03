'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getToken } from '@/lib/auth';

import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!getToken()) {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

	<div className="flex flex-1 flex-col">

        <Header />

	<main className="flex-1 p-8">
          {children}
        </main>

      </div>

    </div>
  );
}
