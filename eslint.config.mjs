import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.js', '**/*.ts', '**/*.mjs'],
        languageOptions: {
            sourceType: 'module',
        },
    },
    {
        ignores: ['dist/*', 'components/precompiled-templates.js'],
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                process: 'readonly',
                __dirname: 'readonly',
            },
        },
    },
    {
        rules: {
            semi: ['error', 'always'],
            quotes: ['error', 'single'],
            indent: ['error', 4],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            'no-undef': 'warn',
        },
    },
];
