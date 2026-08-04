/**
 * Renders Sätteri directives as styled components.
 *
 *   :::callout{type=info} ... :::   ->  callout aside
 *   ::figure{src alt caption}       ->  figure with img + figcaption
 *
 * Directive nodes are only produced when the `directive` parser feature is
 * enabled (see astro.config.mjs). We render by giving each directive node an
 * `hName` + `hProperties` (the documented mechanism for container directives),
 * rather than returning custom node types — Sätteri's markdownToHtml op-stream
 * cannot encode arbitrary replacement node types.
 *
 * Styling lives in src/styles/global.css (plain classes, not Astro-scoped).
 */

const ICONS = { info: 'ℹ️', warning: '⚠️', tip: '💡' };
const LABELS = { info: 'Info', warning: 'Warning', tip: 'Tip' };

export function directives() {
	return {
		name: 'directives',

		containerDirective(node, ctx) {
			if (node.name !== 'callout') return;
			const type = typeof node.attributes?.type === 'string' ? node.attributes.type : 'info';
			ctx.setProperty(node, 'data', {
				hName: 'aside',
				hProperties: {
					className: ['callout', `callout-${type}`],
					role: 'note',
				},
			});
			ctx.setProperty(node, 'children', [
				{
					type: 'html',
					value:
						`<span class="callout-icon">${ICONS[type] ?? 'ℹ️'}</span>` +
						`<span class="callout-label">${LABELS[type] ?? 'Info'}</span>` +
						`<div class="callout-content">`,
				},
				...node.children,
				{ type: 'html', value: '</div>' },
			]);
		},

		leafDirective(node, ctx) {
			if (node.name !== 'figure') return;
			const attrs = node.attributes ?? {};
			const caption = attrs.caption;
			const children = [
				{
					type: 'html',
					value: `<img src="${attrs.src ?? ''}" alt="${attrs.alt ?? ''}" loading="lazy" class="max-w-full h-auto rounded-lg border border-border" />`,
				},
			];
			if (typeof caption === 'string' && caption) {
				children.push({
					type: 'html',
					value: `<figcaption class="text-sm text-muted-foreground mt-2">${caption}</figcaption>`,
				});
			}
			ctx.setProperty(node, 'data', {
				hName: 'figure',
				hProperties: { className: ['my-6', 'text-center'] },
			});
			ctx.setProperty(node, 'children', children);
		},
	};
}
