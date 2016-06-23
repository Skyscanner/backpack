colours = require('./colours.json')

module.exports = (grunt) ->
  grunt.loadNpmTasks('grunt-contrib-compress')
  grunt.loadNpmTasks('grunt-json-to-sass')
  grunt.loadTasks('tasks')

  grunt.initConfig

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

      smSpinners:
        options:
          varPrefix: 'ls-'
          mapName: 'ls-spinners-sm'
          colors: colours

        files:
          'generated/_spinners-sm.scss': 'svgs/spinners/sm/*.svg'

      lgSpinners:
        options:
          varPrefix: 'ls-'
          mapName: 'ls-spinners-lg'
          colors: colours

        files:
          'generated/_spinners-lg.scss': 'svgs/spinners/lg/*.svg'

      xlSpinners:
        options:
          varPrefix: 'ls-'
          mapName: 'ls-spinners-xl'
          colors: colours

        files:
          'generated/_spinners-xl.scss': 'svgs/spinners/xl/*.svg'

    compress:
      docs:
        options:
          mode: 'gzip'

        files: [
          { expand: true, cwd: 'dist/', src: ['**/*.js'], dest: 'dist/', ext: '.js' }
          { expand: true, cwd: 'dist/', src: ['**/*.css'], dest: 'dist/', ext: '.css' }
          { expand: true, cwd: 'dist/', src: ['**/*.html'], dest: 'dist/', ext: '.html' }
        ]

  grunt.registerTask 'generate', ['json_to_sass', 'datauri']
  grunt.registerTask 'default', ['generate']
