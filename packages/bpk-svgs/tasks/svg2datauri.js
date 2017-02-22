import path from 'path';
import { Transform } from 'stream';
import { PluginError } from 'gulp-util';

const PLUGIN_NAME = 'svg2datauri';

var mapTemplate = function (options = {}) {
  return '/// @group svgs\n$' + options.mapName + ': (\n' + options.vars + '\n);\n'
}

var mapVariableTemplate = function (options) {
  if (options == null) {
    options = {};
  }
  return options.varname + ': "' + options.base64Data + '",'
}

const encodeSvg = (svgContents, color) => {
  if (color) {
    const colorizedSvgContents = svgContents.replace(/(<svg[^>]+>)/im, '$1<style type="text/css">circle, ellipse, line, path, polygon, polyline, rect, text { fill: ' + color + ' !important }</style>')

    return 'data:image/svg+xml;base64,' + (new Buffer(colorizedSvgContents).toString('base64'))
  } else {
    return 'data:image/svg+xml;base64,' + (new Buffer(svgContents).toString('base64'))
  }
}

const svg2datauri = (svgContents, svgName, colors) => {
  if (colors) {
    return Object.keys(colors).map((color) => mapVariableTemplate({
      varname: svgName + '-' + color,
      base64Data: encodeSvg(svgContents, colors[color]),
    })).join('\n');
  } else {
    // no colors
    return mapVariableTemplate({
      varname: svgName,
      base64Data: encodeSvg(svgContents),
    });
  }
}

export default (opts = {}) => {
  const stream = new Transform({ objectMode: true });

  stream._transform = (file, encoding, cb) => { // eslint-disable-line no-underscore-dangle
    console.log(file.path)
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    if (file.isBuffer()) {
      file.contents = new Buffer(
        svg2datauri(String(file.contents), path.basename(file.path).split('.')[ 0 ], opts.colors),
      );
      return cb(null, file);
    }

    return cb(new PluginError(PLUGIN_NAME, 'Data type not supported'));
  };

  return stream;
};

export const sassMap = (mapName) => {
  const stream = new Transform({ objectMode: true });

  stream._transform = (file, encoding, cb) => { // eslint-disable-line no-underscore-dangle
    if (file.isNull()) {
      return cb(null, file);
    }

    if (!mapName) {
      return cb(new PluginError(PLUGIN_NAME, 'Cannot create Sass map without a name'));
    }

    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    if (file.isBuffer()) {
      file.contents = new Buffer(
        mapTemplate({
          mapName,
          vars: String(file.contents),
        }),
      );
      return cb(null, file);
    }

    return cb(new PluginError(PLUGIN_NAME, 'Data type not supported'));
  };

  return stream;
}
