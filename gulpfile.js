var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var del = require('del');

gulp.task('clean', function () {
	return del([
		'build/**/*'
	]);
});

gulp.task('js', function () {
	pump([
		gulp.src([
			'node_modules/jquery/dist/jquery.js',
			'node_modules/bootstrap/dist/js/bootstrap.js',
			'node_modules/bootbox/bootbox.js',
			'public/js/*.js'
		]),
		concat('main.js'),
		uglify(),
		rename({suffix: '.min'}),
		gulp.dest('./build/js/')
	]);
});

gulp.task('css', function () {
	pump([
		gulp.src([
			'node_modules/bootstrap/dist/css/bootstrap.css',
			'public/css/*.css'
		]),
		concat('main.css'),
		cleanCSS({compatibility: 'ie8'}),
		rename({suffix: '.min'}),
		gulp.dest('./build/css/')
	]);
});
gulp.task('fonts', function () {
	pump([
		gulp.src([
			'node_modules/bootstrap/dist/fonts/*.*'
		]),
		gulp.dest('./build/fonts/')
	]);
});

gulp.task('html', function () {
	pump([
		gulp.src('public/*.html'),
		htmlmin({collapseWhitespace: true}),
		gulp.dest('./build/')
	]);
});
gulp.task('watch', function(){
	gulp.watch('public/**', ['clean', 'js', 'css', 'fonts', 'html']);
	console.log('start watching on public/**');
});
gulp.task('default', ['clean', 'js', 'css', 'fonts', 'html', 'watch']);
