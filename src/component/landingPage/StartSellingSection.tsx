"use client";

import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Users, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export const StartSellingSection = () => {
  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Earn Passive Income",
      description: "Monetize your development skills and earn from every sale"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Global Reach",
      description: "Access thousands of developers worldwide looking for solutions"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Growing Market",
      description: "Join the fastest-growing marketplace for developer tools"
    }
  ];

  return (
    <section className="container px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-normal mb-6">
              Have a great toolkit?{" "}
              <span className="text-gradient font-medium">Start selling in minutes</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Turn your development expertise into a thriving business. Upload your toolkits, 
              set your price, and start earning from day one.
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
                Sell Your Toolkit
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side - Illustration/Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            <div className="glass rounded-2xl p-8 border-white/10">
              <div className="space-y-6">
                {/* Earnings Chart Simulation */}
                <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Monthly Earnings</h3>
                  <div className="flex items-end gap-2 h-24">
                    <div className="bg-primary/60 rounded w-6 h-8"></div>
                    <div className="bg-primary/70 rounded w-6 h-12"></div>
                    <div className="bg-primary/80 rounded w-6 h-16"></div>
                    <div className="bg-primary/90 rounded w-6 h-20"></div>
                    <div className="bg-primary rounded w-6 h-24"></div>
                  </div>
                  <p className="text-2xl font-bold mt-4 text-primary">$3,247</p>
                  <p className="text-sm text-gray-400">+24% from last month</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass rounded-lg p-4">
                    <p className="text-2xl font-bold text-green-400">142</p>
                    <p className="text-sm text-gray-400">Total Sales</p>
                  </div>
                  <div className="glass rounded-lg p-4">
                    <p className="text-2xl font-bold text-blue-400">4.8★</p>
                    <p className="text-sm text-gray-400">Avg Rating</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-gray-300">Recent Sales</h4>
                  {['NextJS SaaS Kit - $49', 'React Dashboard - $39', 'API Microservice - $29'].map((sale, i) => (
                    <div key={i} className="flex justify-between items-center p-2 glass rounded">
                      <span className="text-sm">{sale.split(' - ')[0]}</span>
                      <span className="text-sm text-primary font-semibold">{sale.split(' - ')[1]}</span>
                    </div>
                  ))}
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