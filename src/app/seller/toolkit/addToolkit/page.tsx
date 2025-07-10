"use client";
import React, { useState } from "react";
import { ArrowLeft, } from "lucide-react";
import { Button } from "@/component/ui/button";
import { Stepper } from "../../../../component/addToolkit/Stepper";
import { BasicInfo } from "../../../../component/addToolkit/BasicInfo";
import { TechnicalDetails } from "../../../../component/addToolkit/TechnicalDetails";
import { DescriptionFeatures } from "../../../../component/addToolkit/DescriptionFeatures";
import { LinksResources } from "../../../../component/addToolkit/LinksResources";
import { FileUpload } from "../../../../component/addToolkit/FileUpload";
import { ImageUpload } from "../../../../component/addToolkit/ImageUpload";
import { ImagePreview } from "../../../../component/addToolkit/ImagePreview";
import { UploadingScreen } from "../../../../component/addToolkit/UploadingScreen";

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
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
      const fileArray = Array.from(files) as File[];
      setForm({ ...form, images: fileArray });
      setPreview(fileArray.map((file: File) => URL.createObjectURL(file)));
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
      setForm({ ...form, images: [...form.images, ...(imageFiles as File[])] });
      setPreview([...preview, ...(imageFiles as File[]).map((file: File) => URL.createObjectURL(file))]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setUploadStep(3);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("shortDescription", form.shortDescription);
      formData.append("tags", form.tags);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("techStack", form.techStack);
      formData.append("demoUrl", form.demoUrl);
      formData.append("githubUrl", form.githubUrl);
      formData.append("version", form.version);
      formData.append("license", form.license);
      if (form.zip) formData.append("zip", form.zip);
      form.features.forEach((feature) => {
        if (feature) formData.append("features", feature);
      });
      form.images.forEach((img) => {
        formData.append("images", img);
      });
      const res = await fetch("/api/toolkit", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload toolkit");
      setSuccess("Toolkit uploaded successfully!");
      setTimeout(() => {
        setUploadStep(1);
        setForm({
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
        setPreview([]);
      }, 1500);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload toolkit");
      setTimeout(() => setUploadStep(2), 1500);
    }
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
              <Stepper uploadStep={uploadStep} />
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
                  <BasicInfo form={form} handleChange={handleChange} categories={categories} />
                  <TechnicalDetails form={form} handleChange={handleChange} techStacks={techStacks} />
                </div>
                {/* Right Column */}
                <div className="space-y-6">
                  <DescriptionFeatures
                    form={form}
                    handleChange={handleChange}
                    handleFeatureChange={handleFeatureChange}
                    addFeature={addFeature}
                    removeFeature={removeFeature}
                  />
                  <LinksResources form={form} handleChange={handleChange} />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={nextStep}
                  className="px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Continue to Upload Files
                </Button>
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
                <FileUpload form={form} handleChange={handleChange} />
                <ImageUpload dragActive={dragActive} handleDrag={handleDrag} handleDrop={handleDrop} handleChange={handleChange} />
              </div>
              {/* Image Preview */}
              {preview.length > 0 && (
                <ImagePreview preview={preview} removeImage={removeImage} />
              )}
              {error && <div className="text-red-400 text-center">{error}</div>}
              {success && <div className="text-green-400 text-center">{success}</div>}
              <div className="flex justify-between">
                <Button onClick={prevStep}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-all text-white"
                >
                  Previous
                </Button>
                <Button onClick={handleSubmit}
                  className="px-8 py-3 text-white rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                  disabled={uploadStep !== 2}
                >
                  Upload Toolkit
                </Button>
              </div>
            </div>
          </div>
        )}

        {uploadStep === 3 && <UploadingScreen />}
      </div>
    </div>
  );
}