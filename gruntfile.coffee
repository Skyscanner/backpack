colours = require('./colours.json')

module.exports = (grunt) ->
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-json-to-sass')
  grunt.loadNpmTasks('grunt-sass')
  grunt.loadTasks('tasks')

  grunt.initConfig
    connect:
      server:
        options:
          livereload: true
          base: 'test-harness'
          open: true

    sass:
      dist:
        options:
          style: 'expanded'
        files:
          'test-harness/test-harness.css': 'test-harness/test-harness.scss'

    json_to_sass:
      colours:
        files:
          'generated/_colours.scss': 'colours.json'

    datauri:
      options:
        varPrefix: 'ls-icon-'
        colors: colours

      svgs:
        files:
          'generated/_icons.scss': 'svg/*.svg'

    watch:
      options:
        livereload: true
        spawn: false
      html:
        files: ['**/*.html']
      styles:
        files: ['**/*.scss']
        tasks: ['sass']

  grunt.registerTask 'generate', ['json_to_sass', 'datauri']
  grunt.registerTask 'default', ['connect', 'sass', 'watch']
