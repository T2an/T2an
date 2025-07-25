import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  server: {
    host: true
  },
  integrations: [tailwind(), mdx(), react()],
  site: process.env.SITE_URL || 'http://localhost:4321',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
}); 