let gulp = require('gulp'),
    webpack = require('webpack'),
    watch   = require('gulp-watch'),
    sass    = require('gulp-sass'),
    cssmin  = require('gulp-cssmin'),
    rename  = require('gulp-rename'),
    gutil   = require('gulp-util'),
    sourcemaps  = require('gulp-sourcemaps'),
    gulpConnect = require('gulp-connect');

// postcss
let postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    mqpacker = require('css-mqpacker');

let config = require('./webpack.config');

let devAssetsPath = 'public/devAssets/',
    assetsPath = 'public/assets/';

var processors = [
    autoprefixer({
        browsers: [
            'last 2 version',
            'safari 5',
            'ie 8',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'
        ]
    }),
    mqpacker,
    cssnano({
        discardUnused: false,
        mergeIdents: false,
        reduceIdents: false,
        zindex: false
    })
];

let paths = {
    'style': {
        main: devAssetsPath + 'sass/main.scss',
        all: devAssetsPath + 'sass/**/*.scss',
        output: assetsPath + 'css'
    },
    'js': {}
};

var sassOptions = {
    onSuccess: function() {
        gutil.log(gutil.colors.green('sass skompilowany!'));
    },
    onError: function(err) {
        gutil.log(
            'sass error:',
            gutil.colors.red(err.message),
            gutil.colors.white('(' + err.line + ':' + err.column + ')'),
            gutil.colors.grey(err.file)
        );
        gutil.beep();
    },
    sync: true
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
       .pipe(sass(sassOptions)).on('error', function (err) {
           gutil.log(err);
       })
       .pipe(postcss(processors))
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