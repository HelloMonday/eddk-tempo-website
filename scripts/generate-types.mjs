#!/usr/bin/env node

/**
 * Generates TypeScript declarations from Contentful content types
 * Usage: node scripts/generate-types.mjs
 */

import contentful from 'contentful-management';
import fs from 'fs';
import path from 'path';

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID || 'jmknojkteiuy';
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || 'master';
const ACCESS_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!ACCESS_TOKEN) {
  console.error('Error: CONTENTFUL_MANAGEMENT_TOKEN environment variable is required');
  console.error('Usage: CONTENTFUL_MANAGEMENT_TOKEN=your-token node scripts/generate-types.mjs');
  process.exit(1);
}

const client = contentful.createClient({
  accessToken: ACCESS_TOKEN,
});

// Map Contentful field types to TypeScript types
function mapFieldType(field) {
  const { type, linkType, items, validations } = field;

  switch (type) {
    case 'Symbol':
    case 'Text':
      return 'EntryFieldTypes.Text';
    case 'Integer':
    case 'Number':
      return 'EntryFieldTypes.Number';
    case 'Date':
      return 'EntryFieldTypes.Date';
    case 'Boolean':
      return 'EntryFieldTypes.Boolean';
    case 'Location':
      return 'EntryFieldTypes.Location';
    case 'RichText':
      return 'EntryFieldTypes.RichText';
    case 'Object':
      return 'EntryFieldTypes.Object';
    case 'Link':
      if (linkType === 'Asset') {
        return 'EntryFieldTypes.AssetLink';
      }
      if (linkType === 'Entry') {
        const linkContentTypes = validations?.find((v) => v.linkContentType)?.linkContentType;
        if (linkContentTypes && linkContentTypes.length > 0) {
          const types = linkContentTypes.map((ct) => `${pascalCase(ct)}Skeleton`).join(' | ');
          return `EntryFieldTypes.EntryLink<${types}>`;
        }
        return 'EntryFieldTypes.EntryLink<EntrySkeletonType>';
      }
      return 'EntryFieldTypes.EntryLink<EntrySkeletonType>';
    case 'Array':
      if (items) {
        if (items.type === 'Symbol') {
          return 'EntryFieldTypes.Array<EntryFieldTypes.Symbol>';
        }
        if (items.type === 'Link' && items.linkType === 'Entry') {
          const linkContentTypes = items.validations?.find((v) => v.linkContentType)?.linkContentType;
          if (linkContentTypes && linkContentTypes.length > 0) {
            const types = linkContentTypes.map((ct) => `${pascalCase(ct)}Skeleton`).join(' | ');
            return `EntryFieldTypes.Array<EntryFieldTypes.EntryLink<${types}>>`;
          }
          return 'EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>';
        }
        if (items.type === 'Link' && items.linkType === 'Asset') {
          return 'EntryFieldTypes.Array<EntryFieldTypes.AssetLink>';
        }
      }
      return 'EntryFieldTypes.Array<EntryFieldTypes.Symbol>';
    default:
      return 'unknown';
  }
}

// Map Contentful field types to resolved TypeScript types
function mapResolvedType(field) {
  const { type, linkType, items, validations } = field;

  switch (type) {
    case 'Symbol':
    case 'Text':
      return 'string';
    case 'Integer':
    case 'Number':
      return 'number';
    case 'Date':
      return 'string';
    case 'Boolean':
      return 'boolean';
    case 'Location':
      return '{ lat: number; lon: number }';
    case 'RichText':
      return 'Document';
    case 'Object':
      return 'Record<string, unknown>';
    case 'Link':
      if (linkType === 'Asset') {
        return 'ContentfulAsset';
      }
      if (linkType === 'Entry') {
        const linkContentTypes = validations?.find((v) => v.linkContentType)?.linkContentType;
        if (linkContentTypes && linkContentTypes.length > 0) {
          return linkContentTypes.map((ct) => pascalCase(ct)).join(' | ');
        }
        return 'unknown';
      }
      return 'unknown';
    case 'Array':
      if (items) {
        if (items.type === 'Symbol') {
          return 'string[]';
        }
        if (items.type === 'Link' && items.linkType === 'Entry') {
          const linkContentTypes = items.validations?.find((v) => v.linkContentType)?.linkContentType;
          if (linkContentTypes && linkContentTypes.length > 0) {
            const types = linkContentTypes.map((ct) => pascalCase(ct)).join(' | ');
            return `(${types})[]`;
          }
          return 'unknown[]';
        }
        if (items.type === 'Link' && items.linkType === 'Asset') {
          return 'ContentfulAsset[]';
        }
      }
      return 'string[]';
    default:
      return 'unknown';
  }
}

// Convert string to PascalCase
function pascalCase(str) {
  return str
    .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
    .replace(/^\w/, (c) => c.toUpperCase());
}

// Convert string to camelCase
function camelCase(str) {
  return str
    .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
    .replace(/^\w/, (c) => c.toLowerCase());
}

// Generate skeleton interface for a content type
function generateSkeleton(contentType) {
  const name = pascalCase(contentType.sys.id);
  const fields = contentType.fields || [];

  let code = `export interface ${name}Skeleton {\n`;
  code += `  contentTypeId: '${contentType.sys.id}';\n`;
  code += `  fields: {\n`;

  for (const field of fields) {
    const optional = field.required ? '' : '?';
    const fieldType = mapFieldType(field);
    code += `    ${field.id}${optional}: ${fieldType};\n`;
  }

  code += `  };\n`;
  code += `}\n`;

  return code;
}

// Generate resolved interface for a content type
function generateResolved(contentType) {
  const name = pascalCase(contentType.sys.id);
  const fields = contentType.fields || [];

  let code = `export interface ${name} {\n`;

  for (const field of fields) {
    const optional = field.required ? '' : '?';
    const fieldType = mapResolvedType(field);
    code += `  ${field.id}${optional}: ${fieldType};\n`;
  }

  code += `}\n`;

  return code;
}

async function main() {
  console.log('Fetching content types from Contentful...');

  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT_ID);
  const contentTypes = await environment.getContentTypes();

  console.log(`Found ${contentTypes.items.length} content types`);

  // Check if any content type uses RichText
  const usesRichText = contentTypes.items.some((ct) =>
    ct.fields?.some((f) => f.type === 'RichText')
  );

  // Check if any content type uses Asset links
  const usesAssets = contentTypes.items.some((ct) =>
    ct.fields?.some(
      (f) =>
        (f.type === 'Link' && f.linkType === 'Asset') ||
        (f.type === 'Array' && f.items?.type === 'Link' && f.items?.linkType === 'Asset')
    )
  );

  // Generate imports
  let output = `// Auto-generated by scripts/generate-types.mjs\n`;
  output += `// Do not edit manually - regenerate with: npm run generate-types\n\n`;
  output += `import type { Entry, Asset, EntryFieldTypes, EntrySkeletonType } from 'contentful';\n`;

  if (usesRichText) {
    output += `import type { Document } from '@contentful/rich-text-types';\n`;
  }

  output += `\n`;

  // Add ContentfulAsset type if needed
  if (usesAssets) {
    output += `// Resolved asset type\n`;
    output += `export interface ContentfulAsset {\n`;
    output += `  url: string;\n`;
    output += `  title: string;\n`;
    output += `  description?: string;\n`;
    output += `  width?: number;\n`;
    output += `  height?: number;\n`;
    output += `  contentType?: string;\n`;
    output += `}\n\n`;
  }

  // Generate skeleton types
  output += `// Contentful Entry Skeleton Types\n\n`;
  for (const contentType of contentTypes.items) {
    output += generateSkeleton(contentType);
    output += `\n`;
  }

  // Generate resolved types
  output += `// Resolved Entry Types (what you get after fetching and parsing)\n\n`;
  for (const contentType of contentTypes.items) {
    output += generateResolved(contentType);
    output += `\n`;
  }

  // Write to file
  const outputPath = path.join(process.cwd(), 'src/lib/contentful-types.generated.ts');
  fs.writeFileSync(outputPath, output);

  console.log(`\nGenerated types written to: ${outputPath}`);
  console.log('\nContent types processed:');
  for (const ct of contentTypes.items) {
    console.log(`  - ${ct.sys.id} (${ct.fields?.length || 0} fields)`);
  }
}

main().catch((error) => {
  console.error('Error generating types:', error);
  process.exit(1);
});
