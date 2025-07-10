import React from "react";

export default function DashboardAnalytics() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-1">Welcome back, Ilona.</h1>
          <p className="text-gray-400">Here's how your products are performing today.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="font-medium">Ilorie Smildaet</span>
            <span className="text-xs text-gray-400">lionaedu09.com</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#23C660] to-[#0A0A0A] border-2 border-white/10 flex items-center justify-center overflow-hidden">
            {/* Avatar placeholder */}
            <span className="text-2xl font-bold text-white">I</span>
          </div>
        </div>
      </div>

      {/* Analytics Cards & Chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-[#101010] rounded-2xl p-6 flex flex-col gap-4 shadow-lg border border-white/10">
          <span className="text-gray-400 text-sm">SALES THIS MONTH</span>
          <span className="text-3xl font-bold">$5,950.64</span>
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-semibold text-lg">+2,34%</span>
            <span className="text-xs text-gray-400">21.5% CHANGE</span>
          </div>
          <div className="text-gray-400 text-sm">PRODUCT VIEWS</div>
          <div className="font-semibold">12,4k</div>
          <div className="text-gray-400 text-sm">CONVERSION RATE</div>
          <div className="font-semibold">5,6%</div>
          <button className="mt-4 bg-lime-400 text-black font-semibold rounded-lg px-4 py-2 hover:bg-lime-500 transition">Download Report</button>
        </div>
        <div className="col-span-2 bg-[#101010] rounded-2xl p-6 shadow-lg border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Active products</span>
            <button className="text-gray-400 hover:text-white transition"><svg width="20" height="20" fill="none"><rect width="20" height="20" rx="4" fill="#232323"/><path d="M7 10h6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg></button>
          </div>
          {/* Chart Placeholder */}
          <div className="h-40 flex items-end relative">
            <div className="absolute left-1/3 bottom-16 bg-white/10 rounded-xl px-4 py-2 flex items-center gap-2 shadow-lg">
              <span className="inline-block w-2 h-2 bg-lime-400 rounded-full" />
              <span className="font-semibold">React</span>
              <span className="ml-2 font-bold">$3,4200</span>
            </div>
            <div className="absolute right-1/4 bottom-8 bg-white/10 rounded-xl px-4 py-2 flex items-center gap-2 shadow-lg">
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full" />
              <span className="font-semibold">GO</span>
              <span className="ml-2 font-bold">$2,980</span>
            </div>
            <div className="w-full h-full bg-gradient-to-tr from-[#232323] to-[#181818] rounded-xl" />
          </div>
        </div>
      </div>

      {/* Product Listings & Author Rating */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2 bg-[#101010] rounded-2xl p-6 shadow-lg border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Product Listings</h2>
          <div className="divide-y divide-white/10">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2">
                <span className="inline-block w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-2">⚙️</span>
                <span>React Native Kit</span>
              </div>
              <span className="font-semibold">$499</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2">
                <span className="inline-block w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-2">🟢</span>
                <span>Go API <span className="text-lime-400 text-xs ml-2">Active</span></span>
              </div>
              <span className="font-semibold">$129</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2">
                <span className="inline-block w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-2">🔥</span>
                <span>Firebase Auth Setup</span>
              </div>
              <span className="font-semibold">$299</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2">
                <span className="inline-block w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-2">💳</span>
                <span>Stripe Integration</span>
              </div>
              <span className="font-semibold">$79</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2">
                <span className="inline-block w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center mr-2">N</span>
                <span>Next.js Boilerplate</span>
              </div>
              <span className="font-semibold">$149</span>
            </div>
          </div>
        </div>
        <div className="bg-[#101010] rounded-2xl p-6 shadow-lg border border-white/10 flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Your author rating</h2>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#232323" strokeWidth="3" />
                  <path d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#A3E635" strokeWidth="3" strokeDasharray="80, 100" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">80%</span>
              </div>
              <div>
                <div className="text-2xl font-bold">80%</div>
                <div className="text-gray-400 text-xs">Last Check on 28 Apr</div>
                <div className="text-green-400 text-xs font-semibold mt-1">+2,3%</div>
              </div>
            </div>
          </div>
          <div className="bg-[#232323] rounded-xl p-4 flex items-center gap-4">
            <span className="inline-block w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-xl">🖐️</span>
            <div>
              <div className="text-lg font-semibold">Firebase Auth</div>
              <div className="text-2xl font-bold">$52,291</div>
              <div className="text-green-400 text-xs font-semibold mt-1">+0,25%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
