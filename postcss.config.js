/**
 * This files is needed for @zeit/next-css
 * to enable postcss-loader. Due to config errors
 * using this file, config has been moved to next.config.js
 */
module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
          'custom-media-queries': true,
          'custom-selectors': true,
        },
      },
    ],
  ],
}
