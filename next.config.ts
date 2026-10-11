import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Métadonnées (titre, description, canonical, hreflang) toujours dans le <head> du HTML initial, pour tous les
  // visiteurs et robots : sans ça, Googlebot et les navigateurs les reçoivent en fin de <body> (streaming metadata).
  htmlLimitedBots: /.*/,
  experimental: {
    // Les demandes clients peuvent contenir jusqu'à 5 fichiers de 10 Mo.
    serverActions: { bodySizeLimit: "55mb" },
  },
};

export default nextConfig;
