import React from "react";
import { FileText, X } from "lucide-react";

interface DescriptionFeaturesProps {
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFeatureChange: (index: number, value: string) => void;
  addFeature: () => void;
  removeFeature: (index: number) => void;
}

export const DescriptionFeatures: React.FC<DescriptionFeaturesProps> = ({
  form,
  handleChange,
  handleFeatureChange,
  addFeature,
  removeFeature,
}) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
      <FileText className="w-5 h-5 text-white" />
      Description & Features
    </h2>
    <div className="space-y-4">
      <div>
        <label className="block mb-2 font-medium text-white/90">Detailed Description *</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2   focus:border-transparent outline-none placeholder-white/40 transition-all resize-none"
          placeholder="Describe your toolkit in detail. What does it do? What problems does it solve? What makes it special?"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-white/90">Key Features</label>
        <div className="space-y-2">
          {form.features.map((feature: string, index: number) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:ring-2   focus:border-transparent outline-none placeholder-white/40 transition-all"
                placeholder="e.g. Authentication with NextAuth.js"
              />
              {form.features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="text-[#23C660] text-sm transition-colors"
          >
            + Add Feature
          </button>
        </div>
      </div>
    </div>
  </div>
);
