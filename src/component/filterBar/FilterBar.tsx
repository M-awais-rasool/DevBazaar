"use client";
import { Filter } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

const categories = [
    "All",
    "Frontend",
    "Backend",
    "Fullstack",
    "AI/ML",
    "DevOps",
    "Mobile",
    "UI/UX",
    "Other",
];

const techStacks = [
    "All",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "Django",
    "Flask",
    "Vue",
    "Angular",
    "Other",
];

function FilterBar({ onFilter }: { onFilter: (filters: any) => void }) {
	const [name, setName] = useState("");
	const [category, setCategory] = useState("All");
	const [techStack, setTechStack] = useState("All");
	const [tags, setTags] = useState("");
	const [price, setPrice] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onFilter({
			name,
			category: category === "All" ? undefined : category,
			techStack: techStack === "All" ? undefined : techStack,
			tags,
			price: price || undefined,
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="glass flex flex-wrap gap-4 items-end p-6 rounded-xl mb-10 shadow-lg animate-fade-in"
		>
			<div className="flex-1 min-w-[180px]">
				<label className="block text-sm text-gray-400 mb-1">Name</label>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Search by name..."
					className="w-full px-3 py-2 rounded-lg bg-background border border-white/10 focus:border-primary outline-none transition"
				/>
			</div>
			<div className="flex-1 min-w-[150px]">
				<label className="block text-sm text-gray-400 mb-1">Category</label>
				<select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					className="w-full px-3 py-2 rounded-lg bg-background border border-white/10 focus:border-primary outline-none transition"
				>
					{categories.map((cat) => (
						<option key={cat} value={cat}>
							{cat}
						</option>
					))}
				</select>
			</div>
			<div className="flex-1 min-w-[150px]">
				<label className="block text-sm text-gray-400 mb-1">Tech Stack</label>
				<select
					value={techStack}
					onChange={(e) => setTechStack(e.target.value)}
					className="w-full px-3 py-2 rounded-lg bg-background border border-white/10 focus:border-primary outline-none transition"
				>
					{techStacks.map((tech) => (
						<option key={tech} value={tech}>
							{tech}
						</option>
					))}
				</select>
			</div>
			<div className="flex-1 min-w-[120px]">
				<label className="block text-sm text-gray-400 mb-1">Tags</label>
				<input
					type="text"
					value={tags}
					onChange={(e) => setTags(e.target.value)}
					placeholder="e.g. productivity"
					className="w-full px-3 py-2 rounded-lg bg-background border border-white/10 focus:border-primary outline-none transition"
				/>
			</div>
			<div className="flex-1 min-w-[100px]">
				<label className="block text-sm text-gray-400 mb-1">Price</label>
				<input
					type="text"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					placeholder="e.g. 0, 10, 20"
					className="w-full px-3 py-2 rounded-lg bg-background border border-white/10 focus:border-primary outline-none transition"
				/>
			</div>
			<Button
				type="submit"
				size="lg"
				className="button-gradient flex gap-2 items-center"
			>
				<Filter className="w-5 h-5" /> Filter
			</Button>
		</form>
	);
}

export default FilterBar;
