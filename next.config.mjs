/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            hostname:'lh3.googleusercontent.com'
        }],
    },
    experimental:{
        serverActions:{
            allowedOrigins: ["learn-language.techresonance.com"],
        }
    }
};

export default nextConfig;
