import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
    allowedDevOrigins: [
      "3000-fe2466d3-071f-4e32-8df5-70a71ff9ac8b.orchids.cloud",
      "3000-a2b415e2-f7db-46bd-81bc-d76a0f4d8419.orchids.cloud",
      "3000-a2b415e2-f7db-46bd-81bc-d76a0f4d8419.proxy.daytona.works",
      "localhost:3000"
    ],
    serverExternalPackages: ["bcrypt"],
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    experimental: {
      serverActions: {
        allowedOrigins: [
          "3000-fe2466d3-071f-4e32-8df5-70a71ff9ac8b.orchids.cloud",
          "3000-a2b415e2-f7db-46bd-81bc-d76a0f4d8419.orchids.cloud",
          "3000-a2b415e2-f7db-46bd-81bc-d76a0f4d8419.proxy.daytona.works",
          "localhost:3000"
        ],
      },
    },
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        loaders: [LOADER]
      }
    }
  }
};

export default nextConfig;
// Orchids restart: 1767951249079
