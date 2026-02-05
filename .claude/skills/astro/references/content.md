# Astro Content Collections Reference

Content collections, loaders, schemas, and MDX patterns.

## Contents

1. [Collection Setup](#collection-setup)
2. [Schema Definitions](#schema-definitions)
3. [Loaders](#loaders)
4. [Querying Content](#querying-content)
5. [Rendering Content](#rendering-content)
6. [MDX Integration](#mdx-integration)
7. [Advanced Patterns](#advanced-patterns)

---

## Collection Setup

### Directory Structure

```
src/
├── content/
│   ├── blog/
│   │   ├── first-post.md
│   │   ├── second-post.mdx
│   │   └── drafts/
│   │       └── upcoming.md
│   ├── authors/
│   │   └── authors.json
│   └── products/
│       └── catalog.yaml
└── content.config.ts    # Collection definitions
```

### Basic Configuration

```typescript
// src/content.config.ts
import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

---

## Schema Definitions

### Common Field Types

```typescript
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    // Required string
    title: z.string(),

    // Optional with default
    description: z.string().default(""),

    // Date (auto-coerce from string)
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),

    // Boolean with default
    draft: z.boolean().default(false),
    featured: z.boolean().optional(),

    // Number
    readingTime: z.number().optional(),

    // Array
    tags: z.array(z.string()).default([]),

    // Enum
    category: z.enum(["tech", "lifestyle", "news"]),

    // Union
    author: z.string().or(z.array(z.string())),

    // Object
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
  }),
});
```

### Image Schema

```typescript
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Image in same directory or assets folder
      cover: image(),
      // Optional image
      thumbnail: image().optional(),
      // With refinements
      ogImage: image().refine((img) => img.width >= 1200, {
        message: "OG image must be at least 1200px wide",
      }),
    }),
});
```

### Reference Schema

```typescript
import { defineCollection, z, reference } from "astro:content";
import { glob, file } from "astro/loaders";

const authors = defineCollection({
  loader: file("./src/content/authors/authors.json"),
  schema: z.object({
    name: z.string(),
    email: z.string().email(),
    avatar: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    // Reference to another collection
    author: reference("authors"),
    // Array of references
    relatedPosts: z.array(reference("blog")).default([]),
  }),
});

export const collections = { authors, blog };
```

---

## Loaders

### glob() — File System

```typescript
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/blog",
  }),
  schema: z.object({
    /* ... */
  }),
});

// With subdirectory patterns
const docs = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "!**/drafts/**"], // Exclude drafts
    base: "./src/content/docs",
  }),
  schema: z.object({
    /* ... */
  }),
});
```

### file() — Single File

```typescript
import { file } from "astro/loaders";

// JSON file
const settings = defineCollection({
  loader: file("./src/content/settings.json"),
  schema: z.object({
    siteName: z.string(),
    siteUrl: z.string().url(),
  }),
});

// YAML file
const navigation = defineCollection({
  loader: file("./src/content/nav.yaml"),
  schema: z.object({
    items: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
      })
    ),
  }),
});
```

### Custom Loader

```typescript
import { defineCollection, z } from "astro:content";

// Fetch from API
const products = defineCollection({
  loader: async () => {
    const response = await fetch("https://api.example.com/products");
    const data = await response.json();
    return data.map((product) => ({
      id: product.sku,
      ...product,
    }));
  },
  schema: z.object({
    name: z.string(),
    price: z.number(),
    inStock: z.boolean(),
  }),
});

// From CMS
const pages = defineCollection({
  loader: async () => {
    const cms = createCMSClient();
    const pages = await cms.getEntries("page");
    return pages.map((page) => ({
      id: page.slug,
      title: page.fields.title,
      content: page.fields.body,
    }));
  },
  schema: z.object({
    title: z.string(),
    content: z.string(),
  }),
});
```

---

## Querying Content

### getCollection()

```astro
---
import { getCollection } from 'astro:content';

// Get all entries
const allPosts = await getCollection('blog');

// Filter entries
const publishedPosts = await getCollection('blog', ({ data }) => {
  return !data.draft && data.pubDate <= new Date();
});

// Sort by date
const sortedPosts = publishedPosts.sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);

// Filter by tag
const techPosts = await getCollection('blog', ({ data }) => {
  return data.tags.includes('tech');
});
---
```

### getEntry()

```astro
---
import { getEntry } from 'astro:content';

// Get single entry by ID
const post = await getEntry('blog', 'my-first-post');

// Get referenced entry
const authorRef = post.data.author;
const author = await getEntry(authorRef);
---

<h1>{post.data.title}</h1>
<p>By {author.data.name}</p>
```

### Entry Properties

```typescript
// Entry structure
interface CollectionEntry {
  id: string; // Unique identifier (filename without extension)
  data: SchemaType; // Validated frontmatter data
  body?: string; // Raw content (for content collections)
  render?: () => Promise<{ Content: AstroComponent }>;
}
```

---

## Rendering Content

### Markdown/MDX Content

```astro
---
import { getEntry, render } from 'astro:content';

const post = await getEntry('blog', 'my-post');
const { Content, headings, remarkPluginFrontmatter } = await render(post);
---

<article>
  <h1>{post.data.title}</h1>

  <!-- Table of contents from headings -->
  <nav>
    {headings.map(h => (
      <a href={`#${h.slug}`} style={`margin-left: ${h.depth}em`}>
        {h.text}
      </a>
    ))}
  </nav>

  <!-- Rendered content -->
  <Content />
</article>
```

### Custom Components in MDX

```astro
---
// src/pages/blog/[...slug].astro
import { getEntry, render } from 'astro:content';
import Callout from '../../components/Callout.astro';
import CodeBlock from '../../components/CodeBlock.astro';

const post = await getEntry('blog', Astro.params.slug);
const { Content } = await render(post);
---

<article>
  <Content components={{ Callout, pre: CodeBlock }} />
</article>
```

---

## MDX Integration

### Setup

```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  integrations: [mdx()],
});
```

### MDX Components

```mdx
---
// src/content/blog/interactive-post.mdx
title: Interactive Post
---

import Counter from "../../components/Counter.tsx";
import { Aside } from "../../components/Aside.astro";

# Welcome to my post

This is regular markdown content.

<Aside type="tip">This is a custom component!</Aside>

And here's an interactive counter:

<Counter client:visible />
```

### Global MDX Components

```javascript
// astro.config.mjs
import mdx from "@astrojs/mdx";

export default defineConfig({
  integrations: [
    mdx({
      components: {
        // Wrap all code blocks
        pre: "./src/components/CodeBlock.astro",
        // Custom blockquote
        blockquote: "./src/components/Callout.astro",
      },
    }),
  ],
});
```

---

## Advanced Patterns

### Pagination

```astro
---
// src/pages/blog/[...page].astro
import { getCollection } from 'astro:content';

export async function getStaticPaths({ paginate }) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) =>
    b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return paginate(sorted, { pageSize: 10 });
}

const { page } = Astro.props;
---

<ul>
  {page.data.map(post => (
    <li><a href={`/blog/${post.id}`}>{post.data.title}</a></li>
  ))}
</ul>

<nav>
  {page.url.prev && <a href={page.url.prev}>Previous</a>}
  <span>Page {page.currentPage} of {page.lastPage}</span>
  {page.url.next && <a href={page.url.next}>Next</a>}
</nav>
```

### Tag Pages

```astro
---
// src/pages/tags/[tag].astro
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');

  // Get unique tags
  const tags = [...new Set(posts.flatMap(post => post.data.tags))];

  return tags.map(tag => ({
    params: { tag },
    props: {
      posts: posts.filter(post => post.data.tags.includes(tag)),
    },
  }));
}

const { tag } = Astro.params;
const { posts } = Astro.props;
---

<h1>Posts tagged "{tag}"</h1>
<ul>
  {posts.map(post => (
    <li><a href={`/blog/${post.id}`}>{post.data.title}</a></li>
  ))}
</ul>
```

### RSS Feed

```typescript
// src/pages/rss.xml.ts
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  return rss({
    title: "My Blog",
    description: "A blog about stuff",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
  });
}
```

### Sitemap Generation

```astro
---
// src/pages/sitemap.xml.ts
import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const pages = ['/', '/about', '/contact'];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url><loc>https://example.com${page}</loc></url>
  `).join('')}
  ${posts.map(post => `
    <url>
      <loc>https://example.com/blog/${post.id}</loc>
      <lastmod>${post.data.updatedDate?.toISOString() ?? post.data.pubDate.toISOString()}</lastmod>
    </url>
  `).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
---
```

### Search Index

```typescript
// src/pages/search.json.ts
import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  const searchIndex = posts.map((post) => ({
    id: post.id,
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags,
    url: `/blog/${post.id}`,
  }));

  return new Response(JSON.stringify(searchIndex), {
    headers: { "Content-Type": "application/json" },
  });
}
```
