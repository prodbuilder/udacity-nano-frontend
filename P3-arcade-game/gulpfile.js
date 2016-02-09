var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var gulp = require('gulp');
var jshint = require('gulp-jshint');

// Static server
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "./"
//         }
//     });
// });
// Browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Lint task.
gulp.task('lint', function() {
    gulp.src('js/*.js')
        .pipe(jshint());
});

// // Default task to be run with `gulp`.
// gulp.task('default', ['lint', 'browser-sync'], function () {
//     gulp.watch(['js/*.js', '*.html', 'jasmine/spec/*.js'], ['lint', 'browser-sync']).on('change', reload);
// });


//both works
gulp.task('serve', function() {
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    var watched_files = ['js/*.js', '*.html', 'jasmine/spec/*.js'];
    gulp
        .watch(watched_files)
        .on('change', reload);
});
