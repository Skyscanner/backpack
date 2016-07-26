var fs = require('fs')
var path = require('path')
var hasProp = {}.hasOwnProperty

var mapTemplate = function (options) {
  if (options == null) {
    options = {}
  }
  return '/// @group svgs\n$' + options.mapname + ': (\n' + options.vars + '\n);\n'
}

var mapVariableTemplate = function (options) {
  if (options == null) {
    options = {}
  }
  return options.varname + ': "' + options.base64Data + '",'
}

module.exports = function (grunt) {
  grunt.registerMultiTask('datauri', null, function () {
    var base64Data, color, colorizedSvgContents, dest, file, fileContents, i, imagePath, imageSources, j, len, len1, mapLines, options, ref, ref1, svgContents, varname
    options = this.options({
      colors: null,
      mapName: null
    })
    fileContents = ''
    mapLines = []
    ref = this.files
    for (i = 0, len = ref.length; i < len; i++) {
      file = ref[ i ]
      imageSources = file.src
      dest = file.dest
      for (j = 0, len1 = imageSources.length; j < len1; j++) {
        imagePath = imageSources[ j ]
        if (!grunt.file.exists(imagePath)) {
          grunt.log.warn('Source file "' + imagePath + '" not found.')
          return false
        }
        if (options.colors) {
          ref1 = options.colors
          for (color in ref1) {
            if (!hasProp.call(ref1, color)) continue
            svgContents = fs.readFileSync(imagePath).toString('utf-8')
            colorizedSvgContents = svgContents.replace(/(<svg[^>]+>)/im, '$1<style type="text/css">circle, ellipse, line, path, polygon, polyline, rect, text { fill: ' + options.colors[ color ] + ' !important }</style>')
            varname = '' + (path.basename(imagePath).split('.')[ 0 ]) + '-' + color
            base64Data = 'data:image/svg+xml;base64,' + (new Buffer(colorizedSvgContents).toString('base64'))

            if (options.mapName) {
              mapLines.push(mapVariableTemplate({
                varname: varname,
                base64Data: base64Data
              }))
            }
          }
        } else {
          svgContents = fs.readFileSync(imagePath).toString('utf-8')
          varname = '' + (path.basename(imagePath).split('.')[ 0 ])
          base64Data = 'data:image/svg+xml;base64,' + (new Buffer(svgContents).toString('base64'))

          if (options.mapName) {
            mapLines.push(mapVariableTemplate({
              varname: varname,
              base64Data: base64Data
            }))
          }
        }
      }
      if (options.mapName) {
        fileContents = mapTemplate({
          mapname: options.mapName,
          vars: mapLines.join('\n')
        })
      }
      grunt.file.write(dest, fileContents)
      grunt.log.writeln('File ' + dest + ' created.')
      grunt.log.writeln('Encoded and inlined ' + mapLines.length + ' map lines.')
    }
  })
}
