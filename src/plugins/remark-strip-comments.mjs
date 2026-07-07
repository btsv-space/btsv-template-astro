/**
 * Strips btsv comment blocks from markdown before rendering.
 *
 * Syntax:
 *   Lines beginning with @@ are editor-only comments.
 *   A block ends with @@@ on its own line.
 */
export default function remarkStripComments() {
	return (tree) => {
		const children = tree.children;
		const result = [];
		let stripping = false;

		for (let i = 0; i < children.length; i++) {
			const node = children[i];

			if (node.type === 'paragraph' && node.children.length === 1) {
				const child = node.children[0];
				if (child.type === 'text') {
					const value = child.value;
					const containsEnd = value.includes('\n@@@') || value.endsWith('@@@');

					if (!stripping && value.startsWith('@@')) {
						stripping = !containsEnd;
						continue;
					}

					if (stripping) {
						if (containsEnd) {
							stripping = false;
						}
						continue;
					}
				}
			}

			if (!stripping) {
				result.push(node);
			}
		}

		tree.children = result;
	};
}
