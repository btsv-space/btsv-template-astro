import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { postsSchema } from './posts.schema.generated';

const posts = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
	schema: postsSchema,
});

export const collections = { posts };
