var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    pug = require('gulp-pug');
    chmod = require('gulp-chmod');  // ??

gulp.task('clean', () => {
  return del([
    './build/**/*.*', './build/**'
  ]);
});

// convertation
gulp.task('sass', () => { /* signal async completion issue */
  return gulp.src('./dev/static/sass/main.sass')
    .pipe(sass()) // convert command
    .on('error', notify.onError(function (error) {
      return {
        title: 'sass',
        message: error.message
      };
    }))
    .pipe(gulp.dest('./build/static/css/'))
    .pipe(browserSync.stream());
    /*.pipe(browserSync.reload({
      stream: true
    }));*/
});

gulp.task('pug', () => {
  return gulp.src('./dev/pug/pages/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .on('error', notify.onError(function(error) {
      return {
        title: 'pug',
        message: error.message
      };
    }))
    .pipe(gulp.dest('./build'))
    .on('end',browserSync.reload);
    //.pipe(browserSync.stream()); what difference between?
    /*.pipe(browserSync.reload({
      stream: true
    }));*/
});

gulp.task('fonts', () => {
  return gulp.src('./dev/static/fonts/**/*.*')
    .pipe(gulp.dest('./build/static/fonts'))
});

gulp.task('img', () => {
  return gulp.src('./dev/static/img/**/*.{png,jpg,gif,svg}')
    .pipe(gulp.dest('./build/static/img'))
});

// page initialisation + html,img,fonts. need to clean via del plugin
gulp.task('dev', gulp.series('clean', gulp.parallel('sass','pug','fonts','img')));

// watchers + fonts, ismg ...
gulp.task('watch', () => {
  gulp.watch('./dev/pug/**/*.pug', gulp.series('pug'));
  gulp.watch('./dev/static/sass/**/*.sass', gulp.series('sass'));
  gulp.watch('./dev/static/img/*.*', gulp.series('img'));
  //.on('change',browserSync.reload);
});

// server init
gulp.task('serve', () => {
  browserSync.init({
    server: './build'
  });
});

gulp.task('default', gulp.series('dev', gulp.parallel('serve','watch')));
