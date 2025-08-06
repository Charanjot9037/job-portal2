// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    config.optimization.splitChunks = false;
    return config;
  },
};

export default nextConfig;
