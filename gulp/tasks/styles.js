var gulp = require("gulp"),
    autoprefixer = require("gulp-autoprefixer"),
    sourcemaps = require("gulp-sourcemaps"),
    sass = require("gulp-sass"),
    cleanCSS = require("gulp-clean-css"),
    concat = require("gulp-concat");


function styles() {
    return gulp.src('./website/assets/scss/sitestyles.scss')
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: 'compressed' //compressed
            }).on('error', sass.logError)
        )
        .pipe(autoprefixer({
            grid: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./website/temp/styles'));
};

gulp.task('styles', function() {
    return styles();
});