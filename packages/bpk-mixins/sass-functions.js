/* eslint-disable */
import nodeSass from 'node-sass';

module.exports = {
  'encodebase64($string)': function (str) {
    var buffer = new Buffer(str.getValue());

    return nodeSass.types.String(buffer.toString('base64'));
  },
};
