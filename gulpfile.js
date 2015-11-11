const del = require('del');
const gulp = require('gulp');
const argv = require('yargs').argv;
const stylus = require('gulp-stylus');
const wrap = require('gulp-wrap');
const nib = require('nib');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const source = require('vinyl-source-stream');

const task = gulp.task.bind(gulp);
const series = gulp.series.bind(gulp);
const parallel = gulp.parallel.bind(gulp);

function clean() {

  return del('lib');

}

function styles() {

  return gulp.src('src/styles/*.styl')
    .pipe(stylus({ use: nib() }))
    .pipe(concat('styles.js'))
    .pipe(wrap("module.exports = `<%= contents %>`;"))
    .pipe(gulp.dest('lib'));

}

function scripts() {

  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'));

}

task(clean);
task(scripts);
task(styles);
task('build', series(clean, parallel(scripts, styles)))
