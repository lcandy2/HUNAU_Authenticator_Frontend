const API_BASE_URL = "http://192.168.43.162:8080";

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: API_BASE_URL + '/:path*',
            },
        ];
    }
}

module.exports = nextConfig
