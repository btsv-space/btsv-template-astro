// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import remarkStripComments from './src/plugins/remark-strip-comments.mjs';

export default defineConfig({
	integrations: [mdx()],
	markdown: {
		processor: unified({
			remarkPlugins: [remarkStripComments]
		})
	}
});
