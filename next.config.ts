import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "nextshines.s3.eu-north-1.amazonaws.com",
      "images.unsplash.com",
    ],
  },
  /* config options here */
};

export default nextConfig;
