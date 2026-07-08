[![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-1389FD)](https://stackblitz.com/fork/github/btsv-space/btsv-template-astro?title=btsv-template-astro)

# btsv-template-astro

Astro blog template for [btsv](https://github.com/btsv/btsv) — a
markdown+ editor that publishes to a static site via git.

## Getting started

1. **Use this template** (not Fork) — click the green "Use this template" button at the
   top of this repo. Choose private visibility if you want a private blog.
2. **Clone your new repo** and run `pnpm install`.
3. **Customize your site** — edit `src/site.config.ts` to set your site name,
   description, URL, favicon, and other metadata. Delete `public/favicon.svg`
   to have one auto-generated from your site name on the next build.
4. **Write posts** in `src/content/posts/`. Each post is an `.mdx` file.
5. **Deploy** — connect your repo to any static host (Netlify, Cloudflare Pages, Vercel).
   They all auto-detect Astro. No config needed.

### Merging upstream changes

Since "Use this template" creates an independent repo (not a fork), GitHub won't
automatically sync updates from the template. To pull in new features or fixes:

```sh
# Add the template as an upstream remote (one-time setup)
git remote add upstream https://github.com/btsv/btsv-template-astro.git

# Pull in the latest changes
git fetch upstream
git merge upstream/main --allow-unrelated-histories

# Resolve any conflicts, then push
git push origin main
```

Your custom content and changes won't be overwritten as long as you haven't modified
the same files the template updated. Posts in `src/content/posts/` are always safe.

## Content contract

Every post file lives in `src/content/posts/` and uses this frontmatter:

```yaml
---
title: 'Post title'       # required
date: 2025-01-01           # required
description: 'A preview'   # optional, used for SEO and preview cards
tags: ['tag1', 'tag2']     # optional, generates /tags/<name> pages
draft: false               # optional, drafts excluded from production builds
slug: 'custom-url'         # optional, defaults to file name
updated: 2025-03-01        # optional, last modified date
---
```

The schema is enforced at build time by Astro content collections
(`src/content.config.ts`).

## Markdown+

Posts use **GitHub-flavored Markdown** via MDX, plus custom components:

### Callouts

```mdx
<Callout type="info">Information callout</Callout>
<Callout type="warning">Warning callout</Callout>
<Callout type="tip">Tip callout</Callout>
```

### Figures

```mdx
<Figure src="/image.png" alt="Description" caption="Optional caption" />
```

### Editor-only comments

Lines starting with `@@` are stripped from the published page:

```
@@ This won't appear in the rendered output.
@@ Use it for outlines, reminders, draft notes.
@@@
```

These are stripped by a remark plugin during the build — they never reach the HTML output.

## Favicon

The site ships with a default favicon (`public/favicon.svg`). To customize it:

1. **Use your own** — replace `public/favicon.svg` with any SVG.
2. **Auto-generate** — delete `public/favicon.svg`. The next `pnpm dev` or `pnpm build`
   will generate one from your site name (first letter, styled with config colors).

Configure the auto-generated favicon in `src/site.config.ts`:

| Field | Default | Description |
|---|---|---|
| `icon.background` | `#f7f7f7` | Background color (matches light mode) |
| `icon.foreground` | `#1a1a1a` | Text color (matches light mode) |
| `icon.case` | `lowercase` | `lowercase` or `uppercase` |
| `icon.font` | `sans` | `sans`, `serif`, `mono`, or `script` |

All fields are optional. Defaults match the global.css light mode colors for consistency.

## Project structure

```
scripts/
└── generate-favicon.ts       Auto-generates favicon.svg (runs inline on dev/build)
src/
├── site.config.ts            Site identity (name, description, URL, favicon, etc.)
├── content/
│   ├── content.config.ts    Frontmatter schema (the contract)
│   └── posts/               Your posts go here (*.mdx)
├── pages/
│   ├── index.astro          Post listing
│   ├── [...slug].astro      Dynamic post rendering
│   ├── favicon.ico.ts        Redirects /favicon.ico → /favicon.svg
│   └── rss.xml.js           RSS feed
├── layouts/
│   └── Base.astro           HTML shell
├── components/
│   ├── PostArticle.astro       Post preview card
│   ├── Callout.astro        Info / warning / tip
│   └── Figure.astro         Captioned image
├── plugins/
│   └── remark-strip-comments.mjs   Strips @@ ... @@@ blocks
└── styles/
    └── global.css           Base styles (inlined in Base.astro)
```

## Deployment

Run `pnpm build` to produce a static site in `dist/`. Deploy the `dist/` folder
to any static host:

- **Netlify**: Import from Git — auto-detects Astro
- **Cloudflare Pages**: Import from Git — auto-detects Astro
- **Vercel**: Import from Git — auto-detects Astro

No deployment config files needed. Every major provider recognizes Astro projects
automatically and sets the correct build command (`astro build`) and output directory
(`dist`).

## Commands

| Command | Description |
|---|---|
| `pnpm dev` | Local dev server at `localhost:4321` |
| `pnpm build` | Production build → `dist/` |
| `pnpm preview` | Preview production build locally |
