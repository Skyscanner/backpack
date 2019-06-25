/*
In Babel 7+, Babel stops looking for config files once it finds a package.json. As this
is a monorepo and the Babel config file is in the repo root, we need to tell Babel to go
upwards up the tree to find it.

Then, we need to call Webpack manually.
*/

require('@babel/register')({
  rootMode: 'upward',

  // Since Babel ignores all files outside the cwd, it does not compile
  // sibling packages. This rewrites the ignore list to only include node_modules.
  ignore: ['node_modules'],
});

const webpack = require('webpack');

const config = require('./webpack.config.babel.js');

webpack(config);
