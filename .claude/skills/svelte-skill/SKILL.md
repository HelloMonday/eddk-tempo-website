---
name: svelte
description: Svelte 5 component development using runes syntax. Use when writing Svelte components (.svelte files), using runes ($state, $derived, $effect, $props, $bindable), creating reactive state, component props, snippets, context, or Svelte-specific patterns. Triggers for Svelte reactivity, component composition, two-way binding, or .svelte.ts files.
user-invocable: false
---

# Svelte 5 Components

Build reactive UI components using Svelte 5 runes syntax for use in Astro islands or standalone Svelte apps.

## Core Principles

1. **Runes over legacy syntax** — Use `$state`, `$derived`, `$effect`, `$props` instead of `let`, `$:`, `export let`
2. **Snippets over slots** — Use `{#snippet}` and `{@render}` for component composition
3. **Callback props over events** — Pass `onclick` props instead of `dispatch('click')`
4. **Getters for reactivity** — Return getters from stores to maintain reactivity
5. **$derived over $effect** — Don't use `$effect` to sync state; use `$derived`

## Runes Quick Reference

### $state — Reactive State

```svelte
<script lang="ts">
  let count = $state(0);
  let items = $state<string[]>([]);

  // Objects and arrays are deeply reactive
  let user = $state({ name: 'Alice', age: 30 });
</script>

<button onclick={() => count++}>Count: {count}</button>
```

### $derived — Computed Values

```svelte
<script lang="ts">
  let count = $state(0);
  let doubled = $derived(count * 2);

  // Complex derivations with $derived.by
  let stats = $derived.by(() => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    return { total, average: total / items.length };
  });
</script>
```

### $effect — Side Effects

```svelte
<script lang="ts">
  let query = $state('');

  // Runs after mount and when dependencies change
  $effect(() => {
    console.log('Query changed:', query);
    // Return cleanup function (optional)
    return () => console.log('Cleanup');
  });

  // Pre-effect (runs before DOM update)
  $effect.pre(() => {
    // Access previous DOM state
  });
</script>
```

### $props — Component Props

```svelte
<script lang="ts">
  // Destructure with defaults
  let {
    title,
    count = 0,
    onchange,
    children
  }: {
    title: string;
    count?: number;
    onchange?: (value: number) => void;
    children?: import('svelte').Snippet;
  } = $props();
</script>

<h1>{title}</h1>
{@render children?.()}
```

### $bindable — Two-way Binding Props

```svelte
<script lang="ts">
  let { value = $bindable('') } = $props();
</script>

<input bind:value />
```

## Component Patterns

### Snippets (Replacing Slots)

```svelte
<!-- Parent.svelte -->
<script lang="ts">
  import Card from './Card.svelte';
</script>

<Card>
  {#snippet header()}
    <h2>Title</h2>
  {/snippet}

  {#snippet default()}
    <p>Content goes here</p>
  {/snippet}
</Card>

<!-- Card.svelte -->
<script lang="ts">
  let { header, children }: {
    header?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
  } = $props();
</script>

<div class="card">
  {#if header}
    <header>{@render header()}</header>
  {/if}
  {@render children?.()}
</div>
```

### Typed Snippets with Arguments

```svelte
<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';

  interface Props<T> {
    items: T[];
    row: Snippet<[T, number]>;
    empty?: Snippet;
  }

  let { items, row, empty }: Props<T> = $props();
</script>

{#if items.length === 0 && empty}
  {@render empty()}
{:else}
  {#each items as item, i}
    {@render row(item, i)}
  {/each}
{/if}

<!-- Usage -->
<DataTable {items}>
  {#snippet row(user, index)}
    <tr class:even={index % 2 === 0}>
      <td>{user.name}</td>
    </tr>
  {/snippet}
</DataTable>
```

### Event Handling

```svelte
<script lang="ts">
  // Callback props (preferred over custom events)
  let { onclick }: { onclick?: (e: MouseEvent) => void } = $props();
</script>

<!-- Native events use lowercase -->
<button onclick={(e) => onclick?.(e)}>Click</button>

<!-- Event modifiers via wrapper -->
<button onclick={(e) => {
  e.preventDefault();
  e.stopPropagation();
  // handle...
}}>Submit</button>
```

### Context API

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

## Shared State (.svelte.ts files)

Use runes outside components in `.svelte.ts` files:

```typescript
// counter.svelte.ts
export function createCounter(initial = 0) {
  let count = $state(initial);

  return {
    get count() {
      return count;
    },
    increment: () => count++,
    decrement: () => count--,
    reset: () => (count = initial),
  };
}
```

```svelte
<!-- Component.svelte -->
<script lang="ts">
  import { createCounter } from './counter.svelte';

  const counter = createCounter(10);
</script>

<button onclick={counter.increment}>
  Count: {counter.count}
</button>
```

### Important: Getters Required for Reactivity

```typescript
// BAD: loses reactivity when destructured
function createStore() {
  let value = $state(0);
  return { value }; // value is captured at creation time
}

// GOOD: getter maintains reactivity
function createStore() {
  let value = $state(0);
  return {
    get value() {
      return value;
    },
    set value(v) {
      value = v;
    },
  };
}
```

## TypeScript Patterns

### Component Props Interface

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
<script lang="ts" generics="T">
  interface Props<T> {
    items: T[];
    selected?: T;
    onselect?: (item: T) => void;
  }

  let { items, selected, onselect }: Props<T> = $props();
</script>
```

## Using Svelte in Astro

Svelte components hydrate as islands in Astro:

```astro
---
import Counter from '../components/Counter.svelte';
import Toggle from '../components/Toggle.svelte';
---

<!-- Hydrate immediately -->
<Counter client:load />

<!-- Hydrate when visible -->
<Toggle client:visible />

<!-- No hydration (static) -->
<Counter />
```

## Resources

For detailed patterns and advanced topics:

- **references/runes.md** — Complete runes reference with edge cases
- **references/patterns.md** — Component patterns and state management
