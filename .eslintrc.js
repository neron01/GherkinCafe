module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
      // allow async-await
      'generator-star-spacing': 'off',
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'indent': 'off',
      'semi': [2, 'always'],
      'comma-dangle': ['error', {
          'arrays': 'only-multiline',
          'objects': 'only-multiline',
          'imports': 'never',
          'exports': 'never',
          'functions': 'ignore'
      }]
  },
};
