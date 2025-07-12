
"use client";

import { motion } from "framer-motion";
import Footer from "@/component/footer/Footer";
import Navigation from "@/component/landingPage/Navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const terms = [
    {
        title: "Acceptance of Terms",
        content:
            "By accessing or using DevBazaar, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our platform.",
    },
    {
        title: "User Responsibilities",
        content:
            "You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree not to misuse the platform or engage in any unlawful activities.",
    },
    {
        title: "Intellectual Property",
        content:
            "All content, trademarks, and data on this site, including but not limited to software, databases, text, graphics, icons, and hyperlinks are the property of DevBazaar or its licensors.",
    },
    {
        title: "Purchases & Refunds",
        content:
            "All purchases are final. Please review product details carefully before buying. Refunds are only issued in cases of proven fraud or technical errors.",
    },
    {
        title: "Limitation of Liability",
        content:
            "DevBazaar is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform.",
    },
    {
        title: "Changes to Terms",
        content:
            "We reserve the right to update these Terms at any time. Continued use of the platform after changes constitutes acceptance of the new Terms.",
    },
    {
        title: "Contact Us",
        content:
            "If you have any questions about these Terms, please contact us at support@devbazaar.com.",
    },
];

export default function TermsOfServicePage() {
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
        <div className="min-h-screen bg-black text-gray-200 flex flex-col">
            <Navigation />
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="flex-1 flex flex-col items-center justify-center px-4 pt-32 relative"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0A0A0A] via-[#18181B] to-[#23272F]"
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="max-w-3xl w-full mx-auto bg-[#18181B]/80 border border-white/10 rounded-2xl shadow-xl p-8 md:p-12 backdrop-blur-lg relative z-10"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold mb-6 text-white text-center tracking-tight"
                    >
                        Terms of Service
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-lg text-gray-400 mb-10 text-center"
                    >
                        Please read these terms carefully before using DevBazaar.
                    </motion.p>

                    <div className="space-y-8">
                        {terms.map((term, idx) => (
                            <motion.div
                                key={term.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ delay: 0.1 * idx, duration: 0.6 }}
                                className="group"
                            >
                                <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                                    {term.title}
                                </h2>
                                <p className="text-gray-300 text-base leading-relaxed">
                                    {term.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
                <Footer />
            </motion.section>
        </div>
    );
}
