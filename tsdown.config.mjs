import { defineConfig } from 'tsdown'

export default defineConfig({
	cwd: process.cwd(),
	dts: false,
	entry: ['src/index.ts', 'src/routes/*.ts'],
	outDir: '.dist',
	format: 'esm',
	sourcemap: true,
	// unbundle: true,
})
