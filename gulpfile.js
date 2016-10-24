var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy:true});

gulp.task('compile:scss', () => {
    return gulp.src('./client/scss/**/*.scss')
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: ['last 2 version', '>1%']}))
        .pipe(gulp.dest('./public/css'));
});