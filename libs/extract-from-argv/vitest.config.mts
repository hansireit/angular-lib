/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig(() => ({
  cacheDir: '../../node_modules/.vite/libs/extract-from-argv',
  plugins: [nxViteTsPaths()],
  test: {
    reporters: ['default'],
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
  }
}));
