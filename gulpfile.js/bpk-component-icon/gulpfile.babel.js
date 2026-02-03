/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const fs = require('fs');

const gulp = require('gulp');
const rename = require('gulp-rename');

const ICONS_FOLDER_PATH = './node_modules/@skyscanner/bpk-svgs/dist/js/icons';

const rm = (path, options) =>
  new Promise((resolve, reject) =>
    fs.rm(path, options, (err, ...d) => (err ? reject(err) : resolve(...d))),
  );
gulp.task('copy', () =>
  gulp
    .src(`${ICONS_FOLDER_PATH}/**/*`)
    .pipe(
      rename((path) => {
        if (path.extname === '.jsx') {
          // eslint-disable-next-line no-param-reassign
          path.extname = '.tsx';
        }
      }),
    )
    .pipe(gulp.dest('./packages/bpk-component-icon')),
);

gulp.task('clean', () =>
  Promise.all([
    rm('./packages/bpk-component-icon/sm', { force: true, recursive: true }),
    rm('./packages/bpk-component-icon/lg', { force: true, recursive: true }),
  ]),
);
gulp.task('generateIcons', gulp.series('clean', 'copy'));
