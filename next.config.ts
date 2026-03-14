import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
	output: 'export',
	distDir: 'build',
	basePath: '',
	assetPrefix: '',
	env: {
		NEXT_PUBLIC_BASE_PATH: '',
	}

	//basePath: isProd ? '/portfolio-website' : '',
	//assetPrefix: isProd ? '/portfolio-website/': '', // include extra folder
	//env:{
	//	NEXT_PUBLIC_BASE_PATH: isProd ? '/portfolio-website' : '',
	//}
};

export default nextConfig;
