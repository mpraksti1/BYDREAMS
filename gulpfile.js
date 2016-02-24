// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint      = require('gulp-jshint');
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var connect     = require('gulp-connect');
var copy        = require('gulp-copy');
var livereload  = require('gulp-livereload');

var vendorScripts = [
    'bower_components/angular/angular.min.js',
    'bower_components/angular-ui-router/release//angular-ui-router.min.js',
];


//spin up local server
gulp.task('server', function(){
    connect.server({
        root: "dist",
        livereload: true,
        port: 4000
    })
});

gulp.task('copy-index', function(){
    return gulp.src('*.html')
        .pipe(copy('dist'))
        .pipe(livereload());;
});

gulp.task('copy-vendor', function(){
    return gulp.src(vendorScripts)
        .pipe(copy('dist/vendor'));
});

gulp.task('copy-templates', function(){
    return gulp.src('src/templates/*.html')
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('dist/templates'))
        .pipe(livereload());;
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/js/*.js', ['lint', 'scripts']);
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/templates/*.html', ['copy-templates']);
    gulp.watch('*.html', ['copy-index']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'copy-index', 'copy-vendor', 'copy-templates', 'server', 'watch']);






