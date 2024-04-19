module.exports = {
  root: true,
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-styled-components'
  ],
  overrides: [
    {
      files: ['src/**/*.{tsx,jsx}'],
      customSyntax: '@stylelint/postcss-css-in-js'
    }
  ],
  ignoreFiles: ['dist/**/*', '**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
  rules: {
    'indentation': 2,
    'block-opening-brace-space-before': 'always',
    'block-closing-brace-newline-after': 'always',
    'selector-combinator-space-before': 'always',
    'selector-combinator-space-after': 'always',
    'rule-empty-line-before': null,
    'alpha-value-notation': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'color-function-notation': null,
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    'no-descending-specificity': null,
    'selector-class-pattern': null,
    'media-feature-range-notation': null
  }
};