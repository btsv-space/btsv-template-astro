// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import tailwindcss from '@tailwindcss/vite';
import remarkStripComments from './src/plugins/remark-strip-comments.mjs';

export default defineConfig({
	integrations: [mdx()],
	vite: {
		plugins: [tailwindcss()]
	},
	markdown: {
		processor: unified({
			remarkPlugins: [remarkStripComments]
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
