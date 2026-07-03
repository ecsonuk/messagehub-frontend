'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menus = [
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
  {
    name: 'Templates',
    href: '/templates',
  },
  {
    name: 'Campaigns',
    href: '/campaigns',
  },

{
  name: 'Inbox',
  href: '/conversations',
},

  {
    name: 'Reports',
    href: '/reports',
  },
  {
    name: 'Audit Logs',
    href: '/audit',
  },
  {
    name: 'Settings',
    href: '/settings',
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col">

      <div className="border-b border-slate-700 p-6">

        <h1 className="text-2xl font-bold">
          🚘 Luxury Ride
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          WhatsApp Platform
        </p>

      </div>

      <nav className="flex-1 p-4">

        {menus.map((menu) => (

          <Link
            key={menu.href}
            href={menu.href}
            className={`block rounded-lg px-4 py-3 mb-2 transition

            ${
              pathname === menu.href
                ? 'bg-blue-600'
                : 'hover:bg-slate-800'
            }`}
          >
            {menu.name}
          </Link>

        ))}

      </nav>

    </aside>
  );
}
