module.exports = function (grunt) {
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    livereload: true,
                    hostname: '0.0.0.0',
                    protocol: 'http',
                    port: 9001,
                    base: './test-harness/',
                    open: true
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'test-harness/test-harness.css': 'test-harness/test-harness.scss'
                }
            }
        },
        watch: {
            options: {
                livereload: true,
                spawn: false,
            },
            html: {
                files: ['**/*.html'],
            },
            styles: {
                files: ['**/*.scss'],
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['connect', 'sass', 'watch']);
};