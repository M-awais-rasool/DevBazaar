"use client";

import { motion } from "framer-motion";
import { Button } from "@/component/ui/button";
import { CardSpotlight } from "./CardSpotlight";
import { useRouter } from "next/navigation";

export const PricingSection = () => {
  const router = useRouter();
  return (
    <section className="container px-4 py-24">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-normal mb-6"
        >
          All Toolkits Are{" "}
          <span className="text-gradient font-medium">Free</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-lg text-gray-400"
        >
          Enjoy unlimited access to every developer toolkit on our marketplace—no
          subscriptions, no fees, just free resources for everyone.
        </motion.p>
      </div>
      <div className="max-w-3xl mx-auto">
        <CardSpotlight className="p-8 flex flex-col items-center border-white/10 border-2">
          <h3 className="text-2xl font-semibold mb-4 text-primary">
            Start Exploring Now
          </h3>
          <p className="text-gray-300 mb-6 text-center max-w-xl">
            Browse, download, and use any toolkit you like. Our mission is to
            empower developers by making high-quality resources accessible to
            all—completely free of charge.
          </p>
          <Button className="button-gradient px-8 py-3 text-lg" onClick={() => router.push('/viewAll')}>
            Browse Toolkits
          </Button>
        </CardSpotlight>
      </div>
    </section>
  );
};