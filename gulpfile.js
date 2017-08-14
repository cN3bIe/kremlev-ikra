'use strict';
var
gulp = require( 'gulp' ),
sass = require( 'gulp-sass' ),
browserSync = require( 'browser-sync' ),
concat = require( 'gulp-concat' ),
uglifyjs = require( 'gulp-uglifyjs' ),
cssnano = require( 'gulp-cssnano' ),
// uncss = require( 'gulp-uncss' ),
rename = require( 'gulp-rename' ),
pagebuilder = require('gulp-pagebuilder'),
sourcemaps = require('gulp-sourcemaps'),
// htmlmin = require('gulp-htmlmin'),
del = require( 'del' );


gulp.task( 'sass',()=>{
	return gulp.src('src/sass/**/*.+(sass|scss)')
		.pipe(sourcemaps.init())
		.pipe( sass({ outputStyle: 'compact' }) ).on( 'error', sass.logError )
		/*.pipe( uncss({
			html: ['src/**//*.html']
		}) )*/
		.pipe(sourcemaps.write())
		.pipe( gulp.dest('src/css') )
		.pipe( browserSync.reload({ stream:!0 }) );
})


.task( 'html',()=>{
	return gulp.src( 'src/html/page/**/*.html' )
		.pipe( pagebuilder( 'src/html/template'))
		// .pipe( htmlmin( {collapseWhitespace: true} ) )
		.pipe( gulp.dest('src'));
})


.task( 'browser-sync',()=>{
	browserSync({
		/*server:{
			baseDir: 'src/'
			},*/
		proxy:'http://ikra.ru/',
		notify: false
	});
})


.task( 'custom-libs-sass',()=>{
	return gulp.src([
			'src/libs/custom/sass/custom.sass'
		])
		.pipe(sourcemaps.init())
		.pipe( sass({ outputStyle: 'compact' }) ).on( 'error', sass.logError )
		.pipe( rename({'suffix':'.min'}) )
		.pipe(sourcemaps.write())
		.pipe( gulp.dest( 'src/libs/custom/dist' ) );
})


.task( 'custom-libs-js',()=>{
	return gulp.src([
			'src/libs/custom/js/markup.js',
			'src/libs/material-design-lite/material.min.js',
			'src/libs/custom/js/waves/waves.js',
		])
		.pipe(sourcemaps.init())
		.pipe( concat( 'custom.min.js') )
		.pipe( uglifyjs() )
		.pipe(sourcemaps.write())
		.pipe( gulp.dest( 'src/libs/custom/dist' ) );
})


.task( 'js-libs',['custom-libs-js'],()=>{
	return gulp.src( [
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/node-waves/dist/waves.min.js',
		'node_modules/jquery-mask-plugin/dist/jquery.mask.min.js',
		'node_modules/jquery-lazy/jquery.lazy.min.js',
		'src/libs/social-share-kit-1.0.14/dist/js/social-share-kit.min.js',
		'src/libs/custom/dist/custom.min.js',
		] )
		.pipe(sourcemaps.init())
		.pipe( concat( 'libs.min.js') )
		.pipe( uglifyjs() )
		.pipe(sourcemaps.write())
		.pipe( gulp.dest( 'src/js' ) );
})



.task( 'css-libs',['custom-libs-sass'],()=>{
	return gulp.src([
			'src/libs/social-share-kit-1.0.14/dist/css/social-share-kit.css',
			'src/libs/custom/dist/custom.min.css',
			'src/libs/material-design-lite/material.min.css',
		])
		.pipe(sourcemaps.init())
		.pipe( concat( 'libs.min.css' ) )
		.pipe( cssnano() )
		.pipe(sourcemaps.write())
		.pipe( gulp.dest( 'src/css') );
})


.task( 'fonts-libs',()=>{
	return gulp.src([
			'src/libs/social-share-kit-1.0.14/dist/fonts/**/*'
		])
		.pipe( gulp.dest( 'src/fonts' ) );
})



.task( 'libs',[ 'css-libs','js-libs','fonts-libs' ])


.task( 'clean',()=>{
	return del.sync( 'dist' );
})



.task( 'build',[ 'clean','sass','libs' ],()=>{
	var css = gulp.src( 'src/css/**/*.css' ).pipe( gulp.dest( 'dist/css' ) );
	var img = gulp.src( 'src/img/**/*').pipe( gulp.dest( 'dist/img' ) );
	var fonts = gulp.src('src/fonts/**/*').pipe( gulp.dest( 'dist/fonts' ) );
	var js = gulp.src( 'src/js/**/*' ).pipe( gulp.dest( 'dist/js' ) );
	var html = gulp.src('src/*.html').pipe( gulp.dest( 'dist' ) );
		return ;
})


.task( 'html-watch',['html'], (done)=>{ browserSync.reload(); done(); } )


.task( 'watch', ()=>{
	gulp.watch( 'src/sass/**/*.+(sass|scss)', ['sass'] );
	gulp.watch( 'src/js/**/*.js',browserSync.reload );
	gulp.watch( 'src/html/**/*.html', ['html-watch'] );
});



gulp.task( 'default',['html','sass','libs','browser-sync','watch']);