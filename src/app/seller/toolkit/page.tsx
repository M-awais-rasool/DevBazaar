"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/component/ui/button";
import { Card } from "@/component/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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

export default function ToolkitListPage() {
    const [toolkits, setToolkits] = useState<Toolkit[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchToolkits = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/toolkit", { credentials: "include" });
                const data = await res.json();
                if (res.ok && data.toolkits) {
                    setToolkits(data.toolkits);
                } else {
                    setError(data.error || "Failed to fetch toolkits");
                }
            } catch (err) {
                setError("Failed to fetch toolkits");
            } finally {
                setLoading(false);
            }
        };
        fetchToolkits();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-300 to-primary bg-clip-text text-transparent drop-shadow-lg">
                        Your Toolkits
                    </h1>
                    <Link href="/seller/toolkit/addToolkit">
                        <Button className="button-gradient text-lg px-6 py-2 rounded-lg shadow-lg">
                            + Add Toolkit
                        </Button>
                    </Link>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <span className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-opacity-50"></span>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-400 mt-20 text-lg">{error}</div>
                ) : (
                    <>
                        <AnimatePresence>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                                {toolkits.map((toolkit, idx) => (
                                    <motion.div
                                        key={toolkit._id}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 40 }}
                                        transition={{ duration: 0.5, delay: idx * 0.08 }}
                                    >
                                        <Card className="glass glass-hover border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-transform hover:-translate-y-2 hover:shadow-primary/30 bg-gradient-to-br from-[#18181B]/80 to-[#23272F]/90 backdrop-blur-lg">
                                            <div className="relative w-full h-48 bg-black/20">
                                                {toolkit.imageUrls && toolkit.imageUrls.length > 0 ? (
                                                    <Image
                                                        src={toolkit.imageUrls[0]}
                                                        alt={toolkit.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-gray-400 text-2xl">No Image</div>
                                                )}
                                            </div>
                                            <div className="p-6">
                                                <h2 className="text-2xl font-semibold mb-2 text-white/90 truncate">
                                                    {toolkit.name}
                                                </h2>
                                                <p className="text-gray-300 text-sm mb-3 line-clamp-2 min-h-[2.5em]">{toolkit.shortDescription || toolkit.description}</p>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {toolkit.tags && toolkit.tags.split(",").map((tag) => (
                                                        <span
                                                            key={tag.trim()}
                                                            className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-primary/10"
                                                        >
                                                            {tag.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex items-center justify-between mt-4">
                                                    <span className="text-xl font-bold text-primary drop-shadow">
                                                        ${toolkit.price}
                                                    </span>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="border-primary text-primary hover:bg-primary/10 transition-colors"
                                                    >
                                                        Edit
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </AnimatePresence>
                        {toolkits.length === 0 && (
                            <div className="text-center text-gray-400 mt-20 text-lg animate-fade-in">
                                No toolkits found. Click "Add Toolkit" to get started!
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
