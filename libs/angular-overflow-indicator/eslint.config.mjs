import baseConfig from '../../eslint.config.mjs';
import nx from "@nx/eslint-plugin";

export default [
  {
    ignores: ['**/dist']
  },
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'lib',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'ng-scroll-view',
          style: 'kebab-case'
        }
      ],
      '@angular-eslint/prefer-standalone': 'error'
    }
  },
  {
    files: ['**/*.html'],
    rules: {
    }
  },
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': 0
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser')
    }
  }
];
