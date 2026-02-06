<script lang="ts">
  import type { Header as HeaderType } from "../lib/contentful-types.generated";

  interface Props {
    header?: HeaderType | null;
  }

  let { header = null }: Props = $props();

  // Fallback header data
  const defaultHeader: HeaderType = {
    name: "Default Header",
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
            url: "#/enterprise/security-compliance",
          },
        ],
      },
      {
        label: "Developers",
        url: "#",
        links: [
          { label: "Overview", url: "#/developers/overview" },
          { label: "Documentation", url: "#/developers/docs" },
          { label: "API Reference", url: "#/developers/api" },
          { label: "SDKs", url: "#/developers/sdks" },
        ],
      },
      {
        label: "Company",
        url: "#",
        links: [
          { label: "About", url: "#/company/about" },
          { label: "Careers", url: "#/company/careers" },
          { label: "Press", url: "#/company/press" },
          { label: "Contact", url: "#/company/contact" },
        ],
      },
      { label: "Blog", url: "/blog" },
      { label: "Contact Sales", url: "#" },
    ],
    loginText: "Log in",
    loginUrl: "#",
  };

  // Use provided header or fallback
  const activeHeader = header || defaultHeader;

  // Reactive state for mobile menu and dropdowns
  let mobileMenuOpen = $state(false);
  let openDesktopDropdown = $state<number | null>(null);
  let openMobileDropdown = $state<number | null>(null);

  // Toggle mobile menu
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  // Toggle desktop dropdown
  function toggleDesktopDropdown(index: number, event: MouseEvent) {
    event.stopPropagation();
    openDesktopDropdown = openDesktopDropdown === index ? null : index;
  }

  // Toggle mobile dropdown
  function toggleMobileDropdown(index: number) {
    openMobileDropdown = openMobileDropdown === index ? null : index;
  }

  // Close desktop dropdowns when clicking outside
  function handleDocumentClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.closest(".nav-group")) {
      openDesktopDropdown = null;
    }
  }

  // Handle escape key
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      openDesktopDropdown = null;
      if (mobileMenuOpen) {
        mobileMenuOpen = false;
        document.body.style.overflow = "";
      }
    }
  }

  // Set up event listeners
  $effect(() => {
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "";
    };
  });
</script>

<header class="site-header">
  <div class="header-container">
    <!-- Logo -->
    <div class="header-logo">
      <a href="/">
        {#if activeHeader.logo}
          <img
            src={activeHeader.logo.url}
            alt={activeHeader.logo.title || "Site Logo"}
            width={activeHeader.logo.width}
            height={activeHeader.logo.height}
          />
        {:else}
          <img
            src="/images/logo.svg"
            alt="Tempo Logo"
            width="40"
            height="40"
          />
        {/if}
      </a>
    </div>

    <!-- Desktop Navigation -->
    {#if activeHeader.navItems && activeHeader.navItems.length > 0}
      <nav class="header-nav desktop-nav" aria-label="Main navigation">
        <ul class="nav-list">
          {#each activeHeader.navItems as item, index}
            {#if "links" in item && item.links && item.links.length > 0}
              <li class="nav-item nav-group">
                <button
                  class="nav-link nav-group-trigger"
                  aria-expanded={openDesktopDropdown === index}
                  aria-haspopup="true"
                  onclick={(e) => toggleDesktopDropdown(index, e)}
                >
                  {item.label}
                  <img
                    src="/images/accordion-down.svg"
                    alt=""
                    class="dropdown-icon"
                    width="16"
                    height="16"
                  />
                </button>
                <ul class="dropdown-menu">
                  {#each item.links as link}
                    <li>
                      <a href={link.url} class="dropdown-link">
                        {link.label}
                      </a>
                    </li>
                  {/each}
                </ul>
              </li>
            {:else if "url" in item && item.url}
              <li class="nav-item">
                <a href={item.url} class="nav-link">
                  {item.label}
                </a>
              </li>
            {/if}
          {/each}
        </ul>
      </nav>
    {/if}

    <!-- Right side actions -->
    <div class="header-actions">
      <!-- Login Link -->
      {#if activeHeader.loginText && activeHeader.loginUrl}
        <a href={activeHeader.loginUrl} class="login-link">
          {activeHeader.loginText}
        </a>
      {/if}

      <!-- Search Button -->
      <button class="search-button" aria-label="Search">
        <img src="/images/search-icon.svg" alt="" width="24" height="24" />
      </button>
    </div>

    <!-- Mobile Menu Button -->
    <button
      class="mobile-menu-button"
      aria-label="Toggle menu"
      aria-expanded={mobileMenuOpen}
      onclick={toggleMobileMenu}
    >
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
  </div>

  <!-- Mobile Navigation -->
  {#if activeHeader.navItems && activeHeader.navItems.length > 0}
    <nav
      class="header-nav mobile-nav"
      class:active={mobileMenuOpen}
      aria-label="Mobile navigation"
    >
      <ul class="mobile-nav-list">
        {#each activeHeader.navItems as item, index}
          {#if "links" in item && item.links && item.links.length > 0}
            <li class="mobile-nav-item mobile-nav-group">
              <button
                class="mobile-nav-link mobile-nav-group-trigger"
                aria-expanded={openMobileDropdown === index}
                onclick={() => toggleMobileDropdown(index)}
              >
                {item.label}
                <img
                  src="/images/accordion-down.svg"
                  alt=""
                  class="dropdown-icon"
                  width="16"
                  height="16"
                />
              </button>
              <ul class="mobile-dropdown-menu">
                {#each item.links as link}
                  <li>
                    <a href={link.url} class="mobile-dropdown-link">
                      {link.label}
                    </a>
                  </li>
                {/each}
              </ul>
            </li>
          {:else if "url" in item && item.url}
            <li class="mobile-nav-item">
              <a href={item.url} class="mobile-nav-link">
                {item.label}
              </a>
            </li>
          {/if}
        {/each}
        {#if activeHeader.loginText && activeHeader.loginUrl}
          <li class="mobile-nav-item mobile-login-item">
            <a href={activeHeader.loginUrl} class="mobile-login-button">
              {activeHeader.loginText}
            </a>
          </li>
        {/if}
      </ul>
    </nav>
  {/if}
</header>

<style>
  .site-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: #f3f3f3;
    border-bottom: 1px solid #ccc;
  }

  .header-container {
    margin: 0 auto;
    padding: 12px 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  /* Logo */
  .header-logo a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  .header-logo img {
    width: 40px;
    height: 40px;
    display: block;
  }

  /* Desktop Navigation */
  .desktop-nav {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .nav-list {
    display: flex;
    list-style: none;
    gap: 12px;
    align-items: center;
  }

  .nav-item {
    position: relative;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    height: 40px;
    color: #000;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.3;
    letter-spacing: 0.14px;
    transition: opacity 0.2s ease;
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  .nav-link:hover {
    opacity: 0.7;
  }

  .nav-group-trigger {
    position: relative;
  }

  .dropdown-icon {
    transition: transform 0.2s ease;
    width: 16px;
    height: 16px;
  }

  .nav-group-trigger[aria-expanded="true"] .dropdown-icon {
    transform: scaleY(-1) rotate(180deg);
  }

  /* Dropdown Menu */
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 240px;
    margin-top: 12px;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px 0;
    list-style: none;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition:
      opacity 0.2s ease,
      transform 0.2s ease,
      visibility 0.2s;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }

  .nav-group:hover .dropdown-menu,
  .nav-group-trigger[aria-expanded="true"] + .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .dropdown-menu li {
    list-style: none;
  }

  .dropdown-link {
    display: block;
    padding: 10px 24px;
    color: #000;
    text-decoration: none;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
    transition: background-color 0.2s ease;
  }

  /* First item styled as header/overview */
  .dropdown-menu li:first-child .dropdown-link {
    color: #999;
    font-size: 13px;
    padding-top: 0;
  }

  .dropdown-link:hover {
    background: #f8f8f8;
  }

  /* Subtle hover state */
  .dropdown-menu li:first-child .dropdown-link:hover {
    background: transparent;
  }

  /* Header Actions */
  .header-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .login-link {
    padding: 8px 12px;
    height: 40px;
    display: flex;
    align-items: center;
    color: #000;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.3;
    letter-spacing: 0.14px;
    transition: opacity 0.2s ease;
  }

  .login-link:hover {
    opacity: 0.7;
  }

  .search-button {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    background: none;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s ease;
  }

  .search-button:hover {
    opacity: 0.7;
  }

  .search-button img {
    width: 24px;
    height: 24px;
    display: block;
  }

  /* Mobile Menu Button */
  .mobile-menu-button {
    display: none;
    flex-direction: column;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    z-index: 1001;
  }

  .hamburger-line {
    width: 24px;
    height: 2px;
    background: #000;
    border-radius: 2px;
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
  }

  .mobile-menu-button[aria-expanded="true"] .hamburger-line:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .mobile-menu-button[aria-expanded="true"] .hamburger-line:nth-child(2) {
    opacity: 0;
  }

  .mobile-menu-button[aria-expanded="true"] .hamburger-line:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  /* Mobile Navigation */
  .mobile-nav {
    display: none;
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.3s ease,
      visibility 0.3s;
    overflow-y: auto;
    border-top: 1px solid #ccc;
  }

  .mobile-nav.active {
    opacity: 1;
    visibility: visible;
  }

  .mobile-nav-list {
    list-style: none;
    padding: 1.5rem;
  }

  .mobile-nav-item {
    border-bottom: 1px solid #ccc;
  }

  .mobile-nav-item:last-child {
    border-bottom: none;
  }

  .mobile-nav-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    color: #000;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
  }

  .mobile-dropdown-menu {
    list-style: none;
    padding-left: 1rem;
    padding-top: 0.5rem;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .mobile-nav-group-trigger[aria-expanded="true"] + .mobile-dropdown-menu {
    max-height: 500px;
  }

  .mobile-nav-group-trigger .dropdown-icon {
    width: 16px;
    height: 16px;
  }

  .mobile-nav-group-trigger[aria-expanded="true"] .dropdown-icon {
    transform: scaleY(-1) rotate(180deg);
  }

  .mobile-dropdown-menu li {
    list-style: none;
  }

  .mobile-dropdown-link {
    display: block;
    padding: 0.75rem 0;
    color: #666;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.2s ease;
  }

  .mobile-dropdown-menu li:first-child .mobile-dropdown-link {
    color: #999;
    font-size: 13px;
  }

  .mobile-dropdown-link:hover {
    color: #000;
  }

  .mobile-login-item {
    margin-top: 1rem;
    border: none;
  }

  .mobile-login-button {
    display: block;
    padding: 1rem;
    background: #000;
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    border-radius: 6px;
    text-align: center;
  }

  /* Tablet and Mobile */
  @media (max-width: 968px) {
    .desktop-nav,
    .header-actions {
      display: none;
    }

    .mobile-menu-button {
      display: flex;
    }

    .mobile-nav {
      display: block;
    }

    .header-container {
      padding: 12px 24px;
    }
  }

  @media (max-width: 640px) {
    .header-container {
      padding: 12px 16px;
    }

    .header-logo img {
      width: 32px;
      height: 32px;
    }

    .mobile-nav {
      top: 56px;
    }
  }
</style>
