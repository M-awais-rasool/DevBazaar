"use client";

import { motion } from "framer-motion";
import Navigation from "@/component/landingPage/Navigation";
import Footer from "@/component/footer/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const privacySections = [
    {
        title: "Introduction",
        content:
            "At DevBazaar, your privacy is our priority. This Privacy Policy explains how we collect, use, and protect your information when you use our platform.",
    },
    {
        title: "Information We Collect",
        content:
            "We collect information you provide directly, such as your name, email, and profile details. We also collect usage data to improve our services.",
    },
    {
        title: "How We Use Your Information",
        content:
            "Your information helps us personalize your experience, provide customer support, and enhance our platform. We never sell your data to third parties.",
    },
    {
        title: "Cookies & Tracking",
        content:
            "We use cookies and similar technologies to analyze trends, administer the website, and track users’ movements around the site.",
    },
    {
        title: "Data Security",
        content:
            "We implement robust security measures to protect your data. However, no method of transmission over the Internet is 100% secure.",
    },
    {
        title: "Your Rights",
        content:
            "You have the right to access, update, or delete your personal information. Contact us at support@devbazaar.com for any requests.",
    },
    {
        title: "Changes to This Policy",
        content:
            "We may update this Privacy Policy from time to time. We encourage you to review it regularly.",
    },
];

export default function PrivacyPolicyPage() {
    const { data: session, status }: any = useSession();
    const router = useRouter();

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

    return (
        <div className="min-h-screen bg-black text-foreground flex flex-col items-center justify-center">
            <Navigation />
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative container px-4 pt-32 flex flex-col items-center"
            >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0A0A0A] via-[#18181b] to-[#23272f] opacity-95" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="w-full max-w-3xl mx-auto bg-[#101014]/80 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-8 md:p-12 relative z-10"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl font-bold mb-6 text-center text-white tracking-tight"
                    >
                        Privacy Policy
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg text-gray-300 mb-10 text-center"
                    >
                        Your privacy matters. Learn how we handle your data at DevBazaar.
                    </motion.p>

                    <div className="space-y-8">
                        {privacySections.map((section, idx) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + idx * 0.1 }}
                                className="rounded-xl bg-[#18181b]/80 border border-white/10 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <h2 className="text-2xl font-semibold text-white mb-2 flex items-center gap-2">
                                    <span className="inline-block w-2 h-2 rounded-full bg-[#23C660] animate-pulse" />
                                    {section.title}
                                </h2>
                                <p className="text-gray-300 text-base leading-relaxed">{section.content}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
                <Footer />
            </motion.section>
        </div>
    );
}
