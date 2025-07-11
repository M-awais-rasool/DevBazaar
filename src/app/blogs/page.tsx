"use client";
import Navigation from "@/component/landingPage/Navigation";
import Footer from "@/component/footer/Footer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const fadeInUp = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, type: "spring" as const },
	},
};
interface Blog {
	_id: string;
	title: string;
	description: string;
	imageUrl: string;
	author: string;
	tags: string[];
	createdAt: string;
}

export default function BlogPage() {
	const { data: session, status }: any = useSession();
	const router = useRouter();

	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [loading, setLoading] = useState(true);

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

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const res = await fetch("/api/blogs");
				const data = await res.json();
				setBlogs(data.blogs || []);
			} catch (err) {
				setBlogs([]);
			} finally {
				setLoading(false);
			}
		};
		fetchBlogs();
	}, []);

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
				{loading ? (
					<div className="flex justify-center items-center h-64">
						<span className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-opacity-50"></span>
					</div>
				) : blogs.length === 0 ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="text-center text-gray-400 mt-20"
					>
						No blogs found.
					</motion.div>
				) : (
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
										src={blog.imageUrl}
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
										{new Date(blog.createdAt).toLocaleDateString()}
									</div>
								</div>
							</motion.div>
						))}
					</div>)}
				<Footer />
			</main>

		</div>
	);
}
