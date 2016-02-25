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
      colors: null
      mapName: null

    lines = []
    mapLines = []

    _(@files).each (file) ->
      imageSources = file.src
      dest = file.dest

      _(imageSources).each (imagePath) ->
        unless grunt.file.exists(imagePath)
          grunt.log.warn "Source file \"" + imagePath + "\" not found."
          return false

        if options.colors
          _(_.keys(options.colors)).each (color) ->
            svgContents = fs.readFileSync(imagePath).toString('utf-8');
            colorizedSvgContents = svgContents.replace(/(<svg[^>]+>)/im, '$1<style type="text/css">circle, ellipse, line, path, polygon, polyline, rect, text { fill: ' + options.colors[color] + ' !important; }</style>')

            varname = "#{options.varPrefix}#{path.basename(imagePath).split('.')[0]}-#{color.replace('ls-color-', '')}"
            base64_data = "data:image/svg+xml;base64,#{new Buffer(colorizedSvgContents).toString('base64')}"

            lines.push(variableTemplate({varname, base64_data}))
            mapLines.push(mapVariableTemplate({varname, base64_data})) if options.mapName
        else
          svgContents = fs.readFileSync(imagePath).toString('utf-8');

          varname = "#{options.varPrefix}#{path.basename(imagePath).split('.')[0]}"
          base64_data = "data:image/svg+xml;base64,#{new Buffer(svgContents).toString('base64')}"

          lines.push(variableTemplate({varname, base64_data}))
          mapLines.push(mapVariableTemplate({varname, base64_data})) if options.mapName

      fileContents = lines.join("")

      if options.mapName
        fileContents += mapTemplate(
          mapname: options.mapName
          vars: mapLines.join("\n")
        )

      grunt.file.write(dest, fileContents)

      grunt.log.writeln "File #{dest} created."
      grunt.log.writeln "Encoded and inlined #{lines.length} variable lines."
      grunt.log.writeln "Encoded and inlined #{mapLines.length} map lines."
