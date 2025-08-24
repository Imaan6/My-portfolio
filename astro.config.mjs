// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://imaan6.github.io',
  base: '/My-portfolio',
  integrations: [
    react({
      include: ['**/components/**'],
    }),
  ],
  
  vite: {
    plugins: [tailwindcss()],
  },

  // Output configuration for static deployment
  output: 'static',
});