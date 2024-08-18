module.exports = {
  root: true,
  extends: [
    '@nuxt/eslint-config',
    '@nuxtjs/eslint-config-typescript'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'max-len': ['error', { code: 80 }],
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/singleline-html-element-content-newline': ['error', {
      ignoreWhenNoAttributes: false,
      ignoreWhenEmpty: true
    }],
    'vue/multiline-html-element-content-newline': ['error', {
      ignoreWhenEmpty: true
    }],
    'vue/require-default-prop': 'off',
    'no-console': 'off'
  }
};
