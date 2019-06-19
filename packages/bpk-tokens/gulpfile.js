/*
In Babel 7+, Babel stops looking for config files once it finds a package.json. As this
is a monorepo and the Babel config file is in the repo root, we need to tell Babel to go
upwards up the tree to find it.

Without this, gulp will not run as gulpfile.babel.js won't be transpiled and we'll get syntax
errors.
*/

require('@babel/register')({
  rootMode: 'upward',
});

require('./gulpfile.babel.js');
