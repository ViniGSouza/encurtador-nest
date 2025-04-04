/* eslint-disable */
const eslint = require('@eslint/js');
const tslint = require('typescript-eslint');

module.exports = tslint.config(
  eslint.configs.recommended,
  ...tslint.configs.recommended,
  {
    ignores: ['node_modules/', 'dist/'],
    rules: {
      'no-eval': 'error',
      'no-console': 'warn',
      'no-await-in-loop': 'warn',
      'no-implied-eval': 'error',
      'no-lonely-if': 'warn',
      'prefer-const': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-useless-constructor': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
);
