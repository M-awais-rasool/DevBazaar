"use client";
import React, { useEffect, useState } from 'react'
import SideBar from "@/component/sideBar/SideBar";
import BottomNav from "@/component/sideBar/BottomNav";
import { FileText, BarChart2, Users, PlusSquare } from 'lucide-react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

function layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, status }: any = useSession();
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/admin");
      return;
    }
    if (status === "authenticated") {
      if (session?.user?.role !== "admin") {
        setIsAdmin(false);
        return;
      }
    }
  }, [status, session, router]);

  if (status === "loading") {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Unauthorized</h2>
          <p className="mb-6">You do not have access to this page.</p>
          <Link href="/login" className="text-[#23C660] underline">Go to Login</Link>
        </div>
      </div>
    );
  }

  const adminNavItems = [
    {
      href: '/admin/allSeller',
      icon: <Users className="w-6 h-6" />, 
      tooltip: 'View All Sellers',
      label: 'View Sellers',
    },
    {
      href: '/admin/blogs',
      icon: <PlusSquare className="w-6 h-6" />, 
      tooltip: 'Add Blogs',
      label: 'Add Blogs',
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#090909] text-white">
      <SideBar navItems={adminNavItems} />
      <main className="flex-1 bg-[#090909] overflow-y-auto">
        {children}
      </main>
      <BottomNav navItems={adminNavItems} />
    </div>
  )
}

export default layout
