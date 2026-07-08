import { existsSync, writeFileSync } from 'node:fs';
import { site } from '../src/site.config.ts';

const faviconPath = new URL('../public/favicon.svg', import.meta.url).pathname;

if (existsSync(faviconPath)) {
	process.exit(0);
}

try {
	const defaultIconParams = {
		background: '#f7f7f7',
		foreground: '#1a1a1a',
		case: 'lowercase',
		font: 'sans',
	} as const;

	const letter = site.name[0] || '?';
	const icon = site.icon ?? {...defaultIconParams};

	const cased = icon.case === 'uppercase' ? letter.toUpperCase() : letter.toLowerCase();

	const fontFamily = {
		sans: 'system-ui, -apple-system, sans-serif',
		serif: 'Georgia, Times New Roman, serif',
		mono: 'SF Mono, Fira Code, Fira Mono, Roboto Mono, monospace',
		script: 'Comic Sans MS, Chalkboard SE, Marker Felt, cursive',
	}[icon.font];

	const bg = icon.background || '#f7f7f7';
	const fg = icon.foreground || '#1a1a1a';

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="6" fill="${bg}"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="${fontFamily}" font-weight="700" font-size="24" fill="${fg}">${cased}</text>
</svg>
`;

	writeFileSync(faviconPath, svg + '\n');
	console.log(`generate-favicon: created favicon.svg (letter="${cased}", bg="${bg}", fg="${fg}", font="${icon.font}")`);
} catch (err) {
	console.warn('generate-favicon: failed, skipping:', err instanceof Error ? err.message : err);
	process.exit(0);
}
