import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  integrations: [svelte()],
  vite: {
    ssr: {
      noExternal: ['gsap', 'three']
    }
  }
});
