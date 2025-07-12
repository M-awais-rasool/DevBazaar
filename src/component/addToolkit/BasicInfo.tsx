import React from "react";
import { Package } from "lucide-react";

interface BasicInfoProps {
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  categories: string[];
}

export const BasicInfo: React.FC<BasicInfoProps> = ({ form, handleChange, categories }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
      <Package className="w-5 h-5 text-white" />
      Basic Information
    </h2>
    <div className="space-y-4">
      <div>
        <label className="block mb-2 font-medium text-white/90">Toolkit Name *</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:border-transparent outline-none placeholder-white/40 transition-all"
          placeholder="e.g. NextJS SaaS Starter Kit"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-white/90">Short Description *</label>
        <input
          type="text"
          name="shortDescription"
          value={form.shortDescription}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:border-transparent outline-none placeholder-white/40 transition-all"
          placeholder="Brief one-line description"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-white/90">Category *</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2   focus:border-transparent outline-none transition-all"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* <div>
          <label className="block mb-2 font-medium text-white/90">Price (USD) *</label>
          <div className="relative">
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              min="0"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2   focus:border-transparent outline-none placeholder-white/40 transition-all"
              placeholder="49"
            />
          </div>
        </div> */}
        <div>
          <label className="block mb-2 font-medium text-white/90">Version</label>
          <input
            type="text"
            name="version"
            value={form.version}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2   focus:border-transparent outline-none placeholder-white/40 transition-all"
            placeholder="1.0.0"
          />
        </div>
      </div>
    </div>
  </div>
);
