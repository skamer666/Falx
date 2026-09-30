import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Les demandes clients peuvent contenir jusqu'à 5 fichiers de 10 Mo.
    serverActions: { bodySizeLimit: "55mb" },
  },
};

export default nextConfig;
