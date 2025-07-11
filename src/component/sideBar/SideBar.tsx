"use client";
import { BarChart2, FileText, Settings,  } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import LogoutButton from './LogoutButton';

const navItems = [
  {
    href: '/seller/dashboardAnalytics',
    icon: <BarChart2 className="w-6 h-6" />, 
    tooltip: 'Analytics',
  },
  {
    href: '/seller/toolkit',
    icon: <FileText className="w-6 h-6" />,
    tooltip: 'Toolkits',
  },
  {
    href: '/seller/dashboardSettings',
    icon: <Settings className="w-6 h-6" />,
    tooltip: 'Settings',
  },
];

function SideBar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex w-24 bg-[#0A0A0A] flex-col items-center py-8 relative border-r border-white/10 min-h-screen">
      <div className="mb-12 flex flex-col items-center">
        <span className="text-4xl font-bold tracking-tight flex items-center gap-2">
          <span className="inline-block w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-2xl">P</span>
          </span>
        </span>
        <span className="w-2 h-2 bg-green-400 rounded-full mt-1" />
      </div>
      <nav className="flex flex-col gap-6 mt-4">
        {navItems.map((item) => (
          <SidebarButton
            key={item.href}
            href={item.href}
            icon={item.icon}
            tooltip={item.tooltip}
            active={pathname === item.href}
          />
        ))}
      </nav>
      <div className="mt-auto">
        {/* Logout Button */}
        <LogoutButton />
      </div>
    </aside>
  );
}

function SidebarButton({ icon, active, href, tooltip }: { icon: React.ReactNode; active?: boolean; href: string; tooltip: string }) {
  return (
    <Link href={href} className="group relative">
      <button
        className={`w-14 h-14 flex items-center justify-center rounded-full mb-4 border transition-all duration-200 ${active ? "bg-white/10 border-lime-400 shadow-lg" : "border-white/10 hover:bg-white/5"}`}
        aria-label={tooltip}
      >
        {icon}
      </button>
      <span className="absolute left-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 shadow-lg transition-opacity pointer-events-none z-10">
        {tooltip}
      </span>
    </Link>
  );
}

export default SideBar;
