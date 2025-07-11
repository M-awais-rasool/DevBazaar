"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

export default function BottomNav({ navItems }: { navItems: NavItem[] }) {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-[#0A0A0A] border-t border-white/10 h-16 md:hidden">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center group">
          <span className={`rounded-full p-2 transition-all duration-200 ${pathname === item.href ? 'bg-white/10 text-[#23C660]' : 'text-white hover:bg-white/5'}`}>{item.icon}</span>
          <span className={`text-xs mt-1 ${pathname === item.href ? 'text-[#23C660]' : 'text-white/70'}`}>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
