import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    ...tseslint.configs.recommended,
    {
        files: ['**/*.js', '**/*.ts', '**/*.mjs'],
        languageOptions: {
            sourceType: 'module',
        },
    },
    {
        ignores: ['dist/*'],
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
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            semi: ['error', 'always'],
            quotes: ['error', 'single'],
            indent: ['error', 4],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            'no-undef': 'warn',
        },
    },
];
