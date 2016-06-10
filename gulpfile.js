var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');
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
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
    return gulp.src('Pagina/images/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({
        interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function(){
    return gulp.src('Pagina/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean:dist', function(){
    return del.sync('dist');
});

gulp.task('build', function(callback){
    runSequence('clean:dist',['sass','useref', 'images', 'fonts'], callback)
});

gulp.task('default', function(callback){
    runSequence(['sass','browserSync', 'watch'], callback)
});

// gulp.task('cache:clear', function(callback){
//     return cache.clearAll(callback);
// });
