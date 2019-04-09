'use strict';

var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var csso = require('gulp-csso');	
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var browseReload = require('browser-sync');
var concat = require('gulp-concat');

gulp.task('pug', function buildHTML() {
	return gulp.src('src/pug/pages/*.pug')
		.pipe(pug({
			pretty:true
		}))
		.pipe(gulp.dest('build'))
		.on('end', browseReload.reload);
});

gulp.task('sass', function() {
	return gulp.src('src/static/sass/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(postcss([
			autoprefixer({
				browsers: [
				"last 1 version",
				"last 2 Chrome versions",
				"last 2 Firefox versions",
				"last 2 Opera versions",
				"last 2 Edge versions"
				]})
			]))
		.on("error", notify.onError(function (error) {
        return "Message to the notifier: " + error.message;
      }))
		.pipe(csso())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/static/css/'))
		.pipe(browseReload.reload({
			stream: true
		}));
});

gulp.task('scriptsLib', function() {
	return gulp.src(['node_modules/jquery/dist/jquery.min.js', 
					 'node_modules/slick-carousel/slick/slick.min.js'])
		.pipe(concat('libs.min.js'))
		.pipe(gulp.dest('build/static/js/'))
		.pipe(browseReload.reload({
			stream: true
		}));
});

gulp.task('scripts', function() {
	return gulp.src('src/static/js/main.js')
		.pipe(gulp.dest('build/static/js/'))
		.pipe(browseReload.reload({
			stream: true
		}));
});

gulp.task('serve', function() {
	browseReload.init({
		server: "./build"
	});
});

gulp.task('watch', function() {
	gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
	gulp.watch('src/static/sass/**/*.scss', gulp.series('sass'));
	gulp.watch('src/static/js/main.js', gulp.series('scripts'))
})

gulp.task('default', gulp.series(
	gulp.parallel('pug', 'sass', 'scriptsLib', 'scripts'),
	gulp.parallel('watch', 'serve')
));

