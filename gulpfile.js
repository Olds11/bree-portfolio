var gulp = require("gulp"),
watch = require("gulp-watch"),
postcss = require("gulp-postcss"),
autoprefixer = require("autoprefixer"),
cssvars = require("postcss-simple-vars"),
nested = require("postcss-nested"),
cssImport = require("postcss-import"),
browserSync = require("browser-sync").create(),
mixins = require("postcss-mixins"),
hexrgba = require("postcss-hexrgba"),
imagemin = require("gulp-imagemin"),
del = require("del"),
usemin = require("gulp-usemin"),
rev = require("gulp-rev"),
cssnano = require("gulp-cssnano"),
uglify = require("gulp-uglify-es").default;


gulp.task("default", function() {
	console.log("Gulp Gulp");
});


//HTML

gulp.task("html", function () {
	console.log("HTML Task");
});

gulp.task("styles", function () {
	return gulp.src("./app/assets/styles/styles.css")
	.pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
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
	

//BUILD	

gulp.task("deleteDistFolder", function() {
	return del("./dist");
});

gulp.task("optimizeImages", ["deleteDistFolder"], function(){
	return gulp.src(["./app/assets/images/**/*"])
	.pipe(imagemin({
		progressive: true,
		interlaced: true,
		multipass: true
	}))
	.pipe(gulp.dest("./dist/assets/images"));
});

gulp.task("otherPages", ["deleteDistFolder"], function() {
	return gulp.src(["./app/alex-milhous-collection.html", "./app/clear-view.html", "./app/pig-dice.html"])
	.pipe(gulp.dest("./dist"));
});

gulp.task("usemin", ["deleteDistFolder", "styles"], function() {
	return gulp.src("./app/index.html")
	.pipe(usemin({
		css: [function(){return rev()}, function(){return cssnano()}],
		js: [function(){return rev()}, function(){return uglify()}]
	}))
	.pipe(gulp.dest("./dist"));
});

gulp.task("previewDist", function() {
	browserSync.init({
		server: {
			baseDir: "dist"
		}
	});

});


gulp.task("build", ["deleteDistFolder", "optimizeImages", "usemin", "otherPages"]);


















