var gulp        = require('gulp');

var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var livereload  = require('gulp-livereload');


gulp.task('build', function () {
    // app.js is your main JS file with all your module inclusions
    return browserify({entries: './resources/static/javascript/src/main.js', debug: true})
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('main.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./resources/static/javascript/bin/'))
        .pipe(livereload());
});

gulp.task('watch', ['build'], function () {
    livereload.listen();
    gulp.watch('./resources/static/javascript/src/**/*.js', ['build']);
});

gulp.task('default', ['watch']);