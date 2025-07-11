"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ToolkitCard } from "@/component/landingPage/ToolkitsShowcase";
import FilterBar from "@/component/filterBar/FilterBar";
import Navigation from "@/component/landingPage/Navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function ViewAllPage() {
  const { data: session, status }: any = useSession();
  const router = useRouter();
  const [toolkits, setToolkits] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    if (session?.user?.role === "seller") {
      router.replace("/seller");
    } else if (session?.user?.role === "admin") {
      router.push("/admin");
    }
  }, [session, status, router]);

  if (status === "loading" || session?.user?.role === "seller" || session?.user?.role === "admin") {
    return null;
  }

  useEffect(() => {
    const fetchToolkits = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) params.append(key, String(value));
        });
        const res = await fetch(`/api/toolkits/filter?${params.toString()}`);
        const data = await res.json();
        setToolkits(data.toolkits || []);
      } catch (err) {
        setToolkits([]);
      } finally {
        setLoading(false);
      }
    };
    fetchToolkits();
  }, [filters]);

  return (
    <div className="min-h-screen bg-black text-foreground flex flex-col items-center justify-center">
      <Navigation />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl md:text-6xl font-normal mb-8 mt-10 text-center"
      >
        Explore{" "}
        <span className="text-gradient font-medium">All Toolkits</span>
      </motion.h1>
      <FilterBar onFilter={setFilters} />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-opacity-50"></span>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl"
        >
          {toolkits.length === 0 ? (
            <div className="col-span-full text-center text-gray-400">
              No toolkits found.
            </div>
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
        </motion.div>
      )}
    </div>
  );
}

export default ViewAllPage;
