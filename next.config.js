/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "offcial-website-blog-assets.s3.ap-northeast-1.amazonaws.com",
        pathname: "/**/*",
      },
    ],
  },
};

module.exports = nextConfig;
