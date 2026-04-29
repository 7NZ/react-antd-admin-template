/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss'
  ],
  ignoreFiles: ['dist/**/*', '**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
  rules: {
    'media-feature-range-notation': 'prefix',
    'selector-pseudo-class-no-unknown': [
      true,
      {
        'ignorePseudoClasses': ['global']
      }
    ]
  },
  overrides: [{
    // 忽略scss文件中css module中大写的类名
    files: '**/*.module.scss',
    rules: {
      'selector-class-pattern': null
    }
  }]
};