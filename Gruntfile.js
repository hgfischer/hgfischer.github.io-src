module.exports = function(grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    grunt.initConfig({

        less: {
            compileCore: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'bootstrap.css.map',
                    sourceMapFilename: 'static/css/bootstrap.css.map'
                },
                src: 'less/bootstrap.less',
                dest: 'static/css/bootstrap.css'
            },
            compileTheme: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'theme.css.map',
                    sourceMapFilename: 'static/css/theme.css.map'
                },
                src: 'less/theme.less',
                dest: 'static/css/theme.css'
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
            core: {
                options: {
                    map: true
                },
                src: 'static/css/bootstrap.css'
            },
            theme: {
                options: {
                    map: true
                },
                src: 'static/css/theme.css'
            }
        },

        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '*',
                noAdvanced: true
            },
            minifyCore: {
                src: 'static/css/bootstrap.css',
                dest: 'static/css/bootstrap.min.css'
            },
            minifyTheme: {
                src: 'static/css/theme.css',
                dest: 'static/css/theme.min.css'
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
			tasks: 'shell:touch',
            less: {
                files: 'less/**/*.less',
                tasks: 'theme'
            },
			options: {
				spawn: false,
				debounceDelay: 10
			}
        },

		shell: {
			touch: {
				command: 'touch content/about.md'
			}
		},

		htmllint: {
			all: [ 'public/**/*.html' ]
		}
    });


    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies'
    });

    require('time-grunt')(grunt);

    grunt.registerTask('theme', [
		'less:compileCore', 
		'less:compileTheme', 
		'autoprefixer:core', 
		'autoprefixer:theme', 
		'csscomb:dist', 
		'cssmin:minifyCore',
		'cssmin:minifyTheme'
	]);
};
