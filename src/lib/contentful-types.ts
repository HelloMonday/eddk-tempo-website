import type { Entry, Asset, EntryFieldTypes } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

// Contentful Entry Skeleton Types
export interface BlogPostSkeleton {
  contentTypeId: 'blogPost';
  fields: {
    title: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    excerpt?: EntryFieldTypes.Text;
    content: EntryFieldTypes.RichText;
    featuredImage?: EntryFieldTypes.AssetLink;
    author?: EntryFieldTypes.Text;
    publishDate: EntryFieldTypes.Date;
    tags?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  };
}

export interface PageContentSkeleton {
  contentTypeId: 'landinPage';
  fields: {
    entryId: EntryFieldTypes.Text;
    title: EntryFieldTypes.Text;
    subtitle?: EntryFieldTypes.Text;
    description?: EntryFieldTypes.Text;
    metaDescription?: EntryFieldTypes.Text;
  };
}

// Resolved Entry Types (what you get after fetching)
export interface BlogPost {
  title: string;
  slug: string;
  excerpt?: string;
  content: Document;
  featuredImage?: {
    url: string;
    title: string;
    description?: string;
    width: number;
    height: number;
  };
  author?: string;
  publishDate: string;
  tags?: string[];
}

export interface PageContent {
  entryId: string;
  title: string;
  subtitle?: string;
  description?: string;
  metaDescription?: string;
}

// Helper to extract image data from Contentful Asset
export function parseAsset(asset: Asset<undefined, string> | undefined): BlogPost['featuredImage'] | undefined {
  if (!asset?.fields?.file) return undefined;

  const file = asset.fields.file;
  return {
    url: `https:${file.url}`,
    title: asset.fields.title || '',
    description: asset.fields.description,
    width: (file.details as { image?: { width: number; height: number } })?.image?.width || 0,
    height: (file.details as { image?: { width: number; height: number } })?.image?.height || 0,
  };
}

// Transform Contentful entry to our BlogPost type
export function parseBlogPost(entry: Entry<BlogPostSkeleton, undefined, string>): BlogPost {
  return {
    title: entry.fields.title as string,
    slug: entry.fields.slug as string,
    excerpt: entry.fields.excerpt as string | undefined,
    content: entry.fields.content as Document,
    featuredImage: parseAsset(entry.fields.featuredImage as Asset<undefined, string> | undefined),
    author: entry.fields.author as string | undefined,
    publishDate: entry.fields.publishDate as string,
    tags: entry.fields.tags as string[] | undefined,
  };
}

// Transform Contentful entry to our PageContent type
export function parsePageContent(entry: Entry<PageContentSkeleton, undefined, string>): PageContent {
  return {
    entryId: entry.fields.entryId as string,
    title: entry.fields.title as string,
    subtitle: entry.fields.subtitle as string | undefined,
    description: entry.fields.description as string | undefined,
    metaDescription: entry.fields.metaDescription as string | undefined,
  };
}
