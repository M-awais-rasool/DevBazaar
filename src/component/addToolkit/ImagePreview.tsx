import React from "react";
import { X } from "lucide-react";

interface ImagePreviewProps {
  preview: string[];
  removeImage: (index: number) => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ preview, removeImage }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
    <h3 className="text-lg font-semibold mb-4 text-white">Image Preview</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {preview.map((src, i) => (
        <div key={i} className="relative group">
          <img
            src={src}
            alt={`Preview ${i + 1}`}
            className="w-full h-32 object-cover rounded-lg border border-white/10 group-hover:border-purple-400 transition-colors"
          />
          <button
            type="button"
            onClick={() => removeImage(i)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      ))}
    </div>
  </div>
);
