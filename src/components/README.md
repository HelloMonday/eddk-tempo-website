# Header Component

A responsive, accessible header component that fetches navigation data from Contentful.

## Features

- **Fully responsive** - Desktop and mobile layouts with smooth transitions
- **Dropdown navigation** - Support for grouped navigation items
- **Contentful CMS integration** - Fetches header data from Contentful
- **Accessible** - ARIA labels, keyboard navigation, and focus management
- **Mobile menu** - Hamburger menu with slide-in navigation
- **Fixed positioning** - Stays at the top of the viewport with backdrop blur
- **Type-safe** - Full TypeScript support with generated types

## Usage

### Automatic fetching (recommended)

The component automatically fetches header data from Contentful:

```astro
---
import Header from '../components/Header.astro';
---

<Header />
```

### With pre-fetched data

You can also pass header data directly to avoid duplicate fetches:

```astro
---
import Header from '../components/Header.astro';
import { getHeader } from '../lib/contentful-api';

const header = await getHeader();
---

<Header header={header} />
```

## Content Structure

The Header component expects the following Contentful content structure:

### Header Entry

```typescript
interface Header {
  name: string; // Identifier
  logo?: ContentfulAsset; // Logo image (optional)
  navItems?: (NavLink | NavGroup)[]; // Navigation items
  loginText?: string; // Login button text
  loginUrl?: string; // Login button URL
}
```

### Navigation Types

**NavLink** - Simple link:

```typescript
interface NavLink {
  label: string; // Link text
  url: string; // Link destination
}
```

**NavGroup** - Dropdown menu:

```typescript
interface NavGroup {
  label: string; // Group label
  links: NavLink[]; // Links in dropdown
}
```

## Styling

The component uses scoped styles with CSS custom properties. Colors and spacing are defined inline for easy customization.

### Key style variables

- Background: `rgba(10, 10, 10, 0.8)` with backdrop blur
- Border: `rgba(255, 255, 255, 0.1)`
- Text: White with varying opacity
- Mobile breakpoint: `968px`
- Small mobile breakpoint: `640px`

## Accessibility

- Proper ARIA attributes for dropdowns and menus
- Keyboard navigation support
- Focus management for mobile menu
- Semantic HTML structure
- Screen reader friendly

## Mobile Behavior

- Hamburger menu appears below 968px
- Full-screen mobile navigation
- Animated transitions
- Body scroll lock when menu is open
- Touch-friendly hit targets

## Examples

### With logo and login

```typescript
// In Contentful:
{
  name: "Main Header",
  logo: {
    url: "/logo.svg",
    title: "Company Logo"
  },
  navItems: [
    { label: "Home", url: "/" },
    { label: "About", url: "/about" },
    {
      label: "Products",
      links: [
        { label: "Product A", url: "/products/a" },
        { label: "Product B", url: "/products/b" }
      ]
    }
  ],
  loginText: "Sign In",
  loginUrl: "/login"
}
```

### Minimal (just navigation)

```typescript
{
  name: "Simple Header",
  navItems: [
    { label: "Home", url: "/" },
    { label: "Blog", url: "/blog" }
  ]
}
```

## Layout Integration

The header is automatically included in the base Layout component. Make sure to add padding to your body content to account for the fixed header height (73px desktop, 65px mobile).

```astro
<!-- Already included in Layout.astro -->
<style is:global>
  body {
    padding-top: 73px;
  }

  @media (max-width: 640px) {
    body {
      padding-top: 65px;
    }
  }
</style>
```
