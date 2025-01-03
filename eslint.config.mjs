// import globals from 'globals';
// import pluginJs from '@eslint/js';
// import tseslint from 'typescript-eslint';

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   { files: ['**/*.{js,mjs,cjs,ts}'] },
//   { languageOptions: { globals: globals.node } },
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   {
//     ignores: ['node_modules', 'dist'],
//     rules: {
//       'no-unused-vars': 'error',
//       'no-unused-expressions': 'error',
//       'prefer-const': 'error',
//       'no-console': 'warn',
//       'no-undef': 'error',
//     },
//   },
// ];

// // eslint.config.mjs
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

// module.exports = [
//   // Any other config imports go at the top
//   eslintPluginPrettierRecommended,
// ];
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.node,
    },
    ignores: ['node_modules', 'dist'],
    rules: {
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
      'prettier/prettier': 'error', // Enables Prettier rule
    },
    plugins: {
      prettier: eslintPluginPrettier, // Registers the Prettier plugin
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
