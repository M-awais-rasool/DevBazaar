import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "nextshines.s3.eu-north-1.amazonaws.com",
      "images.unsplash.com",
      "s3.eu-west-1.amazonaws.com", // add other domains as needed
      "img.freepik.com",
    ],
  },
  /* config options here */
};

export default nextConfig;
