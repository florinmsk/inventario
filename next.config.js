/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'vcvxzsoipykfyvpbnwwt.supabase.co',
            },
            {
                protocol: 'https',
                hostname: 'img.freepik.com',
            },
        ],
    },
};

module.exports = nextConfig;
