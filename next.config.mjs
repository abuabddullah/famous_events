/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        // hostname: "*", // for any website
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
