// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // site: 'https://imane-el-mohalil.dev', // Uncomment and update with your actual domain when deploying
  integrations: [
    react({
      include: ['**/components/**'],
    }),
  ],
  
  vite: {
    plugins: [tailwindcss()],
    // Optimized for Bun's fast bundler
    build: {
      // Use Bun's faster minification
      minify: 'esbuild',
      // Enable CSS code splitting for better performance
      cssCodeSplit: true,
      // Target modern browsers for better optimization with Bun
      target: 'esnext',
      // Optimize chunks
      rollupOptions: {
        output: {
          // Better chunk splitting optimized for Bun
          manualChunks: {
            'framer-motion': ['framer-motion'],
            'react-vendor': ['react', 'react-dom'],
          },
        },
      },
    },
    // Optimize dependencies for Bun
    optimizeDeps: {
      include: ['framer-motion', 'react', 'react-dom'],
      // Bun handles ES modules natively, so we can be more aggressive
      force: true,
    },
    // Bun-specific performance optimizations
    esbuild: {
      // Use Bun's native bundler capabilities
      target: 'esnext',
      minify: true,
    },
  },

  // Performance optimizations for Bun deployment
  build: {
    // Inline small assets for better performance with Bun
    inlineStylesheets: 'auto',
    // Compress assets
    assets: 'assets',
    // Split chunks for better caching
    split: true,
  },

  // Enable prefetching for better performance
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  // Optimized dev server for Bun
  server: {
    host: true,
    port: 4321,
    // Bun handles HMR very efficiently
    hmr: {
      port: 4322,
    },
  },

  // Output configuration optimized for Bun deployment
  output: 'static',
});