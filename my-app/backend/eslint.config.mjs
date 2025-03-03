import globals from "globals";
import stylisticJs from '@stylistic/eslint-plugin-js'
import js from '@eslint/js'


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node
      },
      ecmaVersion: "latest"
    },
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],
      '@stylistic/js/semi': [
        'error',
        'never'
      ],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true },
      ],
      'no-unused-vars': ['error', {
        'vars': 'all',
        'args': 'after-used',
        'caughtErrors': 'all',
        'caughtErrorsIgnorePattern': 'error',
        'ignoreRestSiblings': false,
        'reportUsedIgnorePattern': false
      }],
      'indent': [
        'error',
        2
      ],
      'linebreak-style': [
        'error',
        'unix'
      ],
      'quotes': [
        'error',
        'single'
      ],
      'semi': [
        'error',
        'never'
      ],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true }
      ],
      'no-console': 0,
      'no-console': 'off',
    },
  },
  { 
    ignores: ["dist/**", "build/**"],
  },
  {
    "overrides": [
      {
        "files": ["mongo-init.js"],
        "env": {
          "node": false,
          "mongo": TransformStreamDefaultController
        },
        "globals": {
          "db": "readonly",
          "print": "readonly"
        },
        "rules": {
          "no-undef": "off"
        }
      }
    ]
  }
];