/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ['lh3.googleusercontent.com', 'vcvxzsoipykfyvpbnwwt.supabase.co', 'img.freepik.com'],
    },
};

module.exports = nextConfig;
