/*
In Babel 7+, Babel stops looking for config files once it finds a package.json. As this
is a monorepo and the Babel config file is in the repo root, we need to tell Babel to go
upwards up the tree to find it.

Then, we need to call Webpack manually as when we don't do this we get an error.
*/

require('@babel/register')({
  rootMode: 'upward',
});

const webpack = require('webpack');

const config = require('./webpack.config.babel.js');

webpack(config);
