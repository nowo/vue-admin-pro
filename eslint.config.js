import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default antfu(
    {
        stylistic: {
            indent: 4, // 4, or 'tab'   使用4个空格缩进风格
            quotes: 'single', // or 'double'    单引号
        },
        // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
        ignores: [
            '*.sh',
            // 'node_modules',
            'lib',
            // '*.md',
            // '*.scss',
            '*.woff',
            '*.ttf',
            '.vscode',
            // '.idea',
            // 'dist',
            'mock',
            'public',
            'bin',
            'build',
            'index.html',
            'vite.config.ts.timestamp*',
        ],
    },
    unocss.configs.flat,
    {
        rules: {
            'no-console': [
                'warn',
                {
                    allow: ['error', 'warn'],
                },
            ],
            'curly': ['error', 'multi-line', 'consistent'],
            'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
            'antfu/if-newline': 'off', // 允许if(a==1) return 1  这种单行的格式
            'antfu/top-level-function': 'off',
            'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
            'vue/first-attribute-linebreak': [
                'warn',
                {
                    multiline: 'beside',
                },
            ],
            'vue/html-closing-bracket-newline': [
                'warn',
                {
                    multiline: 'never',
                },
            ],
            'vue/html-indent': [
                'warn',
                4,
                {
                    alignAttributesVertically: false,
                },
            ],
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    // "varsIgnorePattern": "^_",
                    // "args": "after-used",
                    // "argsIgnorePattern": "^_"
                    argsIgnorePattern: '^',
                },
            ],
            'node/prefer-global/process': ['error', 'always'],
            'ts/no-use-before-define': ['error', {
                // functions: true,
                // classes: true,
                variables: false,
                // allowNamedExports: false,
            }],
        },
    },
)
