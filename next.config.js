/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: ".next",
  reactStrictMode: true,
  output: "standalone",
  rewrites: async () => [
    {
      source: "/public/creator.html",
      destination: "/api/creator.js",
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipfs.desmos.network",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
