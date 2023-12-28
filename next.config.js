/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.printify.com",
      "pfy-prod-image-storage.s3.us-east-2.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
