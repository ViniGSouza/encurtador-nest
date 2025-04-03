import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
  test: {
    environmentMatchGlobs: [['src/**', 'node']],
    include: ['**/*.spec.ts'],
    globals: true,
    root: './',
    alias: {
      '@': '/src',
      test: '/test',
    },
  },
});
