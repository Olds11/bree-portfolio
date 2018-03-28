var gulp = require("gulp"),
watch = require("gulp-watch"),
postcss = require("gulp-postcss"),
autoprefixer = require("autoprefixer"),
cssvars = require("postcss-simple-vars"),
nested = require("postcss-nested"),
cssImport = require("postcss-import"),
browserSync = require("browser-sync").create(),
mixins = require("postcss-mixins");

gulp.task("default", function() {
	console.log("Gulp Gulp");
});


//HTML

gulp.task("html", function () {
	console.log("HTML Task");
});

gulp.task("styles", function () {
	return gulp.src("./app/assets/styles/styles.css")
	.pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
	.pipe(gulp.dest("./app/temp/styles"));
});


//GULP WATCH 

gulp.task("watch", function(){

	browserSync.init({
		server: {
			baseDir: "app"
		}
	});

	watch("./app/index.html", function() {
		gulp.start("html");
		browserSync.reload();
	});

	watch("./app/assets/styles/**/*.css", function() {
		gulp.start("cssInject");
	});
});


//CSS INJECT
gulp.task("cssInject", ["styles"], function() {
	return gulp.src("./app/temp/styles")
	.pipe(browserSync.stream());
});
	


