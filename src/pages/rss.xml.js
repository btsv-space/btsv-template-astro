import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../site.config';

export async function GET(context) {
	const posts = await getCollection('posts', ({ data }) => !data.draft && !data.page);

	return rss({
		title: site.name,
		description: site.description || `A blog powered by ${site.name}`,
		site: context.site || site.url,
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
		customData: `<language>${site.lang}</language>`
	});
}
