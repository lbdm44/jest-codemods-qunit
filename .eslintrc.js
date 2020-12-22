module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['dist/**/*.js', 'src/transformers/__testfixtures__/**/*.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'node', 'jest', 'prettier'],
  rules: {
    'node/no-missing-import': 'off',
    'node/no-unsupported-features': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'prettier/prettier': ['error', require('./prettier.config')],
  },
};
