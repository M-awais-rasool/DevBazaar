"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Download, ExternalLink } from "lucide-react";
import { Button } from "..//ui/button";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";

export const ToolkitCard = ({
  title,
  description,
  rating,
  downloads,
  price,
  image,
  delay,
  id,
}: {
  title: string;
  description: string;
  rating: number;
  downloads: string;
  price: string;
  image: string;
  delay: number;
  id: string;
}) => {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="group"
    >
      <Card className="glass glass-hover border-white/10 overflow-hidden h-full">
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-300">{rating}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <Download className="w-4 h-4" />
              <span>{downloads}</span>
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">{price}</span>
            <Button size="sm" className="button-gradient" onClick={() => router.push(`/toolkitDetail/${id}`)}>
              View Toolkit <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const ToolkitsShowcase = () => {
  const [toolkits, setToolkits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchToolkits = async () => {
      try {
        const res = await fetch("/api/toolkits");
        const data = await res.json();
        setToolkits(data.toolkits || []);
      } catch (err) {
        setToolkits([]);
      } finally {
        setLoading(false);
      }
    };
    fetchToolkits();
  }, []);

  return (
    <section className="container px-4 py-24">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-normal mb-6"
        >
          Popular{" "}
          <span className="text-gradient font-medium">Toolkits</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-lg text-gray-400"
        >
          Discover the most popular developer toolkits trusted by thousands of developers
        </motion.p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-opacity-50"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {toolkits.length === 0 ? (
            <div className="col-span-full text-center text-gray-400">No toolkits found.</div>
          ) : (
            toolkits.map((toolkit, index) => (
              <ToolkitCard
                key={toolkit._id}
                id={toolkit._id}
                title={toolkit.name}
                description={toolkit.shortDescription || toolkit.description}
                rating={4.8}
                downloads={"-"}
                price={toolkit.price ? `$${toolkit.price}` : "Free"}
                image={toolkit.imageUrls && toolkit.imageUrls.length > 0 ? toolkit.imageUrls[0] : "/banner.png"}
                delay={index * 0.1}
              />
            ))
          )}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center mt-12"
      >
        <Button size="lg" variant="outline" className="glass border-white/20" onClick={()=> router.push('/viewAll')}>
          View All Toolkits <ExternalLink className="ml-2 w-4 h-4" />
        </Button>
      </motion.div>
    </section>
  );
};