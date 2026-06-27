import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
	const posts = await getCollection('posts', ({ data }) => !data.draft);

	return rss({
		title: 'btsv',
		description: 'A blog powered by btsv',
		site: context.site || 'https://example.com',
		items: posts
			.sort((a, b) => {
				const aTime = a.data.datePublished?.getTime() ?? 0;
				const bTime = b.data.datePublished?.getTime() ?? 0;
				return bTime - aTime;
			})
			.map((post) => ({
				title: post.data.title,
				description: post.data.description || '',
				pubDate: post.data.datePublished ?? new Date(),
				link: `/${post.data.slug || post.id}/`
			})),
		customData: '<language>en</language>'
	});
}
