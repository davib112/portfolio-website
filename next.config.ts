import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: 'export',
	distDir: 'build',
	basePath: '/portfolio-website',
	assetPrefix: '/portfolio-website/', // include extra folder
};

export default nextConfig;
