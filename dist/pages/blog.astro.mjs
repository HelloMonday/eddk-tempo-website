import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_0DCQ29kV.mjs';
import 'piccolore';
import { a as getAllBlogPosts, $ as $$Layout } from '../chunks/Layout_Dj1vS6Bd.mjs';
/* empty css                                 */
export { r as renderers } from '../chunks/_@astro-renderers_2Ab_vIEa.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getAllBlogPosts();
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog", "data-astro-cid-5tznm7mj": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-5tznm7mj> <div class="container" data-astro-cid-5tznm7mj> <header data-astro-cid-5tznm7mj> <h1 data-astro-cid-5tznm7mj>Blog</h1> <p class="description" data-astro-cid-5tznm7mj>Latest articles and updates</p> </header> ${posts.length === 0 ? renderTemplate`<div class="empty-state" data-astro-cid-5tznm7mj> <p data-astro-cid-5tznm7mj>No blog posts yet.</p> <p class="hint" data-astro-cid-5tznm7mj>Add blog posts in Contentful to see them here.</p> </div>` : renderTemplate`<div class="posts-grid" data-astro-cid-5tznm7mj> ${posts.map((post) => renderTemplate`<article class="post-card" data-astro-cid-5tznm7mj> ${post.featuredImage && renderTemplate`<a${addAttribute(`/blog/${post.slug}`, "href")} class="post-image" data-astro-cid-5tznm7mj> <img${addAttribute(post.featuredImage.url, "src")}${addAttribute(post.featuredImage.title, "alt")}${addAttribute(post.featuredImage.width, "width")}${addAttribute(post.featuredImage.height, "height")} loading="lazy" data-astro-cid-5tznm7mj> </a>`} <div class="post-content" data-astro-cid-5tznm7mj> <time${addAttribute(post.publishDate, "datetime")} data-astro-cid-5tznm7mj> ${formatDate(post.publishDate)} </time> <h2 data-astro-cid-5tznm7mj> <a${addAttribute(`/blog/${post.slug}`, "href")} data-astro-cid-5tznm7mj>${post.title}</a> </h2> ${post.excerpt && renderTemplate`<p class="excerpt" data-astro-cid-5tznm7mj>${post.excerpt}</p>`} ${post.tags && post.tags.length > 0 && renderTemplate`<div class="tags" data-astro-cid-5tznm7mj> ${post.tags.map((tag) => renderTemplate`<span class="tag" data-astro-cid-5tznm7mj>${tag}</span>`)} </div>`} ${post.author && renderTemplate`<p class="author" data-astro-cid-5tznm7mj>By ${post.author}</p>`} </div> </article>`)} </div>`} <nav class="back-link" data-astro-cid-5tznm7mj> <a href="/" data-astro-cid-5tznm7mj>&larr; Back to Home</a> </nav> </div> </main> ` })} `;
}, "/Users/serguei/_dev/work/eddk-tempo-website/src/pages/blog/index.astro", void 0);

const $$file = "/Users/serguei/_dev/work/eddk-tempo-website/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
