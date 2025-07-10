"use client";

import { motion } from "framer-motion";
import { Star, Download, ExternalLink } from "lucide-react";
import { Button } from "..//ui/button";
import { Card, CardContent } from "../ui/card";

const ToolkitCard = ({
  title,
  description,
  rating,
  downloads,
  price,
  image,
  delay,
}: {
  title: string;
  description: string;
  rating: number;
  downloads: string;
  price: string;
  image: string;
  delay: number;
}) => (
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
          <Button size="sm" className="button-gradient">
            View Toolkit <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export const ToolkitsShowcase = () => {
  const toolkits = [
    {
      title: "NextJS SaaS Starter",
      description: "Complete SaaS boilerplate with authentication, payments, and dashboard. Built with NextJS, Stripe, and Supabase.",
      rating: 4.9,
      downloads: "2.1k",
      price: "$49",
      image: "/lovable-uploads/86329743-ee49-4f2e-96f7-50508436273d.png"
    },
    {
      title: "React E-commerce Kit",
      description: "Full-featured e-commerce solution with cart, checkout, and admin panel. Includes payment integration and inventory management.",
      rating: 4.8,
      downloads: "1.8k",
      price: "$79",
      image: "/lovable-uploads/7335619d-58a9-41ad-a233-f7826f56f3e9.png"
    },
    {
      title: "Node.js API Microservice",
      description: "Production-ready REST API with JWT auth, rate limiting, and MongoDB integration. Docker-ready with full documentation.",
      rating: 4.7,
      downloads: "3.2k",
      price: "$39",
      image: "/lovable-uploads/b6436838-5c1a-419a-9cdc-1f9867df073d.png"
    },
    {
      title: "React Dashboard Template",
      description: "Modern admin dashboard with charts, tables, and user management. Responsive design with dark/light mode support.",
      rating: 4.6,
      downloads: "1.5k",
      price: "$59",
      image: "/lovable-uploads/79f2b901-8a4e-42a5-939f-fae0828e0aef.png"
    },
    {
      title: "Vue.js Portfolio Kit",
      description: "Stunning portfolio template for developers and agencies. Includes project showcase, contact forms, and animations.",
      rating: 4.8,
      downloads: "890",
      price: "$29",
      image: "/lovable-uploads/a2c0bb3a-a47b-40bf-ba26-d79f2f9e741b.png"
    },
    {
      title: "Python Django CRM",
      description: "Complete customer relationship management system with lead tracking, email integration, and reporting features.",
      rating: 4.9,
      downloads: "1.2k",
      price: "$89",
      image: "/lovable-uploads/e143cef1-4ad0-404b-b47a-147e89bc017c.png"
    }
  ];

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {toolkits.map((toolkit, index) => (
          <ToolkitCard
            key={toolkit.title}
            {...toolkit}
            delay={index * 0.1}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center mt-12"
      >
        <Button size="lg" variant="outline" className="glass border-white/20">
          View All Toolkits <ExternalLink className="ml-2 w-4 h-4" />
        </Button>
      </motion.div>
    </section>
  );
};