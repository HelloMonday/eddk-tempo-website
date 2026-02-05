import { getClient } from './contentful';
import {
  type BlogPost,
  type PageContent,
  type BlogPostSkeleton,
  type PageContentSkeleton,
  parseBlogPost,
  parsePageContent,
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
