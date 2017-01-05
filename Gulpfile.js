var gulp = require('gulp');
var cleanCss = require('gulp-clean-css');
var gulpConcat = require('gulp-concat');
var gulpUglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('build-dist', function () {
    pump([
        gulp.src('jquery.btnswitch.css'),
        cleanCss(),
        gulpConcat('jquery.btnswitch.min.css'),
        gulp.dest('dist')
    ]);

    pump([
        gulp.src('jquery.btnswitch.js'),
            gulpConcat('jquery.btnswitch.min.js'),
            gulpUglify(),
            gulp.dest('dist')
    ]);
});

gulp.task('default', ['build-dist']);