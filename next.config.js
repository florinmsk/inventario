/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ['lh3.googleusercontent.com', 'vcvxzsoipykfyvpbnwwt.supabase.co'],
    },
};

module.exports = nextConfig;
