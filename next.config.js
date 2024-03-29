/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	compiler: {
		styledComponents: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
