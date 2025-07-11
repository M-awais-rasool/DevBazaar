
"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

const initialState = {
  title: "",
  description: "",
  author: "",
  tags: "",
  image: null,
};

export default function AddBlogPage() {
  const [form, setForm] = useState(initialState);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as any;
    if (name === "image" && files && files[0]) {
      setForm((prev) => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, tags: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("author", form.author);
      formData.append("tags", form.tags);
      if (form.image) formData.append("image", form.image);

      const res = await fetch("/api/blogs", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed to add blog");
      setSuccess(true);
      setForm(initialState);
      setPreview(null);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-[#0A0A0A] rounded-2xl shadow-2xl border border-white/10 p-8 relative overflow-hidden"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold mb-2 text-white text-center"
        >
          Add New Blog
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-md text-gray-400 mb-8 text-center"
        >
          Share your latest insights and stories with the community.
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-2"
          >
            <label className="text-gray-300 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="bg-black/60 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter blog title"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-col gap-2"
          >
            <label className="text-gray-300 font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="bg-black/60 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
              placeholder="Write your blog description..."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-2"
          >
            <label className="text-gray-300 font-medium">Author</label>
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              required
              className="bg-black/60 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Your name"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-col gap-2"
          >
            <label className="text-gray-300 font-medium">Tags</label>
            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleTagInput}
              className="bg-black/60 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Comma separated (e.g. react, nextjs, saas)"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-2"
          >
            <label className="text-gray-300 font-medium">Image</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#23C660] text-white rounded-lg shadow hover:scale-105 transition-transform focus:outline-none"
              >
                <ImageIcon className="w-5 h-5" />
                {form.image ? "Change Image" : "Upload Image"}
              </button>
              <input
                type="file"
                name="image"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleChange}
                className="hidden"
              />
              {preview && (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/10">
                  <Image src={preview} alt="Preview" fill className="object-cover" />
                </div>
              )}
            </div>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center font-medium"
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-500 text-center font-medium"
            >
              Blog added successfully!
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#23C660] text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <>
                Add Blog <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </form>

        {/* Decorative background gradient */}
       <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-[#23C660]/40 to-[#23C660]/10 rounded-full blur-3xl z-0" />
<div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-to-tr from-[#23C660]/40 to-[#23C660]/10 rounded-full blur-3xl z-0" />

      </motion.div>
    </div>
  );
}
