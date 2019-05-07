const gulp = require('gulp');
const browserSync = require('browser-sync');
const server = browserSync.create();

// const paths = {
//     styles: {
//         src: './website/assets/scss/**/*.scss',
//         dest: './website/temp/styles'
//     }
// };

function serve(done) {
    server.init({
        server: {
            baseDir: "./website"
        },
        port: 3000,
        notify: false
    });
    done();
}

function reload(done) {
    server.reload();
    done();
}

function watchFiles(done) {
    gulp.watch("./website/assets/scss/**/*.scss", styles);
    gulp.watch("./website/index.html", reload);
    // gulp.watch("./website/assets/scss/**/*.scss", styles);
    // gulp.watch("./website/assets/js/*.js", scripts);
    // gulp.watch("./website/index.html", browserSyncReload);
    // gulp.watch("./website/assets/images/**/*.{png,jpg,jpeg,svg,gif}", images);
    done();
}

exports.watch = gulp.parallel(watchFiles, serve);




// gulp.task("watch", ['fonts'], function() {

//     browserSync.init({
//         notify: false,
//         server: {
//             baseDir: "website"
//         }
//     });

//     watch('./website/*.html', function() {
//         browserSync.reload();
//     });

//     watch('./website/assets/scss/**/*.scss', function() {
//         gulp.start('cssInject');
//     });

//     watch('./website/assets/js/**/*.js', function() {
//         gulp.start('scriptsRefresh');
//     });

//     watch('./website/assets/php/**/*.php', function() {
//         gulp.start('scriptsRefresh');
//     });

//     watch('./website/assets/data/*.json', function() {
//         gulp.start('scriptsRefresh');
//     });

// });

// gulp.task('cssInject', ['styles'], function() {
//     return gulp.src('./website/temp/styles/sitestyles.css')
//         .pipe(browserSync.stream());
// });

// gulp.task('scriptsRefresh', ['scripts'], function() {
//     browserSync.reload();
// });