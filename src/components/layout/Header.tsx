'use client';

import { useRouter } from 'next/navigation';

import { removeToken } from '@/lib/auth';

export default function Header() {
  const router = useRouter();

  function logout() {
    removeToken();
    router.replace('/login');
  }

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">

      <div>

        <h2 className="text-xl font-semibold text-slate-800">
          Dashboard
        </h2>

      </div>

      <div className="flex items-center gap-4">

        <span className="text-slate-600">
          Administrator
        </span>

        <button
          onClick={logout}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </header>
  );
}
