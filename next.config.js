/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  nextConfig,
};
