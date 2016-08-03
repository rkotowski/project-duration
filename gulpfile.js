let gulp = require('gulp'),
    webpack = require('webpack'),
    watch   = require('gulp-watch'),
    sass    = require('gulp-sass'),
    cssmin  = require('gulp-cssmin'),
    rename  = require('gulp-rename'),
    gutil   = require('gulp-util'),
    sourcemaps  = require('gulp-sourcemaps'),
    gulpConnect = require('gulp-connect');

let config = require('./webpack.config');

let devAssetsPath = 'public/devAssets/',
    assetsPath = 'public/assets/';

let paths = {
    'style': {
        main: devAssetsPath + 'sass/main.scss',
        all: devAssetsPath + 'sass/**/*.scss',
        output: assetsPath + 'css'
    },
    'js': {}
};

function onBuild(done) {
    return function (err, stats) {
        if(err) {
            console.log('Error', err);
        } else {
            console.log(stats.toString());
        }
        if(done) {
            done();
        }
    }
}

// sass compiler
gulp.task('compileSass', function () {
   gulp.src(paths.style.main)
       .pipe(sourcemaps.init())
       .pipe(sass())
       .pipe(rename({ suffix:'-min' }))
       .pipe(sourcemaps.write())
       .pipe(gulp.dest(paths.style.output).on('error', gutil.log))
       .pipe(gulpConnect.reload());
});

// gulp dev bundler
gulp.task('devBundler', function () {
    webpack(config).watch(100, onBuild());
});

// reload page when spotted css changes
gulp.task('gulpLivereload', function () {
   gulpConnect.server({ livereload: true, port:8080 });
});

// gulp css watcher
gulp.task('watch', ['gulpLivereload'], function () {
   gulp.watch(paths.style.all, ['compileSass']);
});

// set default task
gulp.task('default', []);