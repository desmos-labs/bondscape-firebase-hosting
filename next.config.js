/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: ".next",
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
