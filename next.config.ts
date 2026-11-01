import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Guarantees local and static images work across all hosting environments
  },
  async redirects() {
    return [
      {
        source: "/anasayfa.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/atakım.html",
        destination: "/takim",
        permanent: true,
      },
      {
        source: "/iletişim.html",
        destination: "/iletisim",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
