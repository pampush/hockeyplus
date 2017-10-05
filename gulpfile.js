var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create();
// convertation
gulp.task('sass', () => { /* signal async completion issue */
  return gulp.src('./dev/static/sass/main.sass')
    .pipe(sass().on('error', sass.logError)) // convert command
    .pipe(gulp.dest('./dev/static/css'))
    //.pipe(browserSync.stream());
    .pipe(browserSync.reload({
      stream: true
    }));
});

/* test
gulp.task('html', () => {
    return gulp.src('./dev/*.html')
    .pipe(browserSync.stream());

});*/

// page initialisation + html,img,fonts. need to clean via del plugin
gulp.task('dev', gulp.series('sass'));

// watchers + fonts, img ...
gulp.task('watch', () => {
  gulp.watch('./dev/static/sass/**/*.sass', gulp.series('sass'));
  gulp.watch('./dev/*.html').on('change',browserSync.reload);
});

// server init
gulp.task('serve', () => {
  browserSync.init({
    server: './dev'
  });
});

gulp.task('default', gulp.series('dev', gulp.parallel('serve','watch')));
