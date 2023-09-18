/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: ".next",
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/public/creator.html",
      destination: "/api/creator.js",
    },
  ],
};

module.exports = nextConfig;
