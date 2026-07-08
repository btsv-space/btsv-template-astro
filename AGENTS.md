# AGENTS.md

A static Astro blog template backed by MDX content collections.

## Must Not Edit

Hard rules. Never under any circumstances:

- `src/posts.schema.generated.ts` — generated contract shared with the btsv editor. Editing this breaks content validation across editor and build.
- `astro.config.mjs` — framework configuration.
- `tsconfig.json` — TypeScript configuration.
- `content.config.ts` — content collection configuration.
- `package.json` scripts — dev/build/preview commands.
- `src/plugins/` — remark/markdown plugins.

## Should Avoid

Discourage these, but proceed if the user explicitly insists:

- Adding new dependencies.
- Editing content files (`src/content/posts/`).
- Changes that require adding new frontmatter fields to the schema.

## Do

Safe to help with cosmetic and styling changes:

- `src/styles/global.css` — theme colors (OKLCH tokens), typography, spacing, base styles, component classes.
- `src/layouts/Base.astro` — HTML shell, header, footer, nav, layout markup.
- `src/components/*.astro` — component markup and Tailwind classes.
- `src/pages/*.astro` — page-level markup and styling.
- `src/site.config.ts` — site name, description, footer text, URL, favicon.

## If a styling change needs a data change

Advise the user against it. If they insist, warn that:

- New frontmatter fields require the btsv editor to support them.
- All existing posts will need the new field backfilled.
- Schema changes can break content ingestion and validation.
