import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export',
  // Désactive la génération de la source map en production pour gagner en performance
  productionBrowserSourceMaps: false,
  // Optimise les images pour le chargement
  images: {
    unoptimized: true, // Nécessaire pour l'export statique
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  // Améliore la sécurité avec des en-têtes HTTP
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;