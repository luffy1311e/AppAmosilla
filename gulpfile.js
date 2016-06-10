var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var browserSync = require('browser-Sync').create();

gulp.task('sass',function(){
    return gulp.src('Pagina/SCSS/**/*.scss')
    .pipe(sass()) // using gulp-sass
    .pipe(gulp.dest('Pagina/CSS'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('watch',['browserSync', 'sass'], function(){
    // Watch HTML, SCSS, JS
    gulp.watch('Pagina/SCSS/**/*.scss', ['sass']);
    gulp.watch('Pagina/*.html', browserSync.reload);
    gulp.watch('Pagina/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync',function(){
    browserSync.init({
        server: {
            baseDir: 'Pagina'
        },
    })
});

gulp.task('useref', function(){
    return gulp.src('Pagina/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});
