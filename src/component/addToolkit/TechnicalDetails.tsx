import React from "react";
import { Code } from "lucide-react";

interface TechnicalDetailsProps {
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  techStacks: string[];
}

export const TechnicalDetails: React.FC<TechnicalDetailsProps> = ({ form, handleChange, techStacks }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
      <Code className="w-5 h-5 text-white" />
      Technical Details
    </h2>
    <div className="space-y-4">
      <div>
        <label className="block mb-2 font-medium text-white/90">Tech Stack *</label>
        <input
          type="text"
          name="techStack"
          value={form.techStack}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2   focus:border-transparent outline-none placeholder-white/40 transition-all"
          placeholder="e.g. React, Node.js, MongoDB"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-white/90">Tags (comma separated) *</label>
        <input
          type="text"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2   focus:border-transparent outline-none placeholder-white/40 transition-all"
          placeholder="e.g. saas, nextjs, stripe, tailwind"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-white/90">License</label>
        <select
          name="license"
          value={form.license}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2   focus:border-transparent outline-none transition-all"
        >
          <option value="">Select license</option>
          <option value="MIT" className="bg-slate-800">MIT</option>
          <option value="Apache-2.0" className="bg-slate-800">Apache 2.0</option>
          <option value="GPL-3.0" className="bg-slate-800">GPL 3.0</option>
          <option value="Commercial" className="bg-slate-800">Commercial</option>
        </select>
      </div>
    </div>
  </div>
);
