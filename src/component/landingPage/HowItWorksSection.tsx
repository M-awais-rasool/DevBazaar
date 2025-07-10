"use client";

import { motion } from "framer-motion";
import { Search, ShoppingCart, Code } from "lucide-react";

const Step = ({
  number,
  icon,
  title,
  description,
  delay,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="relative text-center group"
  >
    <div className="mb-6">
      <div className="relative mx-auto w-24 h-24 glass glass-hover rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold">
          {number}
        </span>
        <div className="text-primary">
          {icon}
        </div>
      </div>
    </div>
    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
      {title}
    </h3>
    <p className="text-gray-400 max-w-sm mx-auto">
      {description}
    </p>
  </motion.div>
);

export const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      icon: <Search className="w-8 h-8" />,
      title: "Browse Toolkits",
      description: "Explore our curated collection of production-ready developer toolkits, microservices, and boilerplates."
    },
    {
      number: "2",
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "Buy and Download Instantly",
      description: "Secure payment processing with immediate access to your purchased toolkit and complete documentation."
    },
    {
      number: "3",
      icon: <Code className="w-8 h-8" />,
      title: "Use in Your App",
      description: "Integrate the toolkit into your project with our step-by-step guides and start building faster than ever."
    }
  ];

  return (
    <section className="container px-4 py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-normal mb-6"
        >
          How It{" "}
          <span className="text-gradient font-medium">Works</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-lg text-gray-400"
        >
          Get started with DevSaaS Toolkit Store in three simple steps
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <Step
            key={step.number}
            {...step}
            delay={index * 0.2}
          />
        ))}
      </div>

      {/* Connecting lines for desktop */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="relative h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 blur-sm" />
        </motion.div>
      </div>
    </section>
  );
};