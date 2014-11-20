var gulp = require('gulp');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var paths = {
    scripts: ['src/**/*.js'],
    styles: ['src/**/*.scss']
}

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(concat('bootstrap.min.js'))
        .pipe(gulp.dest('static/js'));
});

gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(sass())
        .pipe(minifycss())
        .pipe(concat('bootstrap.min.css'))
        .pipe(gulp.dest('static/css'));
});

gulp.task('default', function() {
    gulp.run('scripts', 'styles');
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
});
