import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static export (GitHub Pages preview) is opted into via env so the
  // default build keeps full image optimization for Vercel-style hosting.
  ...(process.env.STATIC_EXPORT === "1" && {
    output: "export" as const,
    basePath,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
