import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  server: {
    host: true
  },
  integrations: [tailwind(), mdx()],
  site: process.env.SITE_URL || 'http://localhost:4321',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});