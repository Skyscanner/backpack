const fs = require('fs');
const path = require('path');
const autoprefixer = require('autoprefixer');
const sassFunctions = require('packages/bpk-mixins/sass-functions');

const rootDir = path.resolve(__dirname, '../');
const BPK_TOKENS = process.env.BPK_TOKENS;

module.exports = {
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass?config=sass'],
        include: rootDir,
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: rootDir,
      },
    ],
  },

  postcss() {
    return [autoprefixer({ browsers: ['last 20 versions'] })];
  },

  sass: {
    data: BPK_TOKENS ? fs.readFileSync(path.join(rootDir, `packages/bpk-tokens/tokens/${BPK_TOKENS}.scss`)) : '',
    functions: sassFunctions,
  },
};
