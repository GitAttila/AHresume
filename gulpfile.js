var gulp = require('gulp');
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var imagemin = require('gulp-imagemin');
var imageminPngQuant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var cssnano = require('gulp-cssnano');
var plumber = require('gulp-plumber');
// var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var browserSync = require('browser-sync');
var server = browserSync.create();
var webpack = require("webpack");
var webpackconfig = require("./webpack.config.js");
var webpackstream = require("webpack-stream");

var paths = {
    fonts: {
        src: './node_modules/@fortawesome/fontawesome-free/webfonts/**/*',
        dest: './website/temp/webfonts'
    },
    styles: {
        src: './website/assets/scss/sitestyles.scss',
        dest: './website/temp/styles'
    },
    scripts: {
        src: './website/assets/js/*.*',
        dest: './website/temp/js'
    },
    images: {
        src: './website/assets/images/**/*.{png,jpg,jpeg,svg,gif}',
        dest: './dist/assets/images'
    },
    html: {
        src: './website/*.html',
        dest: './dist'
    },
    temp: {
        src: './website/temp/**/*.*',
        dest: './dist/assets'
    }
};

function serve() {
    return server.init({
        server: {
            baseDir: "./website"
        },
        port: 3000,
        notify: false
    });
}

function reload() {
    server.reload();
}

function clean() {
    return del(['./dist']);
}

function html() {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest));
}

function tempFiles() {
    return gulp.src(paths.temp.src)
        .pipe(gulp.dest(paths.temp.dest));
}

function fonts() {
    return gulp.src(paths.fonts.src)
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest(paths.fonts.dest));
}

function images() {
    return gulp.src([paths.images.src])
        .pipe(imagemin(
            [
                imagemin.gifsicle(),
                imagemin.jpegtran(),
                imagemin.optipng(),
                imagemin.svgo(),
                imageminPngQuant(),
                imageminJpegRecompress()
            ], {
                progressive: true,
                interlaced: true,
                multipass: true,
                verbose: true
            }
        ))
        .pipe(gulp.dest(paths.images.dest));
}

function styles() {
    return gulp.src(paths.styles.src)
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
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest));
}

function serializefiles() {
    return gulp.src("./website/index.html")
        .pipe(usemin({
            js: [function() { return rev(); } /*, function(){ return uglify();}*/ ],
            css: [function() { return rev(); }, function() { return cssnano(); }]
        }))
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./dist'));
}

function scripts() {
    return (
        gulp
        .src([paths.scripts.src])
        .pipe(plumber())
        .pipe(webpackstream(webpackconfig, webpack))
        // folder only, filename is specified in webpack config
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(server.stream())
    );
}

function watch() {
    gulp.watch('./website/assets/js/**/*.js', scripts);
    gulp.watch(paths.images.src, images);
    gulp.watch('./website/assets/scss/**/*.scss', styles);
    gulp.watch(paths.html.src, reload);
}

var watch = gulp.parallel(watch, serve);

var build = gulp.series(clean, gulp.series(styles, scripts, html, fonts, gulp.parallel(images, serializefiles)));


exports.clean = clean;
exports.styles = styles;
exports.images = images;
exports.fonts = fonts;
exports.html = html;
exports.tempFiles = tempFiles;
exports.serializefiles = serializefiles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;

exports.default = build;