---
name: astro
description: Modern Astro framework development skill using islands architecture, partial hydration, and content collections. Use when building Astro sites, creating .astro components, working with content collections, configuring client directives, or any Astro project structure. Triggers for requests involving Astro components, layouts, pages, routing, view transitions, server islands, content-driven sites, or static/hybrid rendering.
user-invocable: false
---

# Astro

Build fast, content-focused websites using Astro's islands architecture and zero-JS-by-default approach.

## Core Principles

1. **Zero JavaScript by default** — Ship static HTML; add JS only where needed
2. **Islands architecture** — Isolated interactive components hydrated independently
3. **Content-first** — Built for blogs, docs, marketing sites with content collections
4. **Framework agnostic** — Use React, Vue, Svelte, Solid, or none at all
5. **Performance budget** — Every byte of JS requires explicit opt-in

## Project Structure

```
src/
├── pages/              # File-based routing
│   ├── index.astro     # /
│   ├── about.astro     # /about
│   └── blog/
│       ├── index.astro # /blog
│       └── [...slug].astro # Dynamic routes
├── layouts/            # Reusable page shells
│   └── Base.astro
├── components/         # UI components
│   ├── Header.astro    # Astro components (no JS)
│   └── Counter.tsx     # Framework components (hydrateable)
├── content/            # Content collections
│   └── blog/
│       └── my-post.md
├── content.config.ts   # Collection schemas
└── styles/             # Global styles
public/                 # Static assets (copied as-is)
astro.config.mjs        # Astro configuration
```

## Astro Components

### Basic Component

```astro
---
// Component Script (runs at build time / on server)
interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Default description' } = Astro.props;
const items = await fetch('https://api.example.com/items').then(r => r.json());
---

<!-- Component Template -->
<article class="card">
  <h2>{title}</h2>
  <p>{description}</p>
  <ul>
    {items.map(item => <li>{item.name}</li>)}
  </ul>
</article>

<style>
  /* Scoped by default */
  .card {
    padding: 1rem;
    border-radius: 0.5rem;
    background: var(--surface);
  }
</style>
```

### Slots

```astro
---
// Card.astro
interface Props {
  title: string;
}
const { title } = Astro.props;
---

<div class="card">
  <header>
    <slot name="header">{title}</slot>
  </header>
  <main>
    <slot />  <!-- Default slot -->
  </main>
  <footer>
    <slot name="footer" />
  </footer>
</div>

<!-- Usage -->
<Card title="Default Title">
  <span slot="header">Custom Header</span>
  <p>Main content goes here</p>
  <div slot="footer">Footer content</div>
</Card>
```

## Client Directives (Partial Hydration)

Framework components (React, Vue, etc.) are static by default. Add a `client:*` directive to hydrate:

| Directive                 | When Hydrated            | Use Case                      |
| ------------------------- | ------------------------ | ----------------------------- |
| `client:load`             | Immediately on page load | Critical interactive elements |
| `client:idle`             | After page is idle       | Non-critical interactivity    |
| `client:visible`          | When enters viewport     | Below-the-fold content        |
| `client:media="(query)"`  | When media query matches | Responsive components         |
| `client:only="framework"` | Client-only (no SSR)     | Browser API dependent         |

```astro
---
import Counter from '../components/Counter.tsx';
import Carousel from '../components/Carousel.vue';
import Chat from '../components/Chat.svelte';
---

<!-- Hydrate immediately (header, nav) -->
<Counter client:load />

<!-- Hydrate when visible (carousels, comments) -->
<Carousel client:visible />

<!-- Hydrate on mobile only -->
<Chat client:media="(max-width: 768px)" />

<!-- No SSR, client-only (maps, editors) -->
<MapComponent client:only="react" />
```

### Fallback Content

```astro
<HeavyComponent client:visible>
  <div slot="fallback">Loading...</div>
</HeavyComponent>
```

## Content Collections

### Define Schema (src/content.config.ts)

```typescript
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

### Query Collections

```astro
---
// src/pages/blog/index.astro
import { getCollection } from 'astro:content';

const posts = await getCollection('blog', ({ data }) => !data.draft);
const sorted = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---

<ul>
  {sorted.map(post => (
    <li>
      <a href={`/blog/${post.id}`}>{post.data.title}</a>
      <time datetime={post.data.pubDate.toISOString()}>
        {post.data.pubDate.toLocaleDateString()}
      </time>
    </li>
  ))}
</ul>
```

### Dynamic Routes

```astro
---
// src/pages/blog/[...slug].astro
import { getCollection, render } from 'astro:content';
import BlogLayout from '../../layouts/BlogLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<BlogLayout title={post.data.title}>
  <article>
    <h1>{post.data.title}</h1>
    <Content />
  </article>
</BlogLayout>
```

## View Transitions

```astro
---
// src/layouts/Base.astro
import { ViewTransitions } from 'astro:transitions';
---

<html>
  <head>
    <ViewTransitions />
  </head>
  <body>
    <header transition:persist>
      <!-- Persists across navigations -->
    </header>
    <main transition:animate="slide">
      <slot />
    </main>
  </body>
</html>
```

### Transition Directives

```astro
<!-- Named transitions for matching elements -->
<img transition:name="hero-image" src={src} />

<!-- Built-in animations -->
<div transition:animate="fade">Fades in/out</div>
<div transition:animate="slide">Slides in/out</div>
<div transition:animate="none">No animation</div>

<!-- Persist element state across pages -->
<video transition:persist src={video} />
<Counter client:load transition:persist />
```

## Server Islands

Defer dynamic content in otherwise static pages:

```astro
---
import UserGreeting from '../components/UserGreeting.astro';
---

<html>
  <body>
    <!-- Static shell (cached) -->
    <header>Welcome to our site</header>

    <!-- Dynamic island (fetched after initial load) -->
    <UserGreeting server:defer>
      <p slot="fallback">Loading user...</p>
    </UserGreeting>
  </body>
</html>
```

## Layouts

```astro
---
// src/layouts/Base.astro
interface Props {
  title: string;
  description?: string;
}

const { title, description = 'My Astro Site' } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <slot name="head" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

## Routing

### Static Routes

```
src/pages/index.astro        → /
src/pages/about.astro        → /about
src/pages/blog/index.astro   → /blog
src/pages/blog/first.astro   → /blog/first
```

### Dynamic Routes

```astro
---
// src/pages/posts/[slug].astro
export function getStaticPaths() {
  return [
    { params: { slug: 'post-1' } },
    { params: { slug: 'post-2' } },
  ];
}

const { slug } = Astro.params;
---
```

### Rest Parameters

```astro
---
// src/pages/docs/[...path].astro
// Matches: /docs, /docs/intro, /docs/guides/getting-started

export function getStaticPaths() {
  return [
    { params: { path: undefined } },      // /docs
    { params: { path: 'intro' } },        // /docs/intro
    { params: { path: 'guides/start' } }, // /docs/guides/start
  ];
}
---
```

## API Endpoints

```typescript
// src/pages/api/posts.json.ts
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const posts = await fetchPosts();
  return new Response(JSON.stringify(posts), {
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  // Process data...
  return new Response(JSON.stringify({ success: true }), { status: 201 });
};
```

## Configuration

```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://example.com",
  integrations: [react(), tailwind(), mdx()],
  output: "static", // 'static' | 'server' | 'hybrid'
  prefetch: true,
  image: {
    domains: ["cdn.example.com"],
  },
});
```

## Resources

For detailed patterns and advanced topics:

- **references/islands.md** — Partial hydration strategies and performance optimization
- **references/content.md** — Content collections, loaders, and MDX patterns
- **references/patterns.md** — Common component patterns and accessibility
