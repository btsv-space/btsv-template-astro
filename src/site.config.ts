export interface SiteConfig {
	name: string;
	description: string;
	lang: string;
	faviconSvg: string;
	footer: string;
	url: string;
	icon?: {
		background: string;
		foreground: string;
		case: 'lowercase' | 'uppercase';
		font: 'sans' | 'serif' | 'mono' | 'script';
	};
}

export const site: SiteConfig = {
	name: 'btsv',
	description: '',
	lang: 'en',
	faviconSvg: '/favicon.svg',
	footer: 'Powered by <a href="https://github.com/btsv-space/btsv-template-astro" class="text-foreground underline-offset-2">btsv</a>',
	url: 'https://example.com',
	icon: {
		background: '#f7f7f7',
		foreground: '#1a1a1a',
		case: 'lowercase',
		font: 'sans',
	},
};
