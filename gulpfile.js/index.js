const gulp = require('gulp');

require('./bpk-component-flare/gulpfile');
require('./bpk-component-icon/gulpfile');

gulp.task('default', gulp.series('generateFlare', 'generateIcons'));
