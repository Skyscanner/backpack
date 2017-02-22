import { Transform } from 'stream';
import { PluginError } from 'gulp-util';
import loader from 'react-svg-loader';

const PLUGIN_NAME = 'svg2react';

module.exports = (opts = {}) => {
  const stream = new Transform({ objectMode: true });

  stream._transform = (file, encoding, cb) => { // eslint-disable-line no-underscore-dangle
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    if (file.isBuffer()) {
      const query = `?${JSON.stringify({
        jsx: true,
        svgo: opts,
      })}`;

      return loader.apply({
        query,
        cacheable() {},
        addDependency() {},
        async() {
          return (err, result) => {
            if (err) {
              return cb(err, null);
            }
            file.contents = new Buffer(result); // eslint-disable-line no-param-reassign
            return cb(null, file);
          };
        },
      }, [String(file.contents)]);
    }

    return cb(new PluginError(PLUGIN_NAME, 'Data type not supported'));
  };

  return stream;
};
