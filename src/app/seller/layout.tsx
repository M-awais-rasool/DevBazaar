"use client";
import React, { ReactNode, useEffect, useState } from 'react'
import SideBar from "@/component/sideBar/SideBar";
import BottomNav from "@/component/sideBar/BottomNav";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

function layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: session, status }: any = useSession();
  const [isSeller, setIsSeller] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/admin");
      return;
    }
    if (status === "authenticated") {
      if (session?.user?.role !== "seller") {
        setIsSeller(false);
        return;
      }
    }
  }, [status, session, router]);

  if (status === "loading" || session?.user?.role !== "seller") {
    return null;
  }

  if (!isSeller) {
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

  return (
    <div className="min-h-screen flex bg-[#090909] text-white">
      <SideBar />
      <main className="flex-1 bg-[#090909] overflow-y-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}

export default layout
