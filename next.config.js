/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false, net: false, tle: false};
        config.externals.push("pino-pretty", "lokijs", "encoding");
        return config;
    },
};

module.exports = nextConfig;
