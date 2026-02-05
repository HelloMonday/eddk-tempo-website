import { c as createComponent, f as renderHead, r as renderComponent, g as renderSlot, a as renderTemplate, b as createAstro } from './astro/server_0DCQ29kV.mjs';
import 'piccolore';
import { a as attr, e as ensure_array_like, b as escape_html, c as attr_class } from './_@astro-renderers_2Ab_vIEa.mjs';
/* empty css                          */
import { createClient } from 'contentful';

function Header($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { header = null } = $$props;

		// Fallback header data
		const defaultHeader = {
			navItems: [
				{
					label: "Enterprise",
					url: "#",
					links: [
						{ label: "Overview", url: "#/enterprise/overview" },
						{ label: "Use Cases", url: "#/enterprise/use-cases" },
						{ label: "Case Studies", url: "#/enterprise/case-studies" },
						{
							label: "Security & Compliance",
							url: "#/enterprise/security-compliance"
						}
					]
				},

				{
					label: "Developers",
					url: "#",
					links: [
						{ label: "Overview", url: "#/developers/overview" },
						{ label: "Documentation", url: "#/developers/docs" },
						{ label: "API Reference", url: "#/developers/api" },
						{ label: "SDKs", url: "#/developers/sdks" }
					]
				},

				{
					label: "Company",
					url: "#",
					links: [
						{ label: "About", url: "#/company/about" },
						{ label: "Careers", url: "#/company/careers" },
						{ label: "Press", url: "#/company/press" },
						{ label: "Contact", url: "#/company/contact" }
					]
				},
				{ label: "Blog", url: "/blog" },
				{ label: "Contact Sales", url: "#" }
			],
			loginText: "Log in",
			loginUrl: "#"
		};

		// Use provided header or fallback
		const activeHeader = header || defaultHeader;

		// Reactive state for mobile menu and dropdowns
		let mobileMenuOpen = false;

		let openDesktopDropdown = null;
		let openMobileDropdown = null;

		$$renderer.push(`<header class="site-header svelte-oiwvqb"><div class="header-container svelte-oiwvqb"><div class="header-logo svelte-oiwvqb"><a href="/" class="svelte-oiwvqb">`);

		if (// Set up event listeners
		activeHeader.logo) {
			$$renderer.push('<!--[-->');
			$$renderer.push(`<img${attr('src', activeHeader.logo.url)}${attr('alt', activeHeader.logo.title || "Site Logo")}${attr('width', activeHeader.logo.width)}${attr('height', activeHeader.logo.height)} class="svelte-oiwvqb"/>`);
		} else {
			$$renderer.push('<!--[!-->');
			$$renderer.push(`<img src="/images/logo.svg" alt="Tempo Logo" width="40" height="40" class="svelte-oiwvqb"/>`);
		}

		$$renderer.push(`<!--]--></a></div> `);

		if (activeHeader.navItems && activeHeader.navItems.length > 0) {
			$$renderer.push('<!--[-->');
			$$renderer.push(`<nav class="header-nav desktop-nav svelte-oiwvqb" aria-label="Main navigation"><ul class="nav-list svelte-oiwvqb"><!--[-->`);

			const each_array = ensure_array_like(activeHeader.navItems);

			for (let index = 0, $$length = each_array.length; index < $$length; index++) {
				let item = each_array[index];

				if ("links" in item && item.links && item.links.length > 0) {
					$$renderer.push('<!--[-->');
					$$renderer.push(`<li class="nav-item nav-group svelte-oiwvqb"><button class="nav-link nav-group-trigger svelte-oiwvqb"${attr('aria-expanded', openDesktopDropdown === index)} aria-haspopup="true">${escape_html(item.label)} <img src="/images/accordion-down.svg" alt="" class="dropdown-icon svelte-oiwvqb" width="16" height="16"/></button> <ul class="dropdown-menu svelte-oiwvqb"><!--[-->`);

					const each_array_1 = ensure_array_like(item.links);

					for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
						let link = each_array_1[$$index];

						$$renderer.push(`<li class="svelte-oiwvqb"><a${attr('href', link.url)} class="dropdown-link svelte-oiwvqb">${escape_html(link.label)}</a></li>`);
					}

					$$renderer.push(`<!--]--></ul></li>`);
				} else {
					$$renderer.push('<!--[!-->');

					if ("url" in item && item.url) {
						$$renderer.push('<!--[-->');
						$$renderer.push(`<li class="nav-item svelte-oiwvqb"><a${attr('href', item.url)} class="nav-link svelte-oiwvqb">${escape_html(item.label)}</a></li>`);
					} else {
						$$renderer.push('<!--[!-->');
					}

					$$renderer.push(`<!--]-->`);
				}

				$$renderer.push(`<!--]-->`);
			}

			$$renderer.push(`<!--]--></ul></nav>`);
		} else {
			$$renderer.push('<!--[!-->');
		}

		$$renderer.push(`<!--]--> <div class="header-actions svelte-oiwvqb">`);

		if (activeHeader.loginText && activeHeader.loginUrl) {
			$$renderer.push('<!--[-->');
			$$renderer.push(`<a${attr('href', activeHeader.loginUrl)} class="login-link svelte-oiwvqb">${escape_html(activeHeader.loginText)}</a>`);
		} else {
			$$renderer.push('<!--[!-->');
		}

		$$renderer.push(`<!--]--> <button class="search-button svelte-oiwvqb" aria-label="Search"><img src="/images/search-icon.svg" alt="" width="24" height="24" class="svelte-oiwvqb"/></button></div> <button class="mobile-menu-button svelte-oiwvqb" aria-label="Toggle menu"${attr('aria-expanded', mobileMenuOpen)}><span class="hamburger-line svelte-oiwvqb"></span> <span class="hamburger-line svelte-oiwvqb"></span> <span class="hamburger-line svelte-oiwvqb"></span></button></div> `);

		if (activeHeader.navItems && activeHeader.navItems.length > 0) {
			$$renderer.push('<!--[-->');
			$$renderer.push(`<nav${attr_class('header-nav mobile-nav svelte-oiwvqb', void 0, { 'active': mobileMenuOpen })} aria-label="Mobile navigation"><ul class="mobile-nav-list svelte-oiwvqb"><!--[-->`);

			const each_array_2 = ensure_array_like(activeHeader.navItems);

			for (let index = 0, $$length = each_array_2.length; index < $$length; index++) {
				let item = each_array_2[index];

				if ("links" in item && item.links && item.links.length > 0) {
					$$renderer.push('<!--[-->');
					$$renderer.push(`<li class="mobile-nav-item mobile-nav-group svelte-oiwvqb"><button class="mobile-nav-link mobile-nav-group-trigger svelte-oiwvqb"${attr('aria-expanded', openMobileDropdown === index)}>${escape_html(item.label)} <img src="/images/accordion-down.svg" alt="" class="dropdown-icon svelte-oiwvqb" width="16" height="16"/></button> <ul class="mobile-dropdown-menu svelte-oiwvqb"><!--[-->`);

					const each_array_3 = ensure_array_like(item.links);

					for (let $$index_2 = 0, $$length = each_array_3.length; $$index_2 < $$length; $$index_2++) {
						let link = each_array_3[$$index_2];

						$$renderer.push(`<li class="svelte-oiwvqb"><a${attr('href', link.url)} class="mobile-dropdown-link svelte-oiwvqb">${escape_html(link.label)}</a></li>`);
					}

					$$renderer.push(`<!--]--></ul></li>`);
				} else {
					$$renderer.push('<!--[!-->');

					if ("url" in item && item.url) {
						$$renderer.push('<!--[-->');
						$$renderer.push(`<li class="mobile-nav-item svelte-oiwvqb"><a${attr('href', item.url)} class="mobile-nav-link svelte-oiwvqb">${escape_html(item.label)}</a></li>`);
					} else {
						$$renderer.push('<!--[!-->');
					}

					$$renderer.push(`<!--]-->`);
				}

				$$renderer.push(`<!--]-->`);
			}

			$$renderer.push(`<!--]--> `);

			if (activeHeader.loginText && activeHeader.loginUrl) {
				$$renderer.push('<!--[-->');
				$$renderer.push(`<li class="mobile-nav-item mobile-login-item svelte-oiwvqb"><a${attr('href', activeHeader.loginUrl)} class="mobile-login-button svelte-oiwvqb">${escape_html(activeHeader.loginText)}</a></li>`);
			} else {
				$$renderer.push('<!--[!-->');
			}

			$$renderer.push(`<!--]--></ul></nav>`);
		} else {
			$$renderer.push('<!--[!-->');
		}

		$$renderer.push(`<!--]--></header>`);
	});
}

const deliveryClient = createClient({
  space: "jmknojkteiuy",
  accessToken: "r8Y_giCw6opsDT5I1OhAs3KBcVGrzpjcEmCwLg99d4M",
  environment: "master"
});
const previewClient = createClient({
  space: "jmknojkteiuy",
  accessToken: "R-HLIf1_jUiky0-9BYBYKIp3bTVm7xQCIHYuoxb77PA",
  environment: "master",
  host: "preview.contentful.com"
}) ;
function getClient(preview = false) {
  if (preview && previewClient) {
    return previewClient;
  }
  return deliveryClient;
}

function parseAsset(asset) {
  if (!asset?.fields?.file) return void 0;
  const file = asset.fields.file;
  return {
    url: `https:${file.url}`,
    title: asset.fields.title || "",
    description: asset.fields.description,
    width: file.details?.image?.width || 0,
    height: file.details?.image?.height || 0
  };
}
function parseBlogPost(entry) {
  return {
    title: entry.fields.title,
    slug: entry.fields.slug,
    excerpt: entry.fields.excerpt,
    content: entry.fields.content,
    featuredImage: parseAsset(entry.fields.featuredImage),
    author: entry.fields.author,
    publishDate: entry.fields.publishDate,
    tags: entry.fields.tags
  };
}
function parsePageContent(entry) {
  return {
    entryId: entry.fields.entryId,
    title: entry.fields.title,
    subtitle: entry.fields.subtitle,
    description: entry.fields.description,
    metaDescription: entry.fields.metaDescription
  };
}
function parseNavLink(entry) {
  return {
    label: entry.fields.label,
    url: entry.fields.url
  };
}
function parseNavGroup(entry) {
  const links = entry.fields.links || [];
  return {
    label: entry.fields.label,
    links: links.map(parseNavLink)
  };
}
function parseNavItem(entry) {
  const contentType = entry.sys.contentType.sys.id;
  if (contentType === "navGroup") {
    return parseNavGroup(entry);
  }
  return parseNavLink(entry);
}
function parseHeader(entry) {
  const navItems = entry.fields.navItems || [];
  return {
    name: entry.fields.name,
    logo: parseAsset(entry.fields.logo),
    navItems: navItems.map(parseNavItem),
    loginText: entry.fields.loginText,
    loginUrl: entry.fields.loginUrl
  };
}

async function getAllBlogPosts(preview = false) {
  const client = getClient(preview);
  try {
    const response = await client.getEntries({
      content_type: "blogPost",
      order: ["-fields.publishDate"],
      include: 2
    });
    return response.items.map(parseBlogPost);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}
async function getBlogPostBySlug(slug, preview = false) {
  const client = getClient(preview);
  try {
    const response = await client.getEntries({
      content_type: "blogPost",
      "fields.slug": slug,
      limit: 1,
      include: 2
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
async function getLandingPage(preview = false) {
  const client = getClient(preview);
  try {
    const response = await client.getEntries({
      content_type: "landinPage",
      limit: 1
    });
    if (response.items.length === 0) {
      return null;
    }
    return parsePageContent(response.items[0]);
  } catch (error) {
    console.error("Error fetching landing page:", error);
    return null;
  }
}
async function getHeader(preview = false) {
  const client = getClient(preview);
  try {
    const response = await client.getEntries({
      content_type: "header",
      limit: 1,
      include: 2
      // Include nested references (navItems -> links)
    });
    if (response.items.length === 0) {
      return null;
    }
    return parseHeader(response.items[0]);
  } catch (error) {
    console.error("Error fetching header:", error);
    return null;
  }
}

const $$Astro = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  const header = await getHeader();
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro starter with GSAP and Three.js"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title}</title>${renderHead()}</head> <body> ${renderComponent($$result, "Header", Header, { "client:load": true, "header": header, "client:component-hydration": "load", "client:component-path": "/Users/serguei/_dev/work/eddk-tempo-website/src/components/Header.svelte", "client:component-export": "default" })} ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/serguei/_dev/work/eddk-tempo-website/src/layouts/Layout.astro", void 0);

export { $$Layout as $, getAllBlogPosts as a, getLandingPage as b, getBlogPostBySlug as g };
