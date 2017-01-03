var gulp = require('gulp');
var gulpConcat = require('gulp-concat');
var gulpUglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('build-dist', function (cb) {
    pump([
        gulp.src('jquery.btnswitch.js'),
            gulpConcat('jquery.btnswitch.min.js'),
            gulpUglify(),
            gulp.dest('dist')
    ], cb);
});

gulp.task('default', ['build-dist']);