/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // TODO: sustituir por el dominio real donde se alojen las fotos de
    // antes/después (Supabase Storage, Cloudinary, etc.) cuando existan.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
