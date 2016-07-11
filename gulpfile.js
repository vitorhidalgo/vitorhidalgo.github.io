var gulp      = require('gulp');
var filter    = require('gulp-filter');
var uglify    = require('gulp-uglify');
var concat    = require('gulp-concat');
var bower     = require('main-bower-files');
var debug     = require('gulp-debug');
var edit      = require('gulp-edit');
var minifycss = require('gulp-cssnano');
var flatten   = require('gulp-flatten');
var sass      = require('gulp-sass');
var webserver = require('gulp-webserver');

gulp.task
(
	'vendor',
	function()
	{
		var jsFilter    = filter( '*.js', { restore : true });
		var cssFilter   = filter( '*.css', { restore : true });
		var imageFilter = filter( ['*.jpg', '*.gif', '*.png', '*.svg'], { restore: true } );
		var fontFilter  = filter( ['*.eot', '*.woff', '*.woff2', '*.svg', '*.ttf'], { restore: true } );

		var bower_options =
		{
			'overrides' :
			{
				'jquery' :
				{
					'ignore' : true
				}
			}
		};

		return gulp
			.src(bower(bower_options))
			// JS
			.pipe(debug())
			.pipe(jsFilter)
			.pipe(debug())
			.pipe(uglify())
			.pipe(concat('vendor.min.js', { newLine : '\r\n' }))
			.pipe(edit(function(src, cb){ src = '// Last modified: ' + new Date().toLocaleString() + '\n\n' + src; cb(null, src);}))
			.pipe(gulp.dest('assets/js'))
			.pipe(jsFilter.restore)
			// CSS
			.pipe(cssFilter)
			.pipe(minifycss({'keepSpecialComments' : 0}))
			.pipe(concat('vendor.min.css', { newLine : '\r\n' }))
			.pipe(edit(function(src, cb) { src = '/* Last modified: ' + new Date().toLocaleString() + '*/\n\n' + src; cb(null, src); }))
			.pipe(gulp.dest('assets/css'))
			.pipe(cssFilter.restore)
			// FONTS
			.pipe(fontFilter)
			.pipe(flatten())
			.pipe(gulp.dest('/assets/css/fonts'))
			.pipe(fontFilter.restore)
			// IMAGES & ICONS
			.pipe(imageFilter)
			.pipe(flatten())
			.pipe(gulp.dest('/assets/img/vendor'))
			.pipe(imageFilter.restore)

			.on('end', function() { console.log( 'Gulp Task', 'Vendor task complete' ); });
	}
);

gulp.task
(
	'sass',
	function()
	{
		return gulp.src('./assets/sass/style.scss')
			.pipe(concat('style.css'))
			.pipe(sass().on('error', sass.logError))
			.pipe(edit(function(src, cb) { src = '/* Last modified: ' + new Date().toLocaleString() + '*/\n\n' + src; cb(null, src); }))
			.pipe(gulp.dest('./assets/css'));
	}
);

gulp.task
(
	'sass-watch',
	function()
	{
		gulp.watch('assets/sass/**/*.scss', ['sass']);
	}
);

gulp.task
(
	'default', 
	function()
	{
		console.log('gulp');
	}
);
