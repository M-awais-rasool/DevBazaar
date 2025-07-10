import React from "react";
import { Upload } from "lucide-react";

export const UploadingScreen: React.FC = () => (
  <div className="max-w-2xl mx-auto text-center">
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12">
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
        <Upload className="w-10 h-10 text-black animate-bounce" />
      </div>
      <h1 className="text-3xl font-bold mb-4 text-white">Uploading Your Toolkit...</h1>
      <p className="text-gray-300 mb-8">Please wait while we process your files</p>
      <div className="w-full bg-white/10 rounded-full h-2 mb-6">
        <div className="bg-white h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
      </div>
      <p className="text-gray-400">This may take a few moments...</p>
    </div>
  </div>
);
