import { c as createComponent, r as renderComponent, a as renderTemplate, b as createAstro, m as maybeRenderHead, d as addAttribute, u as unescapeHTML } from '../../chunks/astro/server_0DCQ29kV.mjs';
import 'piccolore';
import { g as getBlogPostBySlug, $ as $$Layout, a as getAllBlogPosts } from '../../chunks/Layout_Dj1vS6Bd.mjs';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { INLINES, BLOCKS } from '@contentful/rich-text-types';
/* empty css                                     */
export { r as renderers } from '../../chunks/_@astro-renderers_2Ab_vIEa.mjs';

const defaultOptions = {
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
    [BLOCKS.HR]: () => "<hr />",
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { title, description, file } = node.data.target.fields;
      const url = file?.url ? `https:${file.url}` : "";
      const alt = description || title || "";
      if (file?.contentType?.startsWith("image/")) {
        return `<figure>
          <img src="${url}" alt="${alt}" loading="lazy" />
          ${title ? `<figcaption>${title}</figcaption>` : ""}
        </figure>`;
      }
      return `<a href="${url}" download>${title || "Download file"}</a>`;
    },
    [INLINES.HYPERLINK]: (node, next) => {
      const { uri } = node.data;
      const isExternal = uri.startsWith("http://") || uri.startsWith("https://");
      const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${uri}"${attrs}>${next(node.content)}</a>`;
    }
  }
};
function renderRichText(document, options) {
  if (!document) {
    return "";
  }
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    renderNode: {
      ...defaultOptions.renderNode,
      ...options?.renderNode
    }
  };
  return documentToHtmlString(document, mergedOptions);
}

const $$Astro = createAstro();
async function getStaticPaths() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const { post } = Astro2.props;
  const blogPost = post || await getBlogPostBySlug(slug);
  if (!blogPost) {
    return Astro2.redirect("/blog");
  }
  const contentHtml = renderRichText(blogPost.content);
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": blogPost.title, "data-astro-cid-4sn4zg3r": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-4sn4zg3r> <article class="container" data-astro-cid-4sn4zg3r> <header data-astro-cid-4sn4zg3r> <nav class="back-link" data-astro-cid-4sn4zg3r> <a href="/blog" data-astro-cid-4sn4zg3r>&larr; Back to Blog</a> </nav> <time${addAttribute(blogPost.publishDate, "datetime")} data-astro-cid-4sn4zg3r> ${formatDate(blogPost.publishDate)} </time> <h1 data-astro-cid-4sn4zg3r>${blogPost.title}</h1> ${blogPost.excerpt && renderTemplate`<p class="excerpt" data-astro-cid-4sn4zg3r>${blogPost.excerpt}</p>`} <div class="meta" data-astro-cid-4sn4zg3r> ${blogPost.author && renderTemplate`<span class="author" data-astro-cid-4sn4zg3r>By ${blogPost.author}</span>`} ${blogPost.tags && blogPost.tags.length > 0 && renderTemplate`<div class="tags" data-astro-cid-4sn4zg3r> ${blogPost.tags.map((tag) => renderTemplate`<span class="tag" data-astro-cid-4sn4zg3r>${tag}</span>`)} </div>`} </div> </header> ${blogPost.featuredImage && renderTemplate`<figure class="featured-image" data-astro-cid-4sn4zg3r> <img${addAttribute(blogPost.featuredImage.url, "src")}${addAttribute(blogPost.featuredImage.title, "alt")}${addAttribute(blogPost.featuredImage.width, "width")}${addAttribute(blogPost.featuredImage.height, "height")} data-astro-cid-4sn4zg3r> </figure>`} <div class="content" data-astro-cid-4sn4zg3r>${unescapeHTML(contentHtml)}</div> </article> </main> ` })} `;
}, "/Users/serguei/_dev/work/eddk-tempo-website/src/pages/blog/[slug].astro", void 0);

const $$file = "/Users/serguei/_dev/work/eddk-tempo-website/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
