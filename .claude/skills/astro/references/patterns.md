# Astro Patterns Reference

Common component patterns, accessibility, styling, and project architecture.

## Contents

1. [Component Patterns](#component-patterns)
2. [Styling](#styling)
3. [Data Fetching](#data-fetching)
4. [Forms & Actions](#forms--actions)
5. [SEO & Meta](#seo--meta)
6. [Accessibility](#accessibility)
7. [Project Architecture](#project-architecture)

---

## Component Patterns

### Props with TypeScript

```astro
---
interface Props {
  title: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  class?: string;
}

const {
  title,
  size = 'md',
  variant = 'primary',
  disabled = false,
  class: className,
} = Astro.props;
---

<button
  class:list={['btn', `btn-${size}`, `btn-${variant}`, className]}
  disabled={disabled}
>
  {title}
</button>
```

### Conditional Rendering

```astro
---
interface Props {
  user?: { name: string; avatar: string };
  items: Array<{ id: string; title: string }>;
}

const { user, items } = Astro.props;
---

{user ? (
  <div class="user">
    <img src={user.avatar} alt={user.name} />
    <span>{user.name}</span>
  </div>
) : (
  <a href="/login">Sign in</a>
)}

{items.length > 0 ? (
  <ul>
    {items.map(item => (
      <li key={item.id}>{item.title}</li>
    ))}
  </ul>
) : (
  <p>No items found</p>
)}
```

### Dynamic Tags

```astro
---
interface Props {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: any;
}

const { as: Tag = 'h2' } = Astro.props;
---

<Tag class="heading">
  <slot />
</Tag>
```

### Wrapper Component

```astro
---
// Container.astro
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'full';
  class?: string;
}

const { size = 'md', class: className } = Astro.props;
---

<div class:list={['container', `container-${size}`, className]}>
  <slot />
</div>

<style>
  .container { margin-inline: auto; padding-inline: 1rem; }
  .container-sm { max-width: 640px; }
  .container-md { max-width: 1024px; }
  .container-lg { max-width: 1280px; }
  .container-full { max-width: none; }
</style>
```

### Component Composition

```astro
---
// Card.astro
interface Props {
  href?: string;
}

const { href } = Astro.props;
const Tag = href ? 'a' : 'div';
---

<Tag class="card" href={href}>
  <header class="card-header">
    <slot name="header" />
  </header>
  <div class="card-body">
    <slot />
  </div>
  <footer class="card-footer">
    <slot name="footer" />
  </footer>
</Tag>
```

### Async Components

```astro
---
// UserProfile.astro
interface Props {
  userId: string;
}

const { userId } = Astro.props;

// Fetch at build time / request time
const user = await fetch(`https://api.example.com/users/${userId}`)
  .then(r => r.json());
---

<div class="profile">
  <img src={user.avatar} alt={user.name} />
  <h2>{user.name}</h2>
  <p>{user.bio}</p>
</div>
```

---

## Styling

### Scoped Styles (Default)

```astro
<div class="card">Content</div>

<style>
  /* Scoped to this component only */
  .card {
    padding: 1rem;
    background: white;
  }
</style>
```

### Global Styles

```astro
<style is:global>
  /* Affects entire page */
  body {
    font-family: system-ui, sans-serif;
  }
</style>
```

### CSS Variables

```astro
---
const { primaryColor = '#3b82f6' } = Astro.props;
---

<div class="themed-box">Content</div>

<style define:vars={{ primaryColor }}>
  .themed-box {
    border: 2px solid var(--primaryColor);
  }
</style>
```

### External Stylesheets

```astro
---
import '../styles/global.css';
import styles from '../styles/Card.module.css';
---

<div class={styles.card}>Content</div>
```

### Tailwind Integration

```javascript
// astro.config.mjs
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind()],
});
```

```astro
<div class="p-4 bg-white rounded-lg shadow-md">
  <h2 class="text-xl font-bold text-gray-900">Title</h2>
</div>
```

### class:list Utility

```astro
---
const { isActive, size, className } = Astro.props;
---

<div class:list={[
  'base-class',
  { 'is-active': isActive },
  size && `size-${size}`,
  className,
]}>
  Content
</div>
```

---

## Data Fetching

### Build Time Fetch

```astro
---
// Runs at build time (SSG) or request time (SSR)
const response = await fetch('https://api.example.com/data');
const data = await response.json();
---

{data.map(item => <div>{item.title}</div>)}
```

### Parallel Fetching

```astro
---
const [posts, users, comments] = await Promise.all([
  fetch('https://api.example.com/posts').then(r => r.json()),
  fetch('https://api.example.com/users').then(r => r.json()),
  fetch('https://api.example.com/comments').then(r => r.json()),
]);
---
```

### Error Handling

```astro
---
let data = null;
let error = null;

try {
  const response = await fetch('https://api.example.com/data');
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  data = await response.json();
} catch (e) {
  error = e.message;
}
---

{error ? (
  <div class="error">Failed to load: {error}</div>
) : (
  <div>{JSON.stringify(data)}</div>
)}
```

### Caching

```astro
---
// Astro automatically dedupes identical fetches
// within the same render
const data1 = await fetch('https://api.example.com/data').then(r => r.json());
const data2 = await fetch('https://api.example.com/data').then(r => r.json());
// Only one request made
---
```

---

## Forms & Actions

### Basic Form

```astro
---
// src/pages/contact.astro
let message = '';

if (Astro.request.method === 'POST') {
  const formData = await Astro.request.formData();
  const name = formData.get('name');
  const email = formData.get('email');

  // Process form...
  message = 'Thanks for your message!';
}
---

<form method="POST">
  <label>
    Name: <input type="text" name="name" required />
  </label>
  <label>
    Email: <input type="email" name="email" required />
  </label>
  <button type="submit">Send</button>
</form>

{message && <p class="success">{message}</p>}
```

### With Validation

```astro
---
interface FormErrors {
  name?: string;
  email?: string;
}

let errors: FormErrors = {};
let values = { name: '', email: '' };

if (Astro.request.method === 'POST') {
  const formData = await Astro.request.formData();
  values = {
    name: formData.get('name')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? '',
  };

  if (!values.name) errors.name = 'Name is required';
  if (!values.email) errors.email = 'Email is required';
  else if (!values.email.includes('@')) errors.email = 'Invalid email';

  if (Object.keys(errors).length === 0) {
    // Process valid form...
    return Astro.redirect('/thank-you');
  }
}
---

<form method="POST">
  <label>
    Name:
    <input type="text" name="name" value={values.name} />
    {errors.name && <span class="error">{errors.name}</span>}
  </label>
  <label>
    Email:
    <input type="email" name="email" value={values.email} />
    {errors.email && <span class="error">{errors.email}</span>}
  </label>
  <button type="submit">Send</button>
</form>
```

### API Endpoint Handler

```typescript
// src/pages/api/contact.ts
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();

  // Validate
  if (!data.email || !data.message) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }

  // Process...

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
};
```

---

## SEO & Meta

### Base Layout with SEO

```astro
---
// src/layouts/Base.astro
interface Props {
  title: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

const {
  title,
  description = 'Default site description',
  image = '/default-og.jpg',
  canonicalUrl = Astro.url.href,
  noindex = false,
} = Astro.props;

const siteName = 'My Site';
const fullTitle = `${title} | ${siteName}`;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Primary Meta -->
    <title>{fullTitle}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalUrl} />
    {noindex && <meta name="robots" content="noindex, nofollow" />}

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL(image, Astro.site)} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={fullTitle} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={new URL(image, Astro.site)} />

    <slot name="head" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### Structured Data

```astro
---
const article = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.data.title,
  datePublished: post.data.pubDate.toISOString(),
  author: {
    '@type': 'Person',
    name: post.data.author,
  },
};
---

<script type="application/ld+json" set:html={JSON.stringify(article)} />
```

---

## Accessibility

### Skip Link

```astro
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<main id="main-content">
  <slot />
</main>

<style>
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    padding: 8px 16px;
    background: var(--color-primary);
    color: white;
    z-index: 100;
  }

  .skip-link:focus {
    top: 0;
  }
</style>
```

### Focus Management

```astro
<script>
  // Restore focus after view transitions
  document.addEventListener('astro:page-load', () => {
    const main = document.querySelector('main');
    main?.focus();
  });
</script>

<main tabindex="-1">
  <slot />
</main>
```

### Accessible Navigation

```astro
<nav aria-label="Main navigation">
  <ul role="list">
    {links.map(link => (
      <li>
        <a
          href={link.href}
          aria-current={Astro.url.pathname === link.href ? 'page' : undefined}
        >
          {link.label}
        </a>
      </li>
    ))}
  </ul>
</nav>
```

### Reduced Motion

```astro
<style>
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>
```

---

## Project Architecture

### Feature-Based Structure

```
src/
├── features/
│   ├── blog/
│   │   ├── components/
│   │   │   ├── PostCard.astro
│   │   │   └── PostList.astro
│   │   ├── layouts/
│   │   │   └── BlogPost.astro
│   │   └── utils/
│   │       └── formatDate.ts
│   └── auth/
│       ├── components/
│       └── utils/
├── shared/
│   ├── components/
│   │   ├── Button.astro
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Base.astro
│   └── styles/
│       └── global.css
└── pages/
```

### Monorepo Packages

```
packages/
├── ui/                 # Shared components
│   ├── Button.astro
│   └── package.json
├── config/             # Shared config
│   ├── tailwind.config.js
│   └── package.json
└── apps/
    ├── marketing/      # Marketing site
    └── docs/           # Documentation
```

### Environment Variables

```typescript
// .env
PUBLIC_API_URL=https://api.example.com
SECRET_API_KEY=xxx

// Usage
---
// Public (available in client)
const apiUrl = import.meta.env.PUBLIC_API_URL;

// Private (server only)
const apiKey = import.meta.env.SECRET_API_KEY;

// Built-in
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;
const mode = import.meta.env.MODE;
---
```

### Type Safety

```typescript
// src/env.d.ts
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string;
  readonly SECRET_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```
