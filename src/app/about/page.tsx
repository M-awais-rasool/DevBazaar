"use client";
import Navigation from "@/component/landingPage/Navigation";
import Footer from "@/component/footer/Footer";
import Image from "next/image";
import { motion } from "framer-motion";

const aboutImages = [
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
];

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeInOut" as const } },
};

const stagger = {
    visible: { transition: { staggerChildren: 0.2 } },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-black">
            <Navigation />
            <main className="flex-1 flex flex-col items-center justify-center px-4 pt-32">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="max-w-3xl text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#23C660] to-[#1B1B1B] bg-clip-text text-transparent mb-4 animate-fade-in">
                        About DevBazaar
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground animate-fade-in delay-200">
                        DevBazaar is a vibrant marketplace empowering developers to discover, share, and monetize SaaS toolkits. Our mission is to foster innovation and collaboration in the developer community by providing a platform where creativity meets opportunity.
                    </p>
                </motion.div>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full mb-16"
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                >
                    {aboutImages.map((src, idx) => (
                        <motion.div
                            key={src}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05, boxShadow: "0 8px 32px 0 rgba(35,198,96,0.25)" }}
                            className="rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-[#23272f]/60 animate-fade-in"
                        >
                            <Image
                                src={src}
                                alt={`About DevBazaar ${idx + 1}`}
                                width={600}
                                height={400}
                                className="object-cover w-full h-64 md:h-72 transition-transform duration-500"
                                loading="lazy"
                            />
                        </motion.div>
                    ))}
                </motion.div>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="max-w-2xl mx-auto text-center animate-fade-in"
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-[#23C660] to-[#1B1B1B] bg-clip-text text-transparent">
                        Our Vision
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground mb-6">
                        We believe in making software development accessible and profitable for everyone. Whether you are a creator, seller, or buyer, DevBazaar is your gateway to a world of innovative SaaS solutions.
                    </p>
                    <motion.div
                        className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8"
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                    >
                        <motion.div
                            variants={fadeInUp}
                            className="p-6 rounded-xl bg-[#18181b]/80 border border-white/10 shadow-md animate-fade-in"
                        >
                            <h3 className="font-semibold text-lg mb-2 text-[#23C660]">For Developers</h3>
                            <p className="text-sm text-muted-foreground">
                                Showcase your toolkits, reach a global audience, and earn from your creations.
                            </p>
                        </motion.div>
                        <motion.div
                            variants={fadeInUp}
                            className="p-6 rounded-xl bg-[#18181b]/80 border border-white/10 shadow-md animate-fade-in"
                        >
                            <h3 className="font-semibold text-lg mb-2 text-[#23C660]">For Buyers</h3>
                            <p className="text-sm text-muted-foreground">
                                Discover high-quality SaaS toolkits to accelerate your projects and business.
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>
                <Footer />
            </main>
            <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
        </div>
    );
}
