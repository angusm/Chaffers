module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            options: {
                mangle: false,
                beautify: true
            },
            modules: {
                files: {
                    'resources/static/javascript/main.min.js': [
                        'resources/static/javascript/angular.js',
                        'resources/static/javascript/djangular.js',
                        'resources/static/javascript/handies.js',
                        'resources/static/javascript/backend_models.js',
                        'resources/static/javascript/chaffers.js',
                        '*/static/javascript/*/**/*.js',
                        '!resources/static/javascript/main.min.js'
                    ]
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);
}