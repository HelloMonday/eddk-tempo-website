# Svelte 5 Patterns

Common patterns for components, state management, and application architecture.

## Contents

1. [Component Patterns](#component-patterns)
2. [State Management](#state-management)
3. [Async Patterns](#async-patterns)
4. [TypeScript Patterns](#typescript-patterns)

---

## Component Patterns

### Compound Components

```svelte
<!-- Tabs.svelte -->
<script lang="ts" module>
  export { default as Tab } from './Tab.svelte';
  export { default as TabPanel } from './TabPanel.svelte';
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children, defaultValue }: {
    children: Snippet;
    defaultValue?: string;
  } = $props();

  let activeTab = $state(defaultValue);

  // Provide context to children
  import { setContext } from 'svelte';
  setContext('tabs', {
    get activeTab() { return activeTab; },
    setActive: (id: string) => activeTab = id
  });
</script>

<div class="tabs" role="tablist">
  {@render children()}
</div>
```

### Forwarding Events

```svelte
<script lang="ts">
  let { onclick, onkeydown, ...rest }: {
    onclick?: (e: MouseEvent) => void;
    onkeydown?: (e: KeyboardEvent) => void;
    [key: string]: unknown;
  } = $props();
</script>

<button {onclick} {onkeydown} {...rest}>
  <slot />
</button>
```

### Polymorphic Components

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    as?: 'button' | 'a' | 'div';
    children: Snippet;
  } & Record<string, unknown>;

  let { as = 'button', children, ...rest }: Props = $props();
</script>

{#if as === 'a'}
  <a {...rest}>{@render children()}</a>
{:else if as === 'div'}
  <div {...rest}>{@render children()}</div>
{:else}
  <button {...rest}>{@render children()}</button>
{/if}
```

### Controlled vs Uncontrolled

```svelte
<!-- Controlled: value managed by parent -->
<script lang="ts">
  let { value, onchange }: {
    value: string;
    onchange: (value: string) => void;
  } = $props();
</script>

<input
  {value}
  oninput={(e) => onchange(e.currentTarget.value)}
/>

<!-- Uncontrolled: internal state with bindable -->
<script lang="ts">
  let { value = $bindable('') } = $props();
</script>

<input bind:value />
```

### Component Composition with Snippets

```svelte
<!-- DataTable.svelte -->
<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';

  interface Props<T> {
    items: T[];
    row: Snippet<[T, number]>;
    header?: Snippet;
    empty?: Snippet;
  }

  let { items, row, header, empty }: Props<T> = $props();
</script>

<table>
  {#if header}
    <thead>{@render header()}</thead>
  {/if}
  <tbody>
    {#if items.length === 0 && empty}
      <tr><td>{@render empty()}</td></tr>
    {:else}
      {#each items as item, i}
        {@render row(item, i)}
      {/each}
    {/if}
  </tbody>
</table>

<!-- Usage -->
<DataTable {items}>
  {#snippet header()}
    <tr><th>Name</th><th>Email</th></tr>
  {/snippet}

  {#snippet row(user, index)}
    <tr class:even={index % 2 === 0}>
      <td>{user.name}</td>
      <td>{user.email}</td>
    </tr>
  {/snippet}

  {#snippet empty()}
    <p>No users found</p>
  {/snippet}
</DataTable>
```

---

## State Management

### Simple Shared State

```typescript
// lib/stores/counter.svelte.ts
function createCounter() {
  let count = $state(0);

  return {
    get count() {
      return count;
    },
    increment: () => count++,
    decrement: () => count--,
    reset: () => (count = 0),
  };
}

export const counter = createCounter();
```

### Context-Based State

```svelte
<!-- Provider.svelte -->
<script lang="ts">
  import { setContext } from 'svelte';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();

  let theme = $state<'light' | 'dark'>('light');

  setContext('theme', {
    get current() { return theme; },
    toggle: () => theme = theme === 'light' ? 'dark' : 'light'
  });
</script>

{@render children()}

<!-- Consumer.svelte -->
<script lang="ts">
  import { getContext } from 'svelte';

  const theme = getContext<{
    current: 'light' | 'dark';
    toggle: () => void;
  }>('theme');
</script>

<button onclick={theme.toggle}>
  Theme: {theme.current}
</button>
```

### Async State Pattern

```typescript
// lib/stores/async.svelte.ts
interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function createAsyncState<T>(fetcher: () => Promise<T>) {
  let state = $state<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  async function load() {
    state.loading = true;
    state.error = null;

    try {
      state.data = await fetcher();
    } catch (e) {
      state.error = e instanceof Error ? e : new Error(String(e));
    } finally {
      state.loading = false;
    }
  }

  return {
    get data() {
      return state.data;
    },
    get loading() {
      return state.loading;
    },
    get error() {
      return state.error;
    },
    load,
    reset: () => (state = { data: null, loading: false, error: null }),
  };
}
```

### Derived Store Pattern

```typescript
// lib/stores/cart.svelte.ts
export function createCart() {
  let items = $state<CartItem[]>([]);

  const total = $derived(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  const itemCount = $derived(
    items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return {
    get items() {
      return items;
    },
    get total() {
      return total;
    },
    get itemCount() {
      return itemCount;
    },

    add(product: Product, quantity = 1) {
      const existing = items.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        items.push({ ...product, quantity });
      }
    },

    remove(id: string) {
      const index = items.findIndex((i) => i.id === id);
      if (index !== -1) items.splice(index, 1);
    },

    clear() {
      items = [];
    },
  };
}
```

### Cross-Component State with Nanostores

For sharing state between Svelte and other frameworks in Astro:

```typescript
// stores/counter.ts
import { atom, computed } from "nanostores";

export const count = atom(0);
export const doubled = computed(count, (n) => n * 2);

export function increment() {
  count.set(count.get() + 1);
}
```

```svelte
<!-- Counter.svelte -->
<script lang="ts">
  import { count, increment } from '../stores/counter';
  import { useStore } from '@nanostores/svelte';

  const $count = useStore(count);
</script>

<button onclick={increment}>
  Count: {$count}
</button>
```

---

## Async Patterns

### Loading State Component

```svelte
<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';

  interface Props<T> {
    promise: Promise<T>;
    loading?: Snippet;
    error?: Snippet<[Error]>;
    children: Snippet<[T]>;
  }

  let { promise, loading, error, children }: Props<T> = $props();
</script>

{#await promise}
  {#if loading}
    {@render loading()}
  {:else}
    <p>Loading...</p>
  {/if}
{:then data}
  {@render children(data)}
{:catch e}
  {#if error}
    {@render error(e)}
  {:else}
    <p>Error: {e.message}</p>
  {/if}
{/await}
```

### Fetch with Effect

```svelte
<script lang="ts">
  let query = $state('');
  let results = $state<SearchResult[]>([]);
  let loading = $state(false);
  let error = $state<string | null>(null);

  $effect(() => {
    if (!query) {
      results = [];
      return;
    }

    const controller = new AbortController();
    loading = true;
    error = null;

    fetch(`/api/search?q=${encodeURIComponent(query)}`, {
      signal: controller.signal
    })
      .then(r => r.json())
      .then(data => {
        results = data;
        loading = false;
      })
      .catch(e => {
        if (e.name !== 'AbortError') {
          error = e.message;
          loading = false;
        }
      });

    return () => controller.abort();
  });
</script>

<input bind:value={query} placeholder="Search..." />

{#if loading}
  <p>Searching...</p>
{:else if error}
  <p class="error">{error}</p>
{:else}
  <ul>
    {#each results as result}
      <li>{result.title}</li>
    {/each}
  </ul>
{/if}
```

### Debounced Input

```svelte
<script lang="ts">
  let value = $state('');
  let debouncedValue = $state('');

  $effect(() => {
    const timeout = setTimeout(() => {
      debouncedValue = value;
    }, 300);

    return () => clearTimeout(timeout);
  });
</script>

<input bind:value />
<p>Debounced: {debouncedValue}</p>
```

---

## TypeScript Patterns

### Props Interface

```svelte
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
  }

  let { variant = 'primary', size = 'md', ...rest }: Props = $props();
</script>

<button class="{variant} {size}" {...rest}>
  <slot />
</button>
```

### Generic Components

```svelte
<script lang="ts" generics="T extends { id: string }">
  interface Props<T> {
    items: T[];
    selected?: T;
    onselect?: (item: T) => void;
    renderItem: import('svelte').Snippet<[T]>;
  }

  let { items, selected, onselect, renderItem }: Props<T> = $props();
</script>

<ul>
  {#each items as item (item.id)}
    <li
      class:selected={selected?.id === item.id}
      onclick={() => onselect?.(item)}
    >
      {@render renderItem(item)}
    </li>
  {/each}
</ul>
```

### Type-Safe Context

```typescript
// context.ts
import { getContext, setContext } from "svelte";

export interface ThemeContext {
  current: "light" | "dark";
  toggle: () => void;
}

const THEME_KEY = Symbol("theme");

export function setThemeContext(ctx: ThemeContext) {
  setContext(THEME_KEY, ctx);
}

export function getThemeContext(): ThemeContext {
  return getContext<ThemeContext>(THEME_KEY);
}
```

```svelte
<!-- Provider.svelte -->
<script lang="ts">
  import { setThemeContext } from './context';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();

  let theme = $state<'light' | 'dark'>('light');

  setThemeContext({
    get current() { return theme; },
    toggle: () => theme = theme === 'light' ? 'dark' : 'light'
  });
</script>

{@render children()}

<!-- Consumer.svelte -->
<script lang="ts">
  import { getThemeContext } from './context';

  const theme = getThemeContext();
</script>
```

### Discriminated Union Props

```svelte
<script lang="ts">
  type Props =
    | { variant: 'link'; href: string; onclick?: never }
    | { variant: 'button'; onclick: () => void; href?: never };

  let { variant, href, onclick }: Props = $props();
</script>

{#if variant === 'link'}
  <a {href} class="btn">
    <slot />
  </a>
{:else}
  <button {onclick} class="btn">
    <slot />
  </button>
{/if}
```
