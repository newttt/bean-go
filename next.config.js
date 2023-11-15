const rewrites = require('./rewrites');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return rewrites;
    },
}

module.exports = nextConfig
