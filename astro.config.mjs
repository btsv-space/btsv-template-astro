// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from '@tailwindcss/vite';
import { stripComments } from './src/plugins/strip-comments.mjs';

export default defineConfig({
	integrations: [mdx()],
	vite: {
		plugins: [tailwindcss()]
	},
	markdown: {
		processor: satteri({
			mdastPlugins: [stripComments]
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
