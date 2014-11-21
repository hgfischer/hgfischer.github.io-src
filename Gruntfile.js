module.exports = function(grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    grunt.initConfig({

        less: {
            compileTheme: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'site-theme.css.map',
                    sourceMapFilename: 'static/css/site-theme.css.map'
                },
                src: 'less/theme.less',
                dest: 'static/css/site-theme.css'
            }
        },

        autoprefixer: {
            options: {
                browsers: [
                    "Android 2.3",
                    "Android >= 4",
                    "Chrome >= 20",
                    "Firefox >= 24",
                    "Explorer >= 8",
                    "iOS >= 6",
                    "Opera >= 12",
                    "Safari >= 6"
                ]
            },
            theme: {
                options: {
                    map: true
                },
                src: 'static/css/site-theme.css'
            }
        },

        csslint: {
            options: {
                csslintrc: 'less/.csslintrc'
            },
            dist: [
                'static/css/bootstrap-theme.css'
            ]
        },

        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '*',
                noAdvanced: true
            },
            minifyTheme: {
                src: 'static/css/site-theme.css',
                dest: 'static/css/site-theme.min.css'
            }
        },

        csscomb: {
            options: {
                config: 'less/.csscomb.json'
            },
            dist: {
                expand: true,
                cwd: 'static/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'static/css/'
            }
        },

        watch: {
            less: {
                files: 'less/**/*.less',
                tasks: 'less'
            }
        },

        exec: {
            npmUpdate: {
                command: 'npm update'
            }
        }
    });


    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies'
    });

    require('time-grunt')(grunt);

    grunt.registerTask('theme', ['less:compileTheme', 'autoprefixer:theme', 'csscomb:dist', 'cssmin:minifyTheme']);
};
