module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            styles: {
                src: ['stylus/*.scss'],
                dest: 'stylus/generated/common-styles.scss'
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('build', ['concat']);
};
