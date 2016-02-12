var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var gulp = require('gulp');
gulp.task('serve', function() {
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    // edit the files you watch here
    gulp
        .watch(['js/*/*.js', 'css/*.css', 'img/*', '*.html', 'jasmine/spec/*.js'])
        .on('change', reload);
});