module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            modules: {
                options: {
                    mangle: false,
                    beautify: true,
                    sourceMap: true,
                    screwIE8: true
                },
                files: {
                    'resources/static/javascript/main.min.js': [

                        // JQuery Things
                        'resources/static/javascript/jquery-2.2.1.js',

                        // Angular things
                        'resources/static/javascript/angular.js',

                        // 3rd Party Angular modules
                        'resources/static/javascript/angular-cookies.js',
                        'resources/static/javascript/angular_ui/ui-bootstrap-tpls-1.2.1.min.js',
                        'resources/static/javascript/isteven_multi_select/isteven-multi-select.js',

                        // Custom Angular modules
                        'resources/static/javascript/djangular.js',
                        'resources/static/javascript/handies.js',
                        'resources/static/javascript/backend_models.js',
                        'resources/static/javascript/animated_dom.js',

                        // Main site module
                        'resources/static/javascript/chaffers.js',
                        'resources/static/javascript/*/**/*.js',

                        // Things to ignore
                        '!resources/static/javascript/main.min.js'
                    ]
                }
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'resources/static/css/style.css': 'resources/scss/style.scss'
                }
            }
        },

        watch: {
            css: {
                files: [
                    'resources/scss/*.scss'
                ],
                tasks: ['sass']
            },
            scripts: {
                files: [
                    '*/static/javascript/**/*.js',
                    '!resources/static/javascript/main.min.js'
                ],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Load a watcher
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Load the SASS plugin
    grunt.loadNpmTasks('grunt-sass');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('default', ['sass']);
}