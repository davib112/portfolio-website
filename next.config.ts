import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
	output: 'export',
	distDir: 'build',
	basePath: isProd ? '/portfolio-website' : '',
	assetPrefix: isProd ? '/portfolio-website/': '', // include extra folder
};

export default nextConfig;
