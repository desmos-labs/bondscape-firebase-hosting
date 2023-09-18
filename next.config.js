/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/public/creator.html",
      destination: "/api/creator.js",
    },
  ],
};

module.exports = nextConfig;
