import React from "react";
import { Image } from "lucide-react";

interface ImageUploadProps {
  dragActive: boolean;
  handleDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ dragActive, handleDrag, handleDrop, handleChange }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
      <Image className="w-5 h-5 text-white" />
      Preview Images
    </h2>
    <div>
      <label className="block mb-2 font-medium text-white/90">Images (Max 5)</label>
      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${dragActive ? 'border-[#23C660] bg-purple-400/10' : 'border-white/20 hover:border-[#23C660]'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Image className="w-12 h-12 text-white/40 mx-auto mb-4" />
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleChange}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <span className="text-white/90 hover:text-[#23C660] transition-colors">
            Click to upload or drag & drop images
          </span>
          <p className="text-white/50 text-sm mt-2">PNG, JPG, WebP up to 5MB each</p>
        </label>
      </div>
    </div>
  </div>
);
