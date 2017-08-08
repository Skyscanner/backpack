const autoprefixer = require('autoprefixer');
const postCssFlexbugsFixes = require('postcss-flexbugs-fixes');

module.exports = () => [
  postCssFlexbugsFixes,
  autoprefixer({
    browsers: [
      '>1%',
      'last 4 versions',
      'Firefox ESR',
      'not ie < 9',
    ],
    flexbox: 'no-2009',
  }),
];
