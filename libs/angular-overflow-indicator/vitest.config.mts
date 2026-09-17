//// <reference types='vitest' />
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/libs/angular-overflow-indicator',
  plugins: [angular({ tsconfig: 'tsconfig.spec.json' })],
  resolve: { tsconfigPaths: true },
  test: {
    name: 'angular-overflow-indicator',
    watch: false,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['src/test-setup.ts'],
    coverage: {
      reportsDirectory: '../../coverage/libs/angular-overflow-indicator',
      provider: 'v8' as const
    },
    passWithNoTests: true
  }
}));
