'use strict';

const gulp = require('gulp');
const less = require('gulp-less');

gulp.task('less', function (){
        return gulp.src('src/styles/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist'));
})

gulp.task('watch', function () {
    gulp.watch('src/styles/*.less', gulp.series('less'));
})