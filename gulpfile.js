let gulp = require('gulp');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let cleanCSS = require('gulp-clean-css');
let sourcemaps = require('gulp-sourcemaps');
let filesExist = require('files-exist');

gulp.task('js', function () {
    gulp.src(filesExist([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js'
    ]))
        .pipe(sourcemaps.init())
        .pipe(concat('build-scripts.min.js', {newLine: ";\r\n"}))
        .pipe(uglify())
        .pipe(sourcemaps.write('../js'))
        .pipe(gulp.dest('js'));
});

gulp.task('css', function () {
    gulp.src(filesExist([
        'node_modules/bootstrap/dist/css/bootstrap.css',
    ]))
        .pipe(sourcemaps.init())
        .pipe(concat('build-styles.min.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('../css'))
        .pipe(gulp.dest('css'));
});

gulp.task('default', ['js', 'css'], function () {});
