import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="w-14 h-14 flex items-center justify-center rounded-full mb-4 border border-white/10 hover:bg-white/5 transition-all duration-200 mt-8 text-red-500"
      aria-label="Logout"
      title="Logout"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9" />
      </svg>
    </button>
  );
}

export default LogoutButton;
