import { documentToHtmlString, type Options } from '@contentful/rich-text-html-renderer';
import { BLOCKS, INLINES, type Document } from '@contentful/rich-text-types';

// Custom rendering options for Contentful Rich Text
const defaultOptions: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, next) => `<p>${next(node.content)}</p>`,
    [BLOCKS.HEADING_1]: (node, next) => `<h1>${next(node.content)}</h1>`,
    [BLOCKS.HEADING_2]: (node, next) => `<h2>${next(node.content)}</h2>`,
    [BLOCKS.HEADING_3]: (node, next) => `<h3>${next(node.content)}</h3>`,
    [BLOCKS.HEADING_4]: (node, next) => `<h4>${next(node.content)}</h4>`,
    [BLOCKS.HEADING_5]: (node, next) => `<h5>${next(node.content)}</h5>`,
    [BLOCKS.HEADING_6]: (node, next) => `<h6>${next(node.content)}</h6>`,
    [BLOCKS.UL_LIST]: (node, next) => `<ul>${next(node.content)}</ul>`,
    [BLOCKS.OL_LIST]: (node, next) => `<ol>${next(node.content)}</ol>`,
    [BLOCKS.LIST_ITEM]: (node, next) => `<li>${next(node.content)}</li>`,
    [BLOCKS.QUOTE]: (node, next) => `<blockquote>${next(node.content)}</blockquote>`,
    [BLOCKS.HR]: () => '<hr />',
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { title, description, file } = node.data.target.fields;
      const url = file?.url ? `https:${file.url}` : '';
      const alt = description || title || '';

      if (file?.contentType?.startsWith('image/')) {
        return `<figure>
          <img src="${url}" alt="${alt}" loading="lazy" />
          ${title ? `<figcaption>${title}</figcaption>` : ''}
        </figure>`;
      }

      // For non-image assets, provide a download link
      return `<a href="${url}" download>${title || 'Download file'}</a>`;
    },
    [INLINES.HYPERLINK]: (node, next) => {
      const { uri } = node.data;
      // Add target="_blank" for external links
      const isExternal = uri.startsWith('http://') || uri.startsWith('https://');
      const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${uri}"${attrs}>${next(node.content)}</a>`;
    },
  },
};

// Convert Contentful Rich Text document to HTML string
export function renderRichText(document: Document, options?: Options): string {
  if (!document) {
    return '';
  }

  const mergedOptions: Options = {
    ...defaultOptions,
    ...options,
    renderNode: {
      ...defaultOptions.renderNode,
      ...options?.renderNode,
    },
  };

  return documentToHtmlString(document, mergedOptions);
}

// Export types for external use
export type { Document, Options };
