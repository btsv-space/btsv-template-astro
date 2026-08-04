import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { postsSchema } from './posts.schema.generated';

const posts = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
	schema: postsSchema,
});

export const collections = { posts };
