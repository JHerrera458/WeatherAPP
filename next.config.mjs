/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [new URL('https://cdn.weatherapi.com/weather/**')],
    }
};

export default nextConfig;
