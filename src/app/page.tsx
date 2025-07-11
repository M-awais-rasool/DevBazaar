"use client";

import { motion } from "framer-motion";
import { ArrowRight, Command } from "lucide-react";
import { Button } from "@/component/ui/button";
import { TextGenerateEffect } from "@/component/ui/text-generate-effect";
import Navigation from "@/component/landingPage/Navigation";
import Image from "next/image";
import LogoCarousel from "@/component/landingPage/LogoCarousel";
import { ToolkitsShowcase } from "@/component/landingPage/ToolkitsShowcase";
import { HowItWorksSection } from "@/component/landingPage/HowItWorksSection";
import { PricingSection } from "@/component/landingPage/PricingSection";
import { StartSellingSection } from "@/component/landingPage/StartSellingSection";
import Footer from "@/component/footer/Footer";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Index = () => {
  const { data: session, status }:any = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.role === "seller") {
      router.replace("/seller");
    }
  }, [session, status, router]);

  if (status === "loading" || session?.user?.role === "seller") {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-foreground flex flex-col items-center justify-center">
      <Navigation />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative container px-4 pt-40 pb-20"
      >
        {/* Background */}
        <div
          className="absolute inset-0 -z-10 bg-[#0A0A0A]"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full glass"
        >
          <span className="text-sm font-medium">
            <Command className="w-4 h-4 inline-block mr-2" />
            SaaS Marketplace for Developers
          </span>
        </motion.div>

        <div className="max-w-4xl relative z-10">
          <h1 className="text-5xl md:text-7xl font-normal mb-4 tracking-tight text-left">
            <span className="text-gray-200">
              <TextGenerateEffect words="Build Faster with" />
            </span>
            <br />
            <span className="text-white font-medium">
              <TextGenerateEffect words="Ready-to-Use Developer Toolkits" />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl text-left"
          >
            Discover production-ready microservices, full-stack starters, and SaaS-ready kits from real developers.{" "}
            <span className="text-white">Start building in minutes.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <Button size="lg" className="button-gradient">
              Explore Toolkits
            </Button>
            <Button size="lg" variant="link" className="text-white">
              Sell Yours <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative mx-auto max-w-5xl mt-20 flex justify-center"
        >
          <div className="glass rounded-xl overflow-hidden aspect-square w-full md:w-4/4 lg:w-3/4 mx-auto">
            <div className="relative w-full h-full">
              <Image
                src="/banner.png"
                alt="Example image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 66vw"
              />
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Logo Carousel */}
      <LogoCarousel />

      {/* Features Section */}
      <div id="features" className="bg-black flex flex-col items-center">
        {/* <FeaturesSection /> */}
      </div>

      {/* Popular Toolkits Showcase */}
      <div className="bg-black flex flex-col items-center">
        <ToolkitsShowcase />
      </div>

      {/* How It Works Section */}
      <div className="bg-black flex flex-col items-center">
        <HowItWorksSection />
      </div>

      {/* Start Selling Section */}
      <div className="bg-black flex flex-col items-center">
        <StartSellingSection />
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="bg-black flex flex-col items-center">
        <PricingSection />
      </div>

      <section className="container px-4 py-20 relative bg-black ">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'url("/lovable-uploads/21f3edfb-62b5-4e35-9d03-7339d803b980.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0A0A0A]/80 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to build faster?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers who have already accelerated their development with our toolkit marketplace.
          </p>
          <Button size="lg" className="button-gradient" onClick={() => router.push('/login')}>
            Get Started
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <div className="bg-black flex flex-col items-center">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
