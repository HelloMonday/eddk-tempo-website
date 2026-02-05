import { c as createComponent, r as renderComponent, e as renderScript, a as renderTemplate, b as createAstro, m as maybeRenderHead } from '../chunks/astro/server_0DCQ29kV.mjs';
import 'piccolore';
import { b as getLandingPage, $ as $$Layout } from '../chunks/Layout_Dj1vS6Bd.mjs';
/* empty css                                 */
export { r as renderers } from '../chunks/_@astro-renderers_2Ab_vIEa.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const pageContent = await getLandingPage();
  const title = pageContent?.title || "Welcome";
  const subtitle = pageContent?.subtitle || "Astro + GSAP + Three.js Starter";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageContent?.metaDescription || "Astro + GSAP + Three.js", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-j7pv25f6> <div id="three-container" data-astro-cid-j7pv25f6></div> <div class="content" data-astro-cid-j7pv25f6> <h1 class="title" data-astro-cid-j7pv25f6>${title}</h1> <p class="subtitle" data-astro-cid-j7pv25f6>${subtitle}</p> <svg class="logo" viewBox="0 0 100 100" width="120" height="120" data-astro-cid-j7pv25f6> <circle class="circle" cx="50" cy="50" r="45" fill="none" stroke="#fff" stroke-width="2" data-astro-cid-j7pv25f6></circle> <path class="path" d="M30 50 L45 65 L70 35" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-j7pv25f6></path> </svg> </div> </main> ` })}  ${renderScript($$result, "/Users/serguei/_dev/work/eddk-tempo-website/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/serguei/_dev/work/eddk-tempo-website/src/pages/index.astro", void 0);

const $$file = "/Users/serguei/_dev/work/eddk-tempo-website/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
