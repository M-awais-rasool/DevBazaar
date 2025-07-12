
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/component/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

interface Blog {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  tags: string[];
  createdAt: string;
}

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const router = useRouter();
  const handleDeleteClick = (blog: Blog) => {
    setSelectedBlog(blog);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedBlog) return;
    setDeletingId(selectedBlog._id);
    try {
      const res = await fetch(`/api/blogs?id=${selectedBlog._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b._id !== selectedBlog._id));
      }
    } catch (err) {
      // Optionally handle error
    } finally {
      setDeletingId(null);
      setShowConfirm(false);
      setSelectedBlog(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setSelectedBlog(null);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setBlogs(data.blogs || []);
      } catch (err) {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-6xl flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-white"
        >
          Blogs
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            size="lg"
            className="button-gradient shadow-lg"
            onClick={() => router.push("/admin/blogs/addBlogs")}
          >
            Add Blog
          </Button>
        </motion.div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-opacity-50"></span>
        </div>
      ) : blogs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-400 mt-20"
        >
          No blogs found.
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
        >
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="bg-[#101010] rounded-2xl shadow-lg overflow-hidden flex flex-col hover:scale-[1.025] hover:shadow-2xl transition-all duration-300 border border-white/10 relative"
            >
              {/* Delete Icon Button */}
              <button
                className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-red-600/80 text-white rounded-full p-2 transition-colors"
                title="Delete Blog"
                onClick={() => handleDeleteClick(blog)}
                disabled={deletingId === blog._id}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="relative w-full h-56 bg-[#181818]">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-2xl font-semibold mb-2 text-white line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-gray-300 mb-4 line-clamp-3 min-h-[60px]">
                  {blog.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags && blog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-[#23C660]/10 text-[#23C660] px-3 py-1 rounded-full text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-gray-400">By {blog.author}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    {/* Confirm Delete Modal */}
    {showConfirm && selectedBlog && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="bg-[#181818] rounded-xl p-8 shadow-2xl w-full max-w-sm text-center">
          <h3 className="text-xl font-semibold mb-4 text-white">Delete Blog</h3>
          <p className="mb-6 text-gray-300">Are you sure you want to delete <span className="font-bold">{selectedBlog.title}</span>?</p>
          <div className="flex justify-center gap-4">
            <button
              className="px-5 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white"
              onClick={handleCancelDelete}
              disabled={deletingId === selectedBlog._id}
            >
              Cancel
            </button>
            <button
              className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
              onClick={handleConfirmDelete}
              disabled={deletingId === selectedBlog._id}
            >
              {deletingId === selectedBlog._id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default BlogsPage;
