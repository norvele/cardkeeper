import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      quotes: ['error', 'single', { avoidEscape: true }],
      'quote-props': ['error', 'as-needed'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      indent: ['error', 2],
      'array-bracket-spacing': ['error', 'never'],
      'block-spacing': ['error', 'always'],
      'no-multi-spaces': ['error'],
      'no-tabs': ['error'],
      'no-multiple-empty-lines': ['error'],
      '@typescript-eslint/consistent-type-imports': ['error'],
      'brace-style': ['error'],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', { before: false, after: true }],
      'default-param-last': ['error'],
      'func-call-spacing': ['error', 'never'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'no-dupe-class-members': ['error'],
      'no-duplicate-imports': ['error'],
      'object-curly-spacing': ['error', 'always'],
      semi: ['error', 'always'],
      'space-before-blocks': ['error'],
      'space-before-function-paren': ['error', 'never'],
      'space-infix-ops': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
];