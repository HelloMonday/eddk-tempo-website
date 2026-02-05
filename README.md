# EDDK Tempo Website

Astro website with GSAP, Three.js, and Contentful CMS integration.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Contentful**

   Update `.env` with your Contentful credentials:
   ```env
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
   CONTENTFUL_PREVIEW_TOKEN=your_preview_api_token
   CONTENTFUL_ENVIRONMENT=master
   ```

   Get these from: Contentful Dashboard → Settings → API keys

## Contentful Setup

### Create Content Types (Migration)

Run migrations to create content models in your Contentful space:

```bash
# Landing page content type
npx contentful-migration \
  --space-id YOUR_SPACE_ID \
  --access-token YOUR_CMA_TOKEN \
  migrations/create-landing-page.cjs \
  --yes

# Header, navigation, and global content types
npx contentful-migration \
  --space-id YOUR_SPACE_ID \
  --access-token YOUR_CMA_TOKEN \
  migrations/create-header.cjs \
  --yes
```

**Get CMA Token:** Contentful Dashboard → Settings → CMA tokens → Generate personal token

### Generate TypeScript Types

Auto-generate TypeScript declarations from your Contentful space:

```bash
CONTENTFUL_MANAGEMENT_TOKEN=your_cma_token npm run generate-types
```

This creates `src/lib/contentful-types.generated.ts` with:
- Skeleton types for Contentful API queries
- Resolved types for use in components
- Proper field relationships and references

### Seed Content

Create and publish initial content (uses unique IDs to prevent duplicates):

```bash
CONTENTFUL_CMA_TOKEN=your_cma_token node scripts/seed-content.mjs
```

**How it works:**
- Uses unique identifiers (`entryId` for landing pages, `slug` for blog posts)
- **Updates** existing entries if ID matches
- **Creates** new entries if ID doesn't exist
- Safe to run multiple times - no duplicates

Or add to `package.json` scripts:
```json
{
  "scripts": {
    "seed": "node scripts/seed-content.mjs"
  }
}
```

Then run:
```bash
CONTENTFUL_CMA_TOKEN=your_cma_token npm run seed
```

## Development

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321). Static files output to `dist/` on build.

## Content Models

### global
- **name** (Text, required, unique): Identifier for global settings
- **header** (Reference → header): Site header

### header
- **name** (Text, required, unique): Identifier for the header
- **logo** (Media, image): SVG or image logo
- **navItems** (References → navLink | navGroup): Navigation items
- **loginText** (Text): Login button text
- **loginUrl** (Text): Login button URL

### navLink
- **label** (Text, required): Link display text
- **url** (Text, required): Link URL

### navGroup
- **label** (Text, required): Dropdown label
- **links** (References → navLink, required): Links in the dropdown

### landinPage
- **entryId** (Text, required, unique): Unique identifier (e.g., "main-landing-page")
- **title** (Text, required): Main heading for the landing page

### blogPost (optional)
- **title** (Text, required)
- **slug** (Text, required, unique): URL-friendly identifier
- **excerpt** (Long text)
- **content** (Rich text, required)
- **featuredImage** (Media)
- **author** (Text)
- **publishDate** (Date, required)
- **tags** (Text list)

> **Note:** The `entryId` (for landinPage) and `slug` (for blogPost) fields are used by the seed script to identify and update existing entries.

## Project Structure

```
/
├── migrations/                    # Contentful content type migrations
│   ├── create-landing-page.cjs   # Landing page content type
│   └── create-header.cjs         # Header, nav, and global content types
├── scripts/
│   ├── seed-content.mjs          # Seed initial content
│   └── generate-types.mjs        # Generate TypeScript from Contentful
├── src/
│   ├── layouts/                  # Astro layouts
│   ├── lib/                      # Contentful API and utilities
│   │   ├── contentful.ts         # Client setup
│   │   ├── contentful-types.ts   # Manual TypeScript types + parsers
│   │   ├── contentful-types.generated.ts  # Auto-generated types
│   │   ├── contentful-api.ts     # API fetch functions
│   │   └── rich-text-renderer.ts # Rich text to HTML
│   └── pages/
│       ├── index.astro           # Landing page
│       ├── logo.astro            # Logo animation demo
│       └── blog/
│           ├── index.astro       # Blog listing
│           └── [slug].astro      # Blog post detail
└── .env                          # Contentful credentials (gitignored)
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `CONTENTFUL_SPACE_ID` | Contentful space ID | Yes |
| `CONTENTFUL_ACCESS_TOKEN` | Content Delivery API token | Yes |
| `CONTENTFUL_PREVIEW_TOKEN` | Content Preview API token | No |
| `CONTENTFUL_ENVIRONMENT` | Environment name (default: master) | Yes |
| `CONTENTFUL_CMA_TOKEN` | Content Management API token (for seeds) | Only for seeds |
| `CONTENTFUL_MANAGEMENT_TOKEN` | CMA token (for migrations/type generation) | Only for migrations |

## npm Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run seed` | Seed content to Contentful |
| `npm run generate-types` | Generate TypeScript types from Contentful |

## Notes

- The landing page content is fetched from Contentful with fallback values
- Blog pages gracefully handle missing content types with empty states
- All Contentful API calls are made at build time (Static Site Generation)
