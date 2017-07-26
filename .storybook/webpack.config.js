const fs = require('fs');
const path = require('path');
const autoprefixer = require('autoprefixer');
const sassFunctions = require('../packages/bpk-mixins/sass-functions');
const postCssFlexbugsFixes = require('postcss-flexbugs-fixes');

const BPK_TOKENS = process.env.BPK_TOKENS;
const rootDir = path.resolve(__dirname, '../');
const ENABLE_CSS_MODULES = process.env.ENABLE_CSS_MODULES !== 'false';


module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: ENABLE_CSS_MODULES,
              localIdentName: '[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
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
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              data: BPK_TOKENS ?
                fs.readFileSync(path.join(rootDir, `packages/bpk-tokens/tokens/${BPK_TOKENS}.scss`)) : '',
              functions: sassFunctions,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: ENABLE_CSS_MODULES,
              localIdentName: '[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
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
              ],
            },
          },
        ],
      },
    ],
  },
};
