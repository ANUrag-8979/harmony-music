/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      port: '',
      pathname: '/:path*',
    },
  ],
}

};

export default nextConfig;
