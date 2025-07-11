"use client";
import Navigation from "@/component/landingPage/Navigation";
import Footer from "@/component/footer/Footer";
import { motion } from "framer-motion";

const blogs = [
	{
		title: "How to Build a SaaS Toolkit Marketplace",
		description:
			"A step-by-step guide to launching your own SaaS toolkit marketplace and empowering developers.",
		image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
		author: "Jane Doe",
		date: "July 10, 2025",
		tags: ["SaaS", "Marketplace", "Guide"],
	},
	{
		title: "Top 10 Tools Every Developer Should Know",
		description:
			"Discover the essential tools that can supercharge your productivity as a developer in 2025.",
		image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
		author: "John Smith",
		date: "July 8, 2025",
		tags: ["Productivity", "Tools", "Developers"],
	},
	{
		title: "Designing for Developers: UI/UX Tips",
		description:
			"Learn how to create beautiful and functional interfaces that developers will love.",
		image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
		author: "Emily Clark",
		date: "July 5, 2025",
		tags: ["Design", "UI/UX", "Tips"],
	},
	{
		title: "Scaling Your SaaS Product: Best Practices",
		description:
			"Explore proven strategies for scaling your SaaS product to thousands of users.",
		image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
		author: "Michael Lee",
		date: "July 2, 2025",
		tags: ["SaaS", "Scaling", "Best Practices"],
	},
];

const fadeInUp = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, type: "spring" as const },
	},
};

export default function BlogPage() {
	return (
		<div className="min-h-screen flex flex-col bg-black">
			<Navigation />
			<main className="flex-1 container mx-auto px-4 pt-32">
				<motion.h1
					initial={{ opacity: 0, y: -40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, type: "spring" }}
					className="text-4xl md:text-5xl font-bold text-gradient text-center mb-4"
				>
					DevBazaar Blog
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.7 }}
					className="text-lg text-muted-foreground text-center mb-12"
				>
					Insights, guides, and stories for developers and SaaS founders.
				</motion.p>
				<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
					{blogs.map((blog, i) => (
						<motion.div
							key={blog.title}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.3 }}
							variants={fadeInUp}
							className="rounded-2xl overflow-hidden shadow-lg glass glass-hover group relative hover:scale-[1.03] transition-transform duration-300"
							transition={{ delay: i * 0.15 }}
						>
							<div className="overflow-hidden h-56">
								<motion.img
									src={blog.image}
									alt={blog.title}
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
									initial={{ scale: 1 }}
									whileHover={{ scale: 1.1 }}
								/>
							</div>
							<div className="p-6 flex flex-col gap-2">
								<div className="flex gap-2 mb-2">
									{blog.tags.map((tag) => (
										<span
											key={tag}
											className="px-2 py-1 text-xs rounded-full bg-[#23C660]/10 text-[#23C660] font-semibold"
										>
											{tag}
										</span>
									))}
								</div>
								<h2 className="text-2xl font-bold mb-1 group-hover:text-gradient transition-all duration-300">
									{blog.title}
								</h2>
								<p className="text-muted-foreground mb-3">
									{blog.description}
								</p>
								<div className="flex items-center justify-between text-xs text-muted-foreground">
									<span>By {blog.author}</span>
									<span>{blog.date}</span>
								</div>
							</div>
						</motion.div>
					))}
				</div>
                <Footer />
			</main>
			
		</div>
	);
}
