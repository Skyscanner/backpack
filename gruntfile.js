module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            styles: {
                src: ['stylus/*.styl'],
                dest: 'common-styles.styl'
            }
        },
        watch: {
            styles: {
                files: ['stylus/*.styl'],
                tasks: ['concat']
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'watch']);
};
