import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https", // or "http" if needed
        hostname: "**", // allow any hostname
      },
    ],
  },
};

export default nextConfig;
