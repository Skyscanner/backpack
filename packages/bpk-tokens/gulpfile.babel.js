import path from 'path';
import _ from 'lodash';
import async from 'async';
import del from 'del';
import gulp from 'gulp';
import jsonLint from 'gulp-jsonlint';
import theo from 'theo';

import bpkScss from './formatters/bpk.scss';
import bpkDefaultScss from './formatters/bpk.default.scss';

const OUTPUT_MAP = {
  web: [
    'scss',
    'default.scss',
    'raw.json',
    'common.js',
  ],
  ios: ['ios.json'],
  android: ['android.xml'],
};

// Theo config

theo.registerFormat('scss', bpkScss);
theo.registerFormat('default.scss', bpkDefaultScss);

// Gulp task definitions

gulp.task('clean', () => del(['tokens']));

gulp.task('lint', () => {
  gulp.src('./src/**/*.json')
    .pipe(jsonLint())
    .pipe(jsonLint.reporter())
    .pipe(jsonLint.failAfterError());
});

const convert = (options, done) => {
  gulp.src(['./src/*.json'])
    .pipe(theo.plugins.transform(options.transform))
    .on('error', done)
    .pipe(theo.plugins.format(options.format))
    .on('error', done)
    .pipe(gulp.dest(path.resolve(__dirname, 'tokens')))
    .on('error', done)
    .on('finish', done);
};

gulp.task('tokens', ['clean', 'lint'], (done) => {
  const outputs = _(OUTPUT_MAP)
    .map((formats, transform) =>
      formats.map(format => ({
        format,
        transform,
      })),
    )
    .flatten()
    .value();

  async.each(outputs, convert, done);
});

gulp.task('default', ['tokens']);
