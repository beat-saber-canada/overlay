import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {	
	let file_env = loadEnv(mode, process.cwd(), 'OVERLAY');

	return {
		optimizeDeps: {
			exclude: ['@urql/svelte']
		},
		plugins: [sveltekit()],
		//! this is a hack that exposes parts of process.env to the client
		//! it's only used for non-sensitive data, so that they can be configured while in a docker container
		define: {
			'import.meta.env.OVERLAY_RELAY_URL': JSON.stringify( process.env.OVERLAY_RELAY_URL ?? file_env.OVERLAY_RELAY_URL),
		}
	}
});
