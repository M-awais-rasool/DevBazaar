"use client";

import { motion } from "framer-motion";
import { Users, Gift, Globe, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export const StartSellingSection = () => {
  const benefits = [
    {
      icon: <Gift className="w-6 h-6" />, 
      title: "Share Your Toolkit",
      description: "Help fellow developers by sharing your best solutions for free."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Grow the Community",
      description: "Contribute to a thriving ecosystem and make an impact."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Recognition",
      description: "Reach developers worldwide and build your reputation."
    }
  ];

  return (
    <section className="container px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-normal mb-6">
              Have a great toolkit?{" "}
              <span className="text-gradient font-medium">Share it with the world for free</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Empower other developers by making your toolkits accessible to everyone. Upload your creations and become a valued contributor to the community.
            </p>

            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 glass rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Button size="lg" className="button-gradient">
                Share Your Toolkit
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            <div className="glass rounded-2xl p-8 border-white/10 flex flex-col items-center justify-center min-h-[340px]">
              <div className="flex flex-col items-center space-y-4">
                <Gift className="w-16 h-16 text-primary mb-2" />
                <h3 className="text-2xl font-semibold mb-2 text-center">Open Access for All</h3>
                <p className="text-gray-400 text-center max-w-xs">
                  All toolkits are free to use, remix, and share. Join a movement of open collaboration and innovation.
                </p>
                <div className="flex -space-x-3 mt-4">
                  <Users className="w-8 h-8 text-blue-400 bg-white rounded-full p-1 border-2 border-white" />
                  <Globe className="w-8 h-8 text-green-400 bg-white rounded-full p-1 border-2 border-white" />
                  <Gift className="w-8 h-8 text-purple-400 bg-white rounded-full p-1 border-2 border-white" />
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};