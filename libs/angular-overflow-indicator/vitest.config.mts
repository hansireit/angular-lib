//// <reference types='vitest' />
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import angular from '@analogjs/vite-plugin-angular';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/libs/angular-overflow-indicator",
  plugins: [angular({ tsconfig: "tsconfig.spec.json" }), nxViteTsPaths(), nxCopyAssetsPlugin(["*.md"])],
  test: {
    name: "angular-overflow-indicator",
    watch: false,
    environment: "jsdom",
    include: ["{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    setupFiles: ["src/test-setup.ts"],
    coverage: {
      reportsDirectory: "../../coverage/libs/angular-overflow-indicator",
      provider: "v8" as const
    },
    passWithNoTests: true
  }
}));
