fs = require("fs")
path = require("path")
_ = require("underscore")
datauri = require("datauri")

"use strict"

module.exports = (grunt) ->
  _.templateSettings = {interpolate: /\{\{(.+?)\}\}/g}
  variableTemplate = _.template('${{ varname }}: "{{base64_data}}";\n')
  mapTemplate = _.template('${{ mapname }}: (\n{{ vars }}\n);\n')
  mapVariableTemplate = _.template('{{ varname }}: "{{base64_data}}",')

  grunt.registerMultiTask "datauri", "Generates .scss datauri variables for .{png,gif,jpg} and .svg, and replaces color definitions in .svg files.", ->
    options = @options
      varPrefix: 'data-image-'
      colors: undefined
      useMap: false

    lines = []

    _(@files).each (file) ->
      imageSources = file.src
      dest = file.dest

      _(imageSources).each (imagePath) ->
        unless grunt.file.exists(imagePath)
          grunt.log.warn "Source file \"" + imagePath + "\" not found."
          return false

        template = if options.useMap then mapVariableTemplate else variableTemplate

        _(_.keys(options.colors)).each (color) ->
          svgContents = fs.readFileSync(imagePath).toString('utf-8');
          colorizedSvgContents = svgContents.replace(/(<svg[^>]+>)/im, '$1<style type="text/css">circle, ellipse, line, path, polygon, polyline, rect, text { fill: ' + options.colors[color] + ' !important; }</style>')

          lines.push(
            template(
              varname: "#{options.varPrefix}#{path.basename(imagePath).split('.')[0]}-#{color.replace('ls-color-', '')}"
              base64_data: "data:image/svg+xml;base64,#{new Buffer(colorizedSvgContents).toString('base64')}"
            )
          )

      if options.useMap
        grunt.file.write(dest, mapTemplate(
          mapname: options.useMap
          vars: lines.join("\n")
        ))
      else
        grunt.file.write(dest, lines.join(""))

      grunt.log.writeln "File #{dest} created."
      grunt.log.writeln "Encoded and inlined #{lines.length} lines."
