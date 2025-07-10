import React from "react";
import Link from "next/link";
import { Button } from "@/component/ui/button";
import { Card } from "@/component/ui/card";

// Dummy data for demonstration
const toolkits = [
    {
        id: 1,
        name: "NextJS SaaS Starter",
        tags: ["NextJS", "SaaS", "Stripe"],
        price: 49,
        image: "/banner.png",
    },
    {
        id: 2,
        name: "React Dashboard Kit",
        tags: ["React", "Dashboard", "Admin"],
        price: 59,
        image: "/vercel.svg",
    },
];

export default function ToolkitListPage() {
    return (
        <div className="min-h-screen text-white py-16 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-4xl font-bold">Your Toolkits</h1>
                    <Link href="/seller/toolkit/addToolkit">
                        <Button className="button-gradient text-lg px-6 py-2 rounded-lg shadow-lg">
                            + Add Toolkit
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {toolkits.map((toolkit) => (
                        <Card
                            key={toolkit.id}
                            className="glass glass-hover border-white/10 rounded-xl overflow-hidden shadow-xl transition-transform hover:-translate-y-2"
                        >
                            <img
                                src={toolkit.image}
                                alt={toolkit.name}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold mb-2">
                                    {toolkit.name}
                                </h2>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {toolkit.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-xl font-bold text-primary">
                                        ${toolkit.price}
                                    </span>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-primary text-primary"
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
                {toolkits.length === 0 && (
                    <div className="text-center text-gray-400 mt-20 text-lg">
                        No toolkits found. Click "Add Toolkit" to get started!
                    </div>
                )}
            </div>
        </div>
    );
}
