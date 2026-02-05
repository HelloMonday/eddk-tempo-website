# Svelte 5 Runes Reference

Complete reference for Svelte 5 runes with edge cases and advanced patterns.

## Contents

1. [$state](#state)
2. [$derived](#derived)
3. [$effect](#effect)
4. [$props](#props)
5. [$bindable](#bindable)
6. [$inspect](#inspect)
7. [Reactive Classes](#reactive-classes)
8. [.svelte.ts Files](#sveltets-files)

---

## $state

Declares reactive state that triggers updates when changed.

### Basic Usage

```typescript
let count = $state(0);
let name = $state("");
let items = $state<string[]>([]);
```

### Deep Reactivity

Objects and arrays are deeply reactive proxies:

```typescript
let user = $state({ name: "Alice", preferences: { theme: "dark" } });

// All mutations trigger updates
user.name = "Bob"; // ✓ reactive
user.preferences.theme = "light"; // ✓ reactive (deep)
```

### $state.raw — Shallow Reactivity

For large objects or when you don't need deep reactivity:

```typescript
let data = $state.raw({ items: largeArray });

// Mutations have NO effect
data.items.push(item); // ✗ not reactive

// Must reassign entirely
data = { items: [...data.items, item] }; // ✓ reactive
```

### $state.snapshot — Get Plain Object

Extract a non-reactive copy (useful for serialization):

```typescript
let form = $state({ name: "", email: "" });

function submit() {
  const data = $state.snapshot(form);
  // data is a plain object, safe to send
  fetch("/api", { body: JSON.stringify(data) });
}
```

### Destructuring Caveat

Destructured values lose reactivity:

```typescript
let user = $state({ name: "Alice" });

// ✗ Bad: loses reactivity
let { name } = user;

// ✓ Good: use $derived or access directly
let name = $derived(user.name);
```

---

## $derived

Computes values from reactive state. Automatically tracks dependencies.

### Basic Usage

```typescript
let count = $state(0);
let doubled = $derived(count * 2);
let isEven = $derived(count % 2 === 0);
```

### $derived.by — Complex Computations

For multi-statement derivations:

```typescript
let items = $state<Item[]>([]);

let summary = $derived.by(() => {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const count = items.length;
  return {
    total,
    count,
    average: count > 0 ? total / count : 0,
  };
});
```

### Dependency Tracking

Dependencies are tracked at runtime, not compile time:

```typescript
let condition = $state(true);
let a = $state(1);
let b = $state(2);

// Only re-runs when 'condition' changes, or when
// the currently-used value (a or b) changes
let value = $derived(condition ? a : b);
```

### Derived Can Be Overridden (Svelte 5.25+)

For optimistic UI patterns:

```svelte
<script lang="ts">
  let { post, like } = $props();
  let likes = $derived(post.likes);

  async function onclick() {
    likes += 1;  // Optimistic update
    try {
      await like();
    } catch {
      likes -= 1;  // Rollback on failure
    }
  }
</script>
```

---

## $effect

Runs side effects when dependencies change. Executes after DOM updates.

### Basic Usage

```typescript
let count = $state(0);

$effect(() => {
  console.log("Count is now:", count);
  document.title = `Count: ${count}`;
});
```

### Cleanup Function

Return a function to clean up before re-running or on destroy:

```typescript
$effect(() => {
  const controller = new AbortController();

  fetch("/api/data", { signal: controller.signal })
    .then((res) => res.json())
    .then((data) => {
      /* update state */
    });

  return () => controller.abort();
});
```

### $effect.pre — Before DOM Update

Runs before DOM changes (useful for measuring previous state):

```typescript
let element: HTMLDivElement;
let previousHeight = 0;

$effect.pre(() => {
  if (element) {
    previousHeight = element.offsetHeight;
  }
});
```

### $effect.tracking — Check If Inside Effect

```typescript
function doSomething() {
  if ($effect.tracking()) {
    // Inside a reactive context
  }
}
```

### $effect.root — Unowned Effect

Creates effect outside component lifecycle:

```typescript
const cleanup = $effect.root(() => {
  $effect(() => {
    // This effect lives until cleanup() is called
  });
});

// Later...
cleanup();
```

### When NOT to Use $effect

Avoid using `$effect` to sync state — use `$derived` instead:

```typescript
// ✗ Bad: using effect to derive state
let count = $state(0);
let doubled = $state(0);
$effect(() => {
  doubled = count * 2; // Anti-pattern!
});

// ✓ Good: use $derived
let doubled = $derived(count * 2);
```

Valid uses for `$effect`:

- DOM manipulation
- Logging/analytics
- Subscriptions to external stores
- Browser APIs (localStorage, timers, etc.)

---

## $props

Declares component props. Replaces `export let`.

### Basic Props

```svelte
<script lang="ts">
  let { name, count = 0 } = $props();
</script>
```

### Typed Props

```svelte
<script lang="ts">
  interface Props {
    title: string;
    count?: number;
    items: string[];
    onchange?: (value: string) => void;
  }

  let { title, count = 0, items, onchange }: Props = $props();
</script>
```

### Rest Props

```svelte
<script lang="ts">
  let { class: className, ...rest } = $props();
</script>

<div class={className} {...rest}>
  <!-- rest props spread to element -->
</div>
```

### Renaming Props

```svelte
<script lang="ts">
  // Rename reserved words or invalid identifiers
  let { class: className, 'data-id': dataId } = $props();
</script>
```

### Children Snippet

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children?: Snippet } = $props();
</script>

{@render children?.()}
```

### Props with Generics

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

---

## $bindable

Makes a prop bindable for two-way data flow.

### Usage

```svelte
<!-- Input.svelte -->
<script lang="ts">
  let { value = $bindable('') } = $props();
</script>

<input bind:value />

<!-- Parent.svelte -->
<script lang="ts">
  import Input from './Input.svelte';
  let text = $state('');
</script>

<Input bind:value={text} />
<p>Text: {text}</p>
```

### With Type

```svelte
<script lang="ts">
  let { value = $bindable<string>('') }: { value: string } = $props();
</script>
```

---

## $inspect

Development-only logging that triggers on state changes.

```typescript
let count = $state(0);
let user = $state({ name: "Alice" });

// Logs whenever count or user changes
$inspect(count, user);

// With custom handler
$inspect(count).with((type, value) => {
  console.log(`${type}:`, value);
  // type is 'init' or 'update'
});
```

**Note:** `$inspect` is stripped in production builds.

---

## Reactive Classes

Use `$state` in class fields for reactive class instances:

```typescript
class Counter {
  count = $state(0);
  doubled = $derived(this.count * 2);

  increment() {
    this.count++;
  }
}

// In component
let counter = new Counter();
```

### Private Fields

```typescript
class Store {
  #internal = $state(0);

  get value() {
    return this.#internal;
  }

  set value(v: number) {
    this.#internal = v;
  }
}
```

---

## .svelte.ts Files

Use runes outside components in `.svelte.ts` (or `.svelte.js`) files:

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

### Shared State Pattern

```typescript
// store.svelte.ts
function createAppState() {
  let user = $state<User | null>(null);
  let theme = $state<"light" | "dark">("light");

  return {
    get user() {
      return user;
    },
    set user(v) {
      user = v;
    },
    get theme() {
      return theme;
    },
    toggleTheme: () => (theme = theme === "light" ? "dark" : "light"),
  };
}

export const appState = createAppState();
```

### Important: Getters Required for Reactivity

When returning state from functions, use getters to maintain reactivity:

```typescript
// ✗ Bad: loses reactivity when destructured
function createStore() {
  let value = $state(0);
  return { value }; // value is captured at creation time
}

// ✓ Good: getter maintains reactivity
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
