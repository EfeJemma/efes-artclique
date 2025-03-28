const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');

// Compile SASS and Move Font-Awesome CSS
function scssTask(){
		return src('app/scss/style.scss' , { sourcemaps: true })
		.pipe(sass())
	//3. Where I save my CSS File
		.pipe(postcss([autoprefixer(), cssnano()]))
	.pipe(dest('dist' , { sourcemaps: '.' }));
}

// Move JS file to Assets 
function jsTask() {
	//1. Where is JS file
		return src('app/js/script.js' , { sourcemaps: true })
		.pipe(dest('dist', { sourcemaps: '.' }));
	.pipe(babel({ presents: ['@babel/present-env'] }))
	.pipe(terser())
}

// Watch SASS and Serve
function browserSyncServe(){
	browserSync.init({
		server: { 
			baseDir: '.',
	},
		notify; {
		styles: {
			top: 'auto',
			bottom: '0',
},
	},
				});
		cb();
	}

// Move Font_Awesome Fonts Folder to Assets 
function fonts(){
	//1. Where is Fonts Folder
		return gulp.src('./node_modules/font-awesome/fonts/*')
	//3. Where I save my Fonts Folder 
		.pipe(gulp.dest('./assets/fonts/'))
}

//Watch Task
function watchTask() {
	watch('*.html', browserSyncReload);
	watch(
		['app/scss/**/*.scss', 'app/**/*.js'],
		series(scssTask, jsTask, browserSyncReload)
		);
}
	
//Default Gulp Task 
	exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);

	//Build Gulp Task
	exports.build = series(scssTask, jsTask);

