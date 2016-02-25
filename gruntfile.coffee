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
          outputStyle: 'expanded'
        files:
          'test-harness/test-harness.css': 'test-harness/test-harness.scss'

    json_to_sass:
      colours:
        files:
          'generated/_colours.scss': 'colours.json'

    datauri:
      elements:
        options:
          varPrefix: 'ls-element-'
          mapName: 'ls-elements'

        files:
          'generated/_elements.scss': 'svgs/elements/*.svg'

      smIcons:
        options:
          varPrefix: 'ls-icon-'
          mapName: 'ls-icons-sm'
          colors: colours

        files:
          'generated/_icons-sm.scss': 'svgs/icons/sm/*.svg'

      lgIcons:
        options:
          varPrefix: 'ls-icon-'
          mapName: 'ls-icons-lg'
          colors: colours

        files:
          'generated/_icons-lg.scss': 'svgs/icons/lg/*.svg'

      logos:
        options:
          varPrefix: 'ls-logo-'
          mapName: 'ls-logos'
          colors: colours

        files:
          'generated/_logos.scss': 'svgs/logos/*.svg'

      spinners:
        options:
          varPrefix: 'ls-'
          mapName: 'ls-spinners'
          colors: colours

        files:
          'generated/_spinners.scss': 'svgs/spinners/*.svg'

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
