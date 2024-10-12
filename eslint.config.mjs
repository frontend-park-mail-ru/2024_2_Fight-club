import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
    {
        files: ['**/*.js', '**/*.ts', '**/*.mjs'],
        languageOptions: {
            sourceType: 'module',
        },
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
    pluginJs.configs.recommended,
    {
        rules: {
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            semi: ['error', 'always'],
            quotes: ['error', 'single'],
            indent: ['error', 4],
        },
    },
];
