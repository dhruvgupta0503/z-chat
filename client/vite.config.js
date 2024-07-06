import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: ['mock-aws-s3', 'aws-sdk', 'nock', '@mapbox/node-pre-gyp'],
  },
  build: {
    rollupOptions: {
      external: ['mock-aws-s3', 'aws-sdk', 'nock', '@mapbox/node-pre-gyp'],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [
    {
      name: 'html-loader',
      enforce: 'pre',
      transform(src, id) {
        if (id.endsWith('.html')) {
          return `export default ${JSON.stringify(src)}`;
        }
      },
    },
  ],
});
