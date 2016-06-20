fs = require("fs")
path = require("path")

variableTemplate = (options = {}) ->
  "$#{options.varname}: \"#{options.base64_data}\";\n"

mapTemplate = (options = {}) ->
  "$#{options.mapname}: (\n#{options.vars}\n);\n"

mapVariableTemplate = (options = {}) ->
  "#{options.varname}: \"#{options.base64_data}\","

module.exports = (grunt) ->

  grunt.registerMultiTask "datauri", "Generates .scss datauri variables for .{png,gif,jpg} and .svg, and replaces color definitions in .svg files.", ->
    options = @options
      varPrefix: 'data-image-'
      colors: null
      mapName: null

    lines = []
    mapLines = []

    for file in @files
      imageSources = file.src
      dest = file.dest

      for imagePath in imageSources
        unless grunt.file.exists(imagePath)
          grunt.log.warn "Source file \"" + imagePath + "\" not found."
          return false

        if options.colors
          for own color of options.colors
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
