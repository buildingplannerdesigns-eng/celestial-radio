const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace to this app folder so Next does not walk up to a parent lockfile.
  turbopack: {
    root: path.resolve(__dirname),
  },
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  devIndicators: false,
};

module.exports = nextConfig;
