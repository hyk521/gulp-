const gulp = require('gulp');
const gulpScss = require('gulp-sass');
const gulpBabel = require('gulp-babel');
const webServer = require('gulp-webserver');
const cleanCss = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const images1 = require('gulp-imagemin');
// 压缩scss
gulp.task('scss', () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(gulpScss())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('devJs', () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(gulpBabel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('./src/javascripts'))
})
gulp.task('webServer', () => {
    return gulp.src('./src')
        .pipe(webServer({
            port: 8080,
            livereload: true
        }))
})
gulp.task('watching', () => {
    return gulp.watch(['./src/scss/**/*.scss', './src/js/**/*.js'], gulp.series("scss", "devJs"))
})
gulp.task('default', gulp.series('scss', 'devJs', 'webServer', 'watching'))

// 上线
gulp.task('cleanCss', () => {
    return gulp.src('./src/css/**/*.css')
        .pipe(cleanCss({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./dist/css'))
})
gulp.task('htmlmin', () => {
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('./dist'))
})
gulp.task('uglify', () => {
    return gulp.src('./src/js/**/*.js')
    uglify()
        .pipe(gulp.dest('./dist/js'))
})
gulp.task('imagess', () => {
    return gulp.src('src/images/*')
        .pipe(images1())
        .pipe(gulp.dest('./dist/images'))
})