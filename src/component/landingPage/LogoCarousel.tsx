"use client";

import { motion } from "framer-motion";

const LogoCarousel = () => {
  const logos = [
    "https://bcassetcdn.com/public/blog/wp-content/uploads/2021/10/07203359/australia-tech-map-by-jimjemr-brandcrowd.png", 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaHeVTRR3vAPXTcFBP3r9rIt1cnhoRMPWVCw&s", 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIZ2OOdPyFJiQrZTGd8-DB40rzLYH4Au6kxQ&s", 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8L9PmGM901rpsQ3VVzfXVJM4TBD65cJgl6g&s", 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp0jXPF4B7OArsgO6BBr58cBie5SmX92kHtw&s", 
  ];

  const extendedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="w-full overflow-hidden bg-background/50 backdrop-blur-sm py-12 mt-20">
      <div className="text-center mb-8">
        <p className="text-sm text-muted-foreground">Used by developers and startups worldwide</p>
      </div>
      <motion.div 
        className="flex space-x-16"
        initial={{ opacity: 0, x: "0%" }}
        animate={{
          opacity: 1,
          x: "-50%"
        }}
        transition={{
          opacity: { duration: 0.5 },
          x: {
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 0.5
          }
        }}
        style={{
          width: "fit-content",
          display: "flex",
          gap: "4rem"
        }}
      >
        {extendedLogos.map((logo, index) => (
          <motion.img
            key={`logo-${index}`}
            src={logo}
            alt={`Brand logo ${index + 1}`}
            className="h-20 object-contain rounded shadow-md bg-white" 
            initial={{ opacity: 0.5 }}
            whileHover={{ 
              opacity: 1,
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LogoCarousel;