# Astro Islands Reference

Partial hydration strategies, client directives, and performance optimization.

## Contents

1. [Islands Architecture](#islands-architecture)
2. [Client Directives Deep Dive](#client-directives-deep-dive)
3. [Framework Integration](#framework-integration)
4. [Performance Patterns](#performance-patterns)
5. [Server Islands](#server-islands)
6. [View Transitions](#view-transitions)

---

## Islands Architecture

### Core Concept

Islands are isolated interactive components in a sea of static HTML. Each island:

- Loads its own JavaScript bundle
- Hydrates independently of other islands
- Can use different frameworks
- Has explicit loading strategy via `client:*` directives

### Static vs Interactive

```astro
---
import StaticCard from '../components/Card.astro';      // No JS
import InteractiveCounter from '../components/Counter.tsx';
---

<!-- Static: Zero JS, rendered at build time -->
<StaticCard title="Static Content" />

<!-- Interactive: JS loaded, hydrated on client -->
<InteractiveCounter client:load />
```

### Island Isolation

Each island is wrapped in `<astro-island>` custom element:

- Separate script bundles
- Independent hydration timing
- Isolated state
- Framework-specific runtime loaded once per framework

---

## Client Directives Deep Dive

### client:load

**When:** Immediately on page load  
**Priority:** Highest  
**Use for:** Navigation, auth state, critical interactions

```astro
<Header client:load />
<AuthProvider client:load>
  <App />
</AuthProvider>
```

### client:idle

**When:** After `requestIdleCallback` fires  
**Priority:** Medium  
**Use for:** Non-critical features, analytics, secondary UI

```astro
<Newsletter client:idle />
<ShareButtons client:idle />
```

### client:visible

**When:** Component enters viewport (IntersectionObserver)  
**Priority:** Low  
**Use for:** Below-fold content, lazy-loaded features

```astro
<Comments client:visible />
<ImageCarousel client:visible />

<!-- With rootMargin for earlier loading -->
<HeavyChart client:visible={{ rootMargin: '200px' }} />
```

### client:media

**When:** CSS media query matches  
**Priority:** Conditional  
**Use for:** Responsive components, mobile-only features

```astro
<!-- Mobile navigation -->
<MobileMenu client:media="(max-width: 768px)" />

<!-- Print-specific component -->
<PrintPreview client:media="print" />

<!-- Dark mode specific -->
<DarkModeToggle client:media="(prefers-color-scheme: dark)" />
```

### client:only

**When:** Immediately, but **no SSR**  
**Use for:** Browser-only APIs, components that can't render on server

```astro
<!-- Must specify framework -->
<MapComponent client:only="react" />
<ThreeScene client:only="vue" />
<Canvas client:only="svelte" />

<!-- With fallback content -->
<MapComponent client:only="react">
  <div slot="fallback">
    <img src="/map-placeholder.png" alt="Map loading..." />
  </div>
</MapComponent>
```

### Directive Decision Tree

```
Need interactivity?
├── No → Use Astro component (zero JS)
└── Yes → What priority?
    ├── Critical (nav, auth) → client:load
    ├── Soon but not blocking → client:idle
    ├── Only when visible → client:visible
    ├── Only on certain screens → client:media
    └── Can't SSR → client:only
```

---

## Framework Integration

### Mixing Frameworks

```astro
---
import ReactCounter from '../components/Counter.tsx';
import VueSlider from '../components/Slider.vue';
import SvelteToggle from '../components/Toggle.svelte';
import SolidGraph from '../components/Graph.tsx'; // .tsx with Solid
---

<!-- Each uses its own framework runtime -->
<ReactCounter client:load />
<VueSlider client:visible />
<SvelteToggle client:idle />
<SolidGraph client:load />
```

### Passing Props

```astro
---
import Card from '../components/Card.tsx';

const data = await fetch('/api/items').then(r => r.json());
---

<!-- Props are serialized for hydration -->
<Card
  client:load
  title="My Card"
  items={data}
  onClick={() => {}} // ⚠️ Functions don't serialize!
/>
```

### Children/Slots

```astro
---
import Wrapper from '../components/Wrapper.tsx';
---

<!-- React uses children prop -->
<Wrapper client:load>
  <p>This becomes props.children in React</p>
</Wrapper>

<!-- Named slots become props -->
<Wrapper client:load>
  <div slot="header">Header content</div>
  <p>Default slot content</p>
  <div slot="footer">Footer content</div>
</Wrapper>
```

### Nested Islands

```astro
---
import OuterComponent from '../components/Outer.tsx';
import InnerComponent from '../components/Inner.tsx';
---

<!-- Outer island contains inner island -->
<OuterComponent client:load>
  <InnerComponent client:idle />
</OuterComponent>
```

---

## Performance Patterns

### Lazy Loading Heavy Components

```astro
---
// Don't import at top level for large components
const HeavyEditor = (await import('../components/Editor.tsx')).default;
---

<HeavyEditor client:visible />
```

### Conditional Islands

```astro
---
const showEditor = Astro.url.searchParams.get('edit') === 'true';
---

{showEditor && <Editor client:load />}
```

### Preloading Islands

```astro
<head>
  <!-- Preload critical island JS -->
  <link rel="modulepreload" href="/_astro/Counter.abc123.js" />
</head>
```

### Measuring Island Impact

```astro
---
// Development only: log island sizes
if (import.meta.env.DEV) {
  console.log('Islands on this page:', [
    'Counter (React): ~15KB',
    'Carousel (Vue): ~22KB',
  ]);
}
---
```

### Shared State Between Islands

```astro
---
// Using nanostores for cross-framework state
import Counter from '../components/Counter.tsx';
import Display from '../components/Display.vue';
---

<!-- Both components share state via nanostores -->
<Counter client:load />
<Display client:load />
```

```typescript
// stores/counter.ts
import { atom } from "nanostores";
export const count = atom(0);
```

---

## Server Islands

Defer dynamic content while keeping the page shell static and cacheable.

### Basic Usage

```astro
---
import UserProfile from '../components/UserProfile.astro';
---

<html>
  <body>
    <!-- Static content (cached at CDN) -->
    <header>Welcome to our site</header>

    <!-- Dynamic content (fetched after page load) -->
    <UserProfile server:defer>
      <div slot="fallback" class="skeleton">
        Loading profile...
      </div>
    </UserProfile>
  </body>
</html>
```

### When to Use Server Islands

- Personalized content (user data, recommendations)
- Real-time data (stock prices, live scores)
- A/B testing content
- Content behind authentication
- Slow database queries

### Server Island Component

```astro
---
// UserProfile.astro (server island)
const user = await getAuthenticatedUser(Astro.request);
const recommendations = await getRecommendations(user.id);
---

<div class="profile">
  <h2>Welcome, {user.name}</h2>
  <ul>
    {recommendations.map(item => (
      <li>{item.title}</li>
    ))}
  </ul>
</div>
```

---

## View Transitions

### Setup

```astro
---
// src/layouts/Base.astro
import { ClientRouter } from 'astro:transitions';
---

<html>
  <head>
    <ClientRouter />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### Transition Animations

```astro
<!-- Built-in animations -->
<main transition:animate="fade">
  <slot />
</main>

<!-- Custom animation -->
<div transition:animate={{
  old: {
    name: 'slideOut',
    duration: '0.3s',
    easing: 'ease-out',
  },
  new: {
    name: 'slideIn',
    duration: '0.3s',
    easing: 'ease-in',
  },
}}>
  Content
</div>

<style>
  @keyframes slideOut {
    to { transform: translateX(-100%); }
  }
  @keyframes slideIn {
    from { transform: translateX(100%); }
  }
</style>
```

### Persisting State

```astro
<!-- Persist media playback -->
<video transition:persist src={videoUrl} />

<!-- Persist island state -->
<Counter client:load transition:persist />

<!-- Named persistence (match across pages) -->
<Counter
  client:load
  transition:persist
  transition:name="main-counter"
/>

<!-- Persist props too -->
<Counter
  client:load
  transition:persist
  transition:persist-props
/>
```

### Transition Events

```astro
<script>
  document.addEventListener('astro:before-preparation', (e) => {
    // Before navigation starts
    console.log('Navigating to:', e.to);
  });

  document.addEventListener('astro:after-swap', () => {
    // After DOM is swapped
    initializeNewContent();
  });

  document.addEventListener('astro:page-load', () => {
    // After page fully loaded (including islands)
    trackPageView();
  });
</script>
```

### Lifecycle Events

1. `astro:before-preparation` — Navigation started
2. `astro:after-preparation` — New page fetched
3. `astro:before-swap` — About to swap DOM
4. `astro:after-swap` — DOM swapped
5. `astro:page-load` — Page fully loaded

### Fallback for Non-Supporting Browsers

```astro
<ClientRouter fallback="swap" />
<!-- Options: 'swap' | 'animate' | 'none' -->
```
