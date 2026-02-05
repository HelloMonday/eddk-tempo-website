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
npx contentful-migration \
  --space-id YOUR_SPACE_ID \
  --access-token YOUR_CMA_TOKEN \
  migrations/create-landing-page.cjs \
  --yes
```

**Get CMA Token:** Contentful Dashboard → Settings → CMA tokens → Generate personal token

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

Open [http://localhost:4321](http://localhost:4321)

## Build

```bash
npm run build
```

Static files output to `dist/`

## Preview Build

```bash
npm run preview
```

## Content Models

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
├── migrations/          # Contentful content type migrations
├── scripts/            # Seed and utility scripts
├── src/
│   ├── layouts/        # Astro layouts
│   ├── lib/            # Contentful API and utilities
│   │   ├── contentful.ts
│   │   ├── contentful-types.ts
│   │   ├── contentful-api.ts
│   │   └── rich-text-renderer.ts
│   └── pages/
│       ├── index.astro      # Landing page (fetches from Contentful)
│       ├── logo.astro       # Logo animation demo
│       └── blog/
│           ├── index.astro  # Blog listing
│           └── [slug].astro # Blog post detail
└── .env                # Contentful credentials (gitignored)
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `CONTENTFUL_SPACE_ID` | Contentful space ID | Yes |
| `CONTENTFUL_ACCESS_TOKEN` | Content Delivery API token | Yes |
| `CONTENTFUL_PREVIEW_TOKEN` | Content Preview API token | No |
| `CONTENTFUL_ENVIRONMENT` | Environment name (default: master) | Yes |
| `CONTENTFUL_CMA_TOKEN` | Content Management API token (for migrations/seeds) | Only for migrations/seeds |

## Notes

- The landing page content is fetched from Contentful with fallback values
- Blog pages gracefully handle missing content types with empty states
- All Contentful API calls are made at build time (Static Site Generation)
