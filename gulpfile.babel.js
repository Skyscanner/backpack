import gulp from 'gulp'
import gzip from 'gulp-gzip'

gulp.task('gzip', () => {
  const globs = [
    './dist/**/*.js',
    './dist/**/*.css',
    './dist/**/*.html'
  ]

  gulp.src(globs)
    .pipe(gzip({ append: false }))
    .pipe(gulp.dest('./dist', { overwrite: true }))
})

gulp.task('default', [ 'gzip' ])
