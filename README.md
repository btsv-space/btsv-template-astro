[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/btsv-space/btsv-template-astro?title=btsv)

# btsv-template-astro

Astro blog template for [btsv](https://github.com/btsv/btsv) — a
markdown+ editor that publishes to a static site via git.

## Getting started

1. **Use this template** (not Fork) — click the green "Use this template" button at the
   top of this repo. Choose private visibility if you want a private blog.
2. **Clone your new repo** and run `npm install`.
3. **Write posts** in `src/content/posts/`. Each post is an `.mdx` file.
4. **Deploy** — connect your repo to any static host (Netlify, Cloudflare Pages, Vercel).
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

## Project structure

```
src/
├── content/
│   ├── content.config.ts    Frontmatter schema (the contract)
│   └── posts/               Your posts go here (*.mdx)
├── pages/
│   ├── index.astro          Post listing
│   ├── [...slug].astro      Dynamic post rendering
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

Run `npm run build` to produce a static site in `dist/`. Deploy the `dist/` folder
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
| `npm run dev` | Local dev server at `localhost:4321` |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
