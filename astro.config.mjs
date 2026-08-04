// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from '@tailwindcss/vite';
import { stripComments } from './src/plugins/strip-comments.mjs';
import { directives } from './src/plugins/directives.mjs';

export default defineConfig({
	vite: {
		plugins: [tailwindcss()]
	},
	markdown: {
		processor: satteri({
			mdastPlugins: [stripComments, directives],
			features: { directive: true }
		}),
		syntaxHighlight: 'shiki',
		shikiConfig: {
			themes: {
				light: 'github-light',
				dark: 'github-dark'
			}
		}
	}
});
