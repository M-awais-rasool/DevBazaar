import React from "react";
import { Globe, Github, ExternalLink } from "lucide-react";

interface LinksResourcesProps {
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LinksResources: React.FC<LinksResourcesProps> = ({ form, handleChange }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
      <Globe className="w-5 h-5 text-white" />
      Links & Resources
    </h2>
    <div className="space-y-4">
      <div>
        <label className="block mb-2 font-medium text-white/90">Demo URL</label>
        <div className="relative">
          <ExternalLink className="absolute left-3 top-3 w-5 h-5 text-white/40" />
          <input
            type="url"
            name="demoUrl"
            value={form.demoUrl}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2   focus:border-transparent outline-none placeholder-white/40 transition-all"
            placeholder="https://your-demo.com"
          />
        </div>
      </div>
      <div>
        <label className="block mb-2 font-medium text-white/90">GitHub Repository</label>
        <div className="relative">
          <Github className="absolute left-3 top-3 w-5 h-5 text-white/40" />
          <input
            type="url"
            name="githubUrl"
            value={form.githubUrl}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2   focus:border-transparent outline-none placeholder-white/40 transition-all"
            placeholder="https://github.com/username/repo"
          />
        </div>
      </div>
    </div>
  </div>
);
