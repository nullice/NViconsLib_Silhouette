var gulp = require('gulp'),
    rename = require("gulp-rename"),
    iconfont = require('gulp-iconfont'),
    consolidate = require('gulp-consolidate');


gulp.task('iconfont', function() {
  gulp.src('svg/*.svg')
    .pipe(iconfont({
      fontName: 'nvicons',
      normalize: true,
      centerHorizontally: true,
      appendCodepoints: true
    })).on('codepoints', function(codepoints) {
      var options = {
        glyphs: codepoints,
        fontName: 'nvicons',
        fontPath: '../font/',
        className: 'nv'
      };
      gulp.src('template/font-template.css')
        .pipe(consolidate('lodash', options))
        .pipe(rename({
          basename: 'nvicons'
        }))
        .pipe(gulp.dest('css/'));

      gulp.src('template/font-template.html')
        .pipe(consolidate('lodash', options))
        .pipe(rename({
          basename: 'nvicons'
        }))
        .pipe(gulp.dest('.'));
    })
    .pipe(gulp.dest('font/'));
});



gulp.task('default', function() {
  gulp.start('iconfont');
});