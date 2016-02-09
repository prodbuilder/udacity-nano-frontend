[Getting started with gulp](https://travismaynard.com/writing/getting-started-with-gulp)

**tl;dr action item:**

1. Check that you have node and npm. If not, install them.
`node -v`
`npm -v`

2. navigate to project folder and `npm init`

Need to do this both:
- Install gulp globally

```sh
sudo npm install -g gulp
gulp -v
```

- Install gulp locally
`npm install --save-dev gulp`

3. install plugins
`npm install jshint gulp-jshint gulp-sass gulp-concat gulp-uglify gulp-rename -browser-sync -save-dev`

4. Browser sync (autoload when you save changes, like Python)
https://www.browsersync.io/docs/api/
Post 2.0.0 syntax is different! Pay attention when you search for stuff online!

5. how to check npm package versions
`npm list packagename` to find out installed package versions
`npm list packagename -g` to find globally installed package versions

e.g.
```sh
npm list browser-sync
p3-arcade-game@1.0.0 /your/loca/dev/directory
└── browser-sync@2.11.1
```

Another quick way of finding out what packages are installed locally and without their dependencies is to use:
`npm list --depth=0`

6. A simple `gulpfile.js` to get started
```javascript
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
        .watch(['js/*.js', '*.html', 'jasmine/spec/*.js'])
        .on('change', reload);
});
```

7. run `gulp serve` will live reload browser upon any change in watched files.