const gulp= require('gulp');
const sourcemaps= require('gulp-sourcemaps');
const buffer= require('gulp-buffer');
const uglify= require('gulp-uglify');
const tap = require('gulp-tap');
const browserify= require('browserify');
const babel = require('babelify');

gulp.task('build', () => {

  return gulp.src('./src/class/client.js', { read: false })
    .pipe(tap((file) => {
      file.contents = browserify(file.path, {
        debug: true
      }).transform(babel, {
        presets: [ 'es2015' ]
      }).bundle();
    }))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/app/js/'));
});


gulp.task('default', ['build']);
