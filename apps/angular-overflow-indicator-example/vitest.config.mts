//// <reference types='vitest' />
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/angular-overflow-indicator-example',
  plugins: [angular({ tsconfig: 'tsconfig.spec.json' })],
  resolve: { tsconfigPaths: true },
  test: {
    name: 'angular-overflow-indicator-example',
    watch: false,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['src/test-setup.ts'],
    coverage: {
      include: ['src/**/*.{ts,tsx,js,jsx}'],
      exclude: ['**/test-setup.*'],
      reportsDirectory: '../../coverage/angular-overflow-indicator-example',
      provider: 'v8' as const
    },
    passWithNoTests: true
  }
}));
