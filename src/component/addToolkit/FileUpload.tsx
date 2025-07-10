import React from "react";
import { Package, Upload } from "lucide-react";

interface FileUploadProps {
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ form, handleChange }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
      <Package className="w-5 h-5 text-white" />
      Toolkit Files
    </h2>
    <div>
      <label className="block mb-2 font-medium text-white/90">ZIP File *</label>
      <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-[#23C660] transition-colors">
        <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
        <input
          type="file"
          name="zip"
          accept=".zip"
          onChange={handleChange}
          required
          className="hidden"
          id="zip-upload"
        />
        <label htmlFor="zip-upload" className="cursor-pointer">
          <span className="text-white/90 hover:text-[#23C660] transition-colors">
            Click to upload ZIP file
          </span>
          <p className="text-white/50 text-sm mt-2">Max size: 100MB</p>
        </label>
        {form.zip && (
          <div className="mt-4 text-green-400">
            ✓ {form.zip.name} uploaded
          </div>
        )}
      </div>
    </div>
  </div>
);
