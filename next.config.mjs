const SERVER_URL = process.env.SERVER_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.fallback = {
      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,
      net: false,
      dns: false,
      tls: false,
      fs: false, // the solution
    };

    return config;
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: "/api/:path*",
          destination: `${SERVER_URL}/:path*`, // Optional: Update the destination URL if needed
        },
      ],
    };
  },
};

export default nextConfig;
