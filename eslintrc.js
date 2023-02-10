module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-internal',
    'plugin:@next/next/recommended',
    'plugin:cypress/recommended',
  ],
  plugins: [
    '@typescript-eslint',
  ],
  globals: {
    document: true,
    window: true,
    process: true,
    IntersectionObserver: true,
    self: true,
  },
  rules: {
    // note you must disable the base rule as it can report incorrect errors
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    '@typescript-eslint/no-namespace': 'off',
    // note you must disable the base rule as it can report incorrect errors
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-underscore-dangle': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'class-methods-use-this': 'off',
    camelcase: 'off',
    'react/button-has-type': 'off',
    'react/require-default-props': 'off',
    'react/jsx-key': 'error',
    '@next/next/no-img-element': 'error',
    'react/no-danger': 'off',
  },
  ignorePatterns: [
    'next-env.d.ts',
    '**/*/graphql/generated.ts',
  ],
};
