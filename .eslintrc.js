module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb', 'plugin:import/errors', 'plugin:import/warnings', 'plugin:import/typescript', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/eslint-recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended', 'plugin:sonarjs/recommended'],
  plugins: ['react-hooks', 'import', '@typescript-eslint', 'sonarjs'],
  settings: {
    'import/resolver': {
      'babel-module': {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  ignorePatterns: ['*.svg'],
  rules: {
    strict: 0,
    'arrow-body-style': 0,
    'arrow-parens': 0,
    'brace-style': [2, '1tbs'],
    'no-var': 0,
    'no-shadow': 0,
    semi: 0,
    'react/jsx-filename-extension': 0,
    'comma-dangle': 0,
    'operator-linebreak': 0,
    'implicit-arrow-linebreak': 0,
    'object-curly-newline': 0,
    'function-paren-newline': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'prefer-arrow-callback': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/function-component-definition': [2, { 'namedComponents': 'arrow-function'}],
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    'react/jsx-indent': 0,
    indent: 0,
    '@typescript-eslint/no-unused-vars': 2,
    'nonblock-statement-body-position': 0,
    curly: 0,
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true
    }],
    'import/extensions': 0,
    'no-param-reassign': [2, {
      props: true,
      ignorePropertyModificationsFor: ['draft']
    }],
    'no-underscore-dangle': ['error', {
      allow: ['_id']
    }],
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/no-unresolved': [2, {
      caseSensitive: false
    }],
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    '@typescript-eslint/no-empty-interface': 0,
    'sonarjs/no-nested-template-literals': 0
  },
  overrides: [{
    files: ['*.ts', '*.tsx']
  }],
  globals: {
    document: 'readonly',
    window: 'readonly',
    describe: 'readonly',
    test: 'readonly',
    xtest: 'readonly',
    expect: 'readonly',
    beforeEach: 'readonly',
    fetch: 'readonly',
    localStorage: 'readonly',
    jest: 'readonly'
  }
};