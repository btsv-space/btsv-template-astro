/**
 * Strips btsv comment blocks from markdown before rendering.
 *
 * Syntax:
 *   Lines beginning with @@ are editor-only comments.
 *   A block ends with @@@ on its own line.
 *
 * A Sätteri MDAST plugin, passed to `satteri({ mdastPlugins: [stripComments] })`.
 * It is exported as a factory so Sätteri resets the `stripping` state per document.
 */
export function stripComments() {
	let stripping = false;

	return {
		name: 'strip-comments',
		paragraph(node, ctx) {
			if (node.children.length !== 1) return;
			const value = ctx.textContent(node);
			const containsEnd = value.includes('\n@@@') || value.endsWith('@@@');

			if (!stripping && value.startsWith('@@')) {
				stripping = !containsEnd;
				ctx.removeNode(node);
				return;
			}

			if (stripping) {
				if (containsEnd) {
					stripping = false;
				}
				ctx.removeNode(node);
			}
		}
	};
}
