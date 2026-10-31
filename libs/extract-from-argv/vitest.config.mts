/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/libs/extract-from-argv',
  plugins: [],
  resolve: { tsconfigPaths: true },
  test: {
    reporters: ['default'],
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      include: ['src/**/*.{ts,tsx,js,jsx}'],
      reportsDirectory: '../../coverage/extract-from-argv'
    }
  }
}));
