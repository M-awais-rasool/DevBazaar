"use client";
import React, { useState } from "react";
import { ArrowLeft, Upload, X, Check, Star, Code, Tag, DollarSign, FileText, Image, Package, Globe, Github, ExternalLink } from "lucide-react";

export default function AddToolkitPage() {
  const [form, setForm] = useState<{
    name: string;
    description: string;
    shortDescription: string;
    tags: string;
    price: string;
    category: string;
    techStack: string;
    demoUrl: string;
    githubUrl: string;
    version: string;
    license: string;
    zip: File | null;
    images: File[];
    features: string[];
  }>({
    name: "",
    description: "",
    shortDescription: "",
    tags: "",
    price: "",
    category: "",
    techStack: "",
    demoUrl: "",
    githubUrl: "",
    version: "",
    license: "",
    zip: null,
    images: [],
    features: [""],
  });
  const [preview, setPreview] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadStep, setUploadStep] = useState(1);

  const categories = [
    "SaaS Templates", "E-commerce", "Landing Pages", "Dashboard", "Admin Panel", 
    "Mobile Apps", "API Tools", "AI/ML", "Blockchain", "Developer Tools"
  ];

  const techStacks = [
    "React", "Next.js", "Vue.js", "Angular", "Node.js", "Express", "FastAPI", 
    "Django", "Laravel", "Spring Boot", "MongoDB", "PostgreSQL", "MySQL"
  ];

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name === "zip") {
      setForm({ ...form, zip: files[0] });
    } else if (name === "images") {
      const fileArray = Array.from(files);
      setForm({ ...form, images: fileArray });
      setPreview(fileArray.map((file: any) => URL.createObjectURL(file)));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...form.features];
    newFeatures[index] = value;
    setForm({ ...form, features: newFeatures });
  };

  const addFeature = () => {
    setForm({ ...form, features: [...form.features, ""] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = form.features.filter((_, i) => i !== index);
    setForm({ ...form, features: newFeatures });
  };

  const removeImage = (index: number) => {
    const newImages = form.images.filter((_, i) => i !== index);
    const newPreview = preview.filter((_, i) => i !== index);
    setForm({ ...form, images: newImages });
    setPreview(newPreview);
  };

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file: any) => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      setForm({ ...form, images: [...form.images, ...imageFiles] });
      setPreview([...preview, ...imageFiles.map((file: any) => URL.createObjectURL(file))]);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setUploadStep(3);
    // Simulate upload
    setTimeout(() => {
      alert("Toolkit uploaded successfully!");
      setUploadStep(1);
    }, 2000);
  };

  const goBack = () => {
    // Navigate back logic
    console.log("Going back...");
  };

  const nextStep = () => {
    setUploadStep(2);
  };

  const prevStep = () => {
    setUploadStep(1);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={goBack}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Dashboard</span>
            </button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      uploadStep >= step ? 'bg-white text-black' : 'bg-white/10 text-white/50'
                    }`}>
                      {uploadStep > step ? <Check className="w-4 h-4" /> : step}
                    </div>
                    {step < 3 && <div className={`w-8 h-0.5 ${uploadStep > step ? 'bg-white' : 'bg-white/10'}`} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container  px-6 py-8">
        {uploadStep === 1 && (
          <div className="">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 text-white">
                Upload Your Toolkit
              </h1>
              <p className="text-gray-300 text-lg">Share your amazing toolkit with the developer community</p>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
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
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder-white/40 transition-all"
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
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder-white/40 transition-all"
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
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        >
                          <option value="">Select a category</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-2 font-medium text-white/90">Price (USD) *</label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                            <input
                              type="number"
                              name="price"
                              value={form.price}
                              onChange={handleChange}
                              required
                              min="0"
                              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder-white/40 transition-all"
                              placeholder="49"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block mb-2 font-medium text-white/90">Version</label>
                          <input
                            type="text"
                            name="version"
                            value={form.version}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder-white/40 transition-all"
                            placeholder="1.0.0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

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
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder-white/40 transition-all"
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
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder-white/40 transition-all"
                          placeholder="e.g. saas, nextjs, stripe, tailwind"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 font-medium text-white/90">License</label>
                        <select
                          name="license"
                          value={form.license}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
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
                </div>

                {/* Right Column */}
                <div className="space-y-6">
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
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder-white/40 transition-all resize-none"
                          placeholder="Describe your toolkit in detail. What does it do? What problems does it solve? What makes it special?"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 font-medium text-white/90">Key Features</label>
                        <div className="space-y-2">
                          {form.features.map((feature, index) => (
                            <div key={index} className="flex gap-2">
                              <input
                                type="text"
                                value={feature}
                                onChange={(e) => handleFeatureChange(index, e.target.value)}
                                className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder-white/40 transition-all"
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
                            className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                          >
                            + Add Feature
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

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
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder-white/40 transition-all"
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
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder-white/40 transition-all"
                            placeholder="https://github.com/username/repo"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 bg-white text-black hover:bg-gray-200 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Continue to Upload Files
                </button>
              </div>
            </div>
          </div>
        )}

        {uploadStep === 2 && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 text-white">
                Upload Files & Images
              </h1>
              <p className="text-gray-300 text-lg">Add your toolkit files and preview images</p>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* ZIP File Upload */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
                    <Package className="w-5 h-5 text-white" />
                    Toolkit Files
                  </h2>
                  
                  <div>
                    <label className="block mb-2 font-medium text-white/90">ZIP File *</label>
                    <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
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
                        <span className="text-white/90 hover:text-purple-400 transition-colors">
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

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
                    <Image className="w-5 h-5 text-white" />
                    Preview Images
                  </h2>
                  
                  <div>
                    <label className="block mb-2 font-medium text-white/90">Images (Max 5)</label>
                    <div 
                      className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                        dragActive ? 'border-purple-400 bg-purple-400/10' : 'border-white/20 hover:border-purple-400'
                      }`}
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
                        <span className="text-white/90 hover:text-purple-400 transition-colors">
                          Click to upload or drag & drop images
                        </span>
                        <p className="text-white/50 text-sm mt-2">PNG, JPG, WebP up to 5MB each</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Preview */}
              {preview.length > 0 && (
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
              )}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-all text-white"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-white text-black hover:bg-gray-200 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Upload Toolkit
                </button>
              </div>
            </div>
          </div>
        )}

        {uploadStep === 3 && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-black animate-bounce" />
              </div>
              <h1 className="text-3xl font-bold mb-4 text-white">Uploading Your Toolkit...</h1>
              <p className="text-gray-300 mb-8">Please wait while we process your files</p>
              <div className="w-full bg-white/10 rounded-full h-2 mb-6">
                <div className="bg-white h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
              </div>
              <p className="text-gray-400">This may take a few moments...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}