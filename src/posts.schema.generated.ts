// This file is generated. Do not edit.
// Run `pnpm generate-template` in contract/ to regenerate.

import { z } from "astro:content";

export const postsSchema = z
  .object({
    title: z.string().describe("Post title. Required."),
    dateCreated: z.coerce
      .date()
      .describe(
        "Original creation date in YYYY-MM-DD format. Set once when the post is first created. Required.",
      ),
    dateUpdated: z.coerce
      .date()
      .describe(
        "Last modification date in YYYY-MM-DD format. Updated every time the post is saved. Required.",
      ),
    datePublished: z.coerce
      .date()
      .describe(
        "Publication date in YYYY-MM-DD format. Set once when the post is first published (draft becomes false). Optional — user-editable for backdating.",
      )
      .optional(),
    description: z
      .string()
      .describe(
        "Short description for SEO, social previews, and post listings.",
      )
      .optional(),
    tags: z
      .array(z.string())
      .describe("List of tags. Generates /tags/<name> listing pages.")
      .default([]),
    draft: z
      .boolean()
      .describe("If true, the post is excluded from production builds.")
      .default(false),
    id: z
      .string()
      .describe(
        "Internal post identifier (timestamp in YYYYMMDD-HHMMSSmm format). Auto-generated, do not edit.",
      )
      .optional(),
    slug: z
      .string()
      .describe(
        "URL slug for the published post. Auto-derived from title. Can be overridden. Required for publishing.",
      )
      .optional(),
    page: z
      .boolean()
      .describe(
        "If true, marks this entry as a standalone page (About, Contact, etc.) rather than a blog post. Pages are excluded from post listings and RSS.",
      )
      .default(false),
  })
  .passthrough()
  .describe(
    "Canonical frontmatter schema shared by the editor and all builder templates. additionalProperties is false for strict typing — custom fields are still captured by the editor's parser (extractExtra) during content ingestion.",
  );
