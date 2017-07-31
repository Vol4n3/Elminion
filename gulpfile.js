const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('gulp-buffer');
const uglify = require('gulp-uglify');
const tap = require('gulp-tap');
const browserify = require('browserify');
const babel = require('babelify');
var browserSync = require('browser-sync').create();

function swallowError(error) {

  // If you want details of the error in the console
  console.log(error.toString())

  this.emit('end')
}
gulp.task('prebuild',() =>{
browserSync.init({
        proxy: "localhost:8081"
      });
});
gulp.task('build', () => {

  return gulp.src('./src/class/client.js', { read: false })
    .pipe(tap((file) => {
      
      file.contents = browserify(file.path, {
        debug: true
      }).transform(babel, {
        presets: ['es2015']
      }).bundle();
    }))
    .on('error', swallowError)
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/app/js/'));

});
gulp.task('watch', function () {
  gulp.watch('./src/class/*.js', ['build']);
  gulp.watch('./src/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['prebuild','build', 'watch']);
