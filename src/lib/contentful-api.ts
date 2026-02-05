import { getClient } from './contentful';
import {
  type BlogPost,
  type PageContent,
  type Global,
  type Header,
  type BlogPostSkeleton,
  type PageContentSkeleton,
  type GlobalSkeleton,
  type HeaderSkeleton,
  parseBlogPost,
  parsePageContent,
  parseGlobal,
  parseHeader,
} from './contentful-types';

// Blog Posts

export async function getAllBlogPosts(preview = false): Promise<BlogPost[]> {
  const client = getClient(preview);

  try {
    const response = await client.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      order: ['-fields.publishDate'],
      include: 2,
    });

    return response.items.map(parseBlogPost);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string, preview = false): Promise<BlogPost | null> {
  const client = getClient(preview);

  try {
    const response = await client.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
      include: 2,
    });

    if (response.items.length === 0) {
      return null;
    }

    return parseBlogPost(response.items[0]);
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}":`, error);
    return null;
  }
}

export async function getBlogPostSlugs(preview = false): Promise<string[]> {
  const client = getClient(preview);

  try {
    const response = await client.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      select: ['fields.slug'],
    });

    return response.items.map((item) => item.fields.slug as string);
  } catch (error) {
    console.error('Error fetching blog post slugs:', error);
    return [];
  }
}

// Landing Page Content

export async function getLandingPage(preview = false): Promise<PageContent | null> {
  const client = getClient(preview);

  try {
    const response = await client.getEntries<PageContentSkeleton>({
      content_type: 'landinPage',
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    return parsePageContent(response.items[0]);
  } catch (error) {
    console.error('Error fetching landing page:', error);
    return null;
  }
}

export async function getAllPageContent(preview = false): Promise<PageContent[]> {
  const client = getClient(preview);

  try {
    const response = await client.getEntries<PageContentSkeleton>({
      content_type: 'landinPage',
    });

    return response.items.map(parsePageContent);
  } catch (error) {
    console.error('Error fetching all page content:', error);
    return [];
  }
}

// Global Settings

export async function getGlobal(preview = false): Promise<Global | null> {
  const client = getClient(preview);

  try {
    const response = await client.getEntries<GlobalSkeleton>({
      content_type: 'global',
      limit: 1,
      include: 3, // Include nested references (header -> navItems -> links)
    });

    if (response.items.length === 0) {
      return null;
    }

    return parseGlobal(response.items[0]);
  } catch (error) {
    console.error('Error fetching global settings:', error);
    return null;
  }
}

export async function getHeader(preview = false): Promise<Header | null> {
  const client = getClient(preview);

  try {
    const response = await client.getEntries<HeaderSkeleton>({
      content_type: 'header',
      limit: 1,
      include: 2, // Include nested references (navItems -> links)
    });

    if (response.items.length === 0) {
      return null;
    }

    return parseHeader(response.items[0]);
  } catch (error) {
    console.error('Error fetching header:', error);
    return null;
  }
}
