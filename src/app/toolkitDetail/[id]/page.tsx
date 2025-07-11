"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/component/ui/button";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

const Navigation = dynamic(() => import("@/component/landingPage/Navigation"), { ssr: false });
const Footer = dynamic(() => import("@/component/footer/Footer"), { ssr: false });

const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:animate-pulse before:bg-gradient-to-r before:from-transparent before:via-gray-800/30 before:to-transparent";

interface Toolkit {
  _id: string;
  userId: string;
  name: string;
  description: string;
  shortDescription?: string;
  tags?: string;
  price?: string;
  category?: string;
  techStack?: string;
  demoUrl?: string;
  githubUrl?: string;
  version?: string;
  license?: string;
  zipUrl: string;
  imageUrls?: string[];
  features?: string[];
  createdAt?: string;
}

export default function ToolkitDetailPage() {
  const { data: session, status }: any = useSession();
  const { id } = useParams();
  const router = useRouter();
  const [toolkit, setToolkit] = useState<Toolkit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.role === "seller") {
      router.replace("/seller");
    }
  }, [session, status, router]);

  if (status === "loading" || session?.user?.role === "seller") {
    return null;
  }

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/toolkits/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.toolkit) setToolkit(data.toolkit);
        else setError(data.error || "Toolkit not found");
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load toolkit");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <Navigation />
        <div className="flex justify-center items-center h-64">
          <span className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-opacity-50"></span>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-red-500 text-xl">
        <Navigation />
        <div className="mt-32">{error}</div>
      </div>
    );
  }
  if (!toolkit) return null;

  return (
    <div className="min-h-screen bg-black text-white relative">
      <Navigation />
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="container mx-auto px-4 pt-28 "
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="flex flex-col md:flex-row gap-12 items-center md:items-start glass rounded-2xl shadow-2xl p-8"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
            className="w-full md:w-1/2 flex flex-col gap-4"
          >
            <div className={`rounded-2xl bg-[#18181b] aspect-video relative overflow-hidden shadow-lg ${shimmer}`}>
              {toolkit.imageUrls?.[0] && (
                <Image
                  src={toolkit.imageUrls[0]}
                  alt={toolkit.name}
                  fill
                  className="object-cover rounded-2xl scale-105 hover:scale-100 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              )}
            </div>
            <div className="flex gap-3">
              {toolkit.imageUrls?.slice(1, 4).map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="w-20 h-20 rounded-xl overflow-hidden bg-[#18181b] relative shadow-md border border-white/10"
                >
                  <Image src={img} alt="Toolkit preview" fill className="object-cover" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="w-full md:w-1/2 flex flex-col gap-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-extrabold mb-2 text-gradient drop-shadow-lg"
            >
              {toolkit.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-300 mb-2"
            >
              {toolkit.shortDescription}
            </motion.p>
            <div className="flex flex-wrap gap-2 mb-2">
              {toolkit.tags?.split(",").map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-700 to-indigo-600 text-xs font-medium text-white shadow"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <div>
                <span className="font-semibold text-gray-200">Category:</span> {toolkit.category}
              </div>
              <div>
                <span className="font-semibold text-gray-200">Tech Stack:</span> {toolkit.techStack}
              </div>
              <div>
                <span className="font-semibold text-gray-200">Version:</span> {toolkit.version}
              </div>
              <div>
                <span className="font-semibold text-gray-200">License:</span> {toolkit.license}
              </div>
              <div>
                <span className="font-semibold text-gray-200">Price:</span> {toolkit.price === "0" ? "Free" : `$${toolkit.price}`}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 mt-4"
            >
              {toolkit.demoUrl && (
                <a href={toolkit.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="button-gradient shadow-xl hover:scale-105 transition-transform duration-300">
                    Live Demo <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              )}
              {toolkit.githubUrl && (
                <a href={toolkit.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-transform duration-300">
                    GitHub
                  </Button>
                </a>
              )}
              {toolkit.zipUrl && (
                <a href={toolkit.zipUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-gray-800 text-white hover:bg-gray-700 hover:scale-105 transition-transform duration-300">
                    Download
                  </Button>
                </a>
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          className="mt-16 grid md:grid-cols-3 gap-10"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="md:col-span-2 glass rounded-xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Description</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {toolkit.description}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="glass rounded-xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Features</h2>
            <ul className="space-y-3">
              {toolkit.features?.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-gray-200"
                >
                  <span className="mt-1 w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-400 block" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
        <Footer />
      </motion.div>

    </div>
  );
}
