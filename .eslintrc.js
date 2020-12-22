module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['dist/**/*.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'node', 'mocha', 'prettier'],
  rules: {
    'node/no-missing-import': 'off',
    'node/no-unsupported-features': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'prettier/prettier': ['error', require('./prettier.config')],
  },
};
