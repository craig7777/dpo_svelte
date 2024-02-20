import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
		  '/dpo-api': {
			target: 'https://secure.3gdirectpay.com',
			changeOrigin: true,
		  },
		},
	  }
});
