import { createClient, type ContentfulClientApi } from 'contentful';

// Delivery client (published content)
const deliveryClient: ContentfulClientApi<undefined> = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
  environment: import.meta.env.CONTENTFUL_ENVIRONMENT || 'master',
});

// Preview client (draft content) - only if preview token is provided
const previewClient: ContentfulClientApi<undefined> | null = import.meta.env.CONTENTFUL_PREVIEW_TOKEN
  ? createClient({
      space: import.meta.env.CONTENTFUL_SPACE_ID,
      accessToken: import.meta.env.CONTENTFUL_PREVIEW_TOKEN,
      environment: import.meta.env.CONTENTFUL_ENVIRONMENT || 'master',
      host: 'preview.contentful.com',
    })
  : null;

// Get the appropriate client based on preview mode
export function getClient(preview = false): ContentfulClientApi<undefined> {
  if (preview && previewClient) {
    return previewClient;
  }
  return deliveryClient;
}

export { deliveryClient, previewClient };
