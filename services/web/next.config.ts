import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	transpilePackages: ['@app/common'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*',
			},
		],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	output: 'standalone',
}

export default nextConfig
