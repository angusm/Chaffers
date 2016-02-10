module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            options: {
                mangle: false,
                //beautify: true
            },
            modules: {
                files: {
                    'resources/static/javascript/main.min.js': [

                        //TODO: Embedded to speed up minification, put back in for production
                        //'resources/static/javascript/angular.js',
                        //'resources/static/javascript/angular-cookies.js',

                        'resources/static/javascript/djangular.js',
                        'resources/static/javascript/handies.js',
                        'resources/static/javascript/backend_models.js',
                        'resources/static/javascript/chaffers.js',
                        '*/static/javascript/*/**/*.js',
                        '!resources/static/javascript/main.min.js'
                    ]
                }
            }
        },

        watch: {
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

    // Default task(s).
    grunt.registerTask('default', ['uglify']);
}