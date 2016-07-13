module.exports = (grunt) ->
  grunt.loadNpmTasks('grunt-contrib-compress')

  grunt.initConfig
    compress:
      docs:
        options:
          mode: 'gzip'

        files: [
          { expand: true, cwd: 'dist/', src: ['**/*.js'], dest: 'dist/' }
          { expand: true, cwd: 'dist/', src: ['**/*.css'], dest: 'dist/' }
          { expand: true, cwd: 'dist/', src: ['**/*.html'], dest: 'dist/' }
        ]

  grunt.registerTask 'default', ['compress']
