import type { Entry, Asset, EntryFieldTypes } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

// Contentful Entry Skeleton Types

// Navigation Link
export interface NavLinkSkeleton {
  contentTypeId: 'navLink';
  fields: {
    label: EntryFieldTypes.Text;
    url: EntryFieldTypes.Text;
  };
}

// Navigation Group (dropdown with multiple links)
export interface NavGroupSkeleton {
  contentTypeId: 'navGroup';
  fields: {
    label: EntryFieldTypes.Text;
    links: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<NavLinkSkeleton>>;
  };
}

// Header
export interface HeaderSkeleton {
  contentTypeId: 'header';
  fields: {
    name: EntryFieldTypes.Text;
    logo?: EntryFieldTypes.AssetLink;
    navItems?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<NavLinkSkeleton | NavGroupSkeleton>>;
    loginText?: EntryFieldTypes.Text;
    loginUrl?: EntryFieldTypes.Text;
  };
}

// Global Settings
export interface GlobalSkeleton {
  contentTypeId: 'global';
  fields: {
    name: EntryFieldTypes.Text;
    header?: EntryFieldTypes.EntryLink<HeaderSkeleton>;
  };
}

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

// Navigation types
export interface NavLink {
  label: string;
  url: string;
}

export interface NavGroup {
  label: string;
  links: NavLink[];
}

export type NavItem = NavLink | NavGroup;

export interface Header {
  name: string;
  logo?: {
    url: string;
    title: string;
    description?: string;
    width: number;
    height: number;
  };
  navItems: NavItem[];
  loginText?: string;
  loginUrl?: string;
}

export interface Global {
  name: string;
  header?: Header;
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

// Type guard to check if nav item is a NavGroup
export function isNavGroup(item: NavItem): item is NavGroup {
  return 'links' in item && Array.isArray(item.links);
}

// Transform Contentful entry to our NavLink type
export function parseNavLink(entry: Entry<NavLinkSkeleton, undefined, string>): NavLink {
  return {
    label: entry.fields.label as string,
    url: entry.fields.url as string,
  };
}

// Transform Contentful entry to our NavGroup type
export function parseNavGroup(entry: Entry<NavGroupSkeleton, undefined, string>): NavGroup {
  const links = (entry.fields.links || []) as Entry<NavLinkSkeleton, undefined, string>[];
  return {
    label: entry.fields.label as string,
    links: links.map(parseNavLink),
  };
}

// Transform Contentful nav item entry to NavItem
export function parseNavItem(
  entry: Entry<NavLinkSkeleton | NavGroupSkeleton, undefined, string>
): NavItem {
  const contentType = entry.sys.contentType.sys.id;
  if (contentType === 'navGroup') {
    return parseNavGroup(entry as Entry<NavGroupSkeleton, undefined, string>);
  }
  return parseNavLink(entry as Entry<NavLinkSkeleton, undefined, string>);
}

// Transform Contentful entry to our Header type
export function parseHeader(entry: Entry<HeaderSkeleton, undefined, string>): Header {
  const navItems = (entry.fields.navItems || []) as Entry<
    NavLinkSkeleton | NavGroupSkeleton,
    undefined,
    string
  >[];

  return {
    name: entry.fields.name as string,
    logo: parseAsset(entry.fields.logo as Asset<undefined, string> | undefined),
    navItems: navItems.map(parseNavItem),
    loginText: entry.fields.loginText as string | undefined,
    loginUrl: entry.fields.loginUrl as string | undefined,
  };
}

// Transform Contentful entry to our Global type
export function parseGlobal(entry: Entry<GlobalSkeleton, undefined, string>): Global {
  const headerEntry = entry.fields.header as Entry<HeaderSkeleton, undefined, string> | undefined;

  return {
    name: entry.fields.name as string,
    header: headerEntry ? parseHeader(headerEntry) : undefined,
  };
}
