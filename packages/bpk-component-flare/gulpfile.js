/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

const gulp = require('gulp');
const rename = require('gulp-rename');
const svgmin = require('gulp-svgmin');

const svg2react = require('./tasks/svg2react');

const svgoCommonPlugins = [
  { removeTitle: true },
  { removeStyleElement: true },
  { removeEmptyContainers: true },
  { sortAttrs: true },
  { removeUselessDefs: true },
  { removeEmptyText: true },
  { removeEditorsNSData: true },
  { removeEmptyAttrs: true },
  { removeHiddenElems: true },
];

gulp.task('pointer-base', () => {
  const optimised = gulp
    .src('src/svgs/**/*.svg')
    .pipe(
      svgmin({
        plugins: [
          ...svgoCommonPlugins,
          {
            removeAttrs: {
              attrs: [
                'id',
                'class',
                'width',
                'height',
                'data-name',
                'fill',
                'fill-rule',
              ],
            },
          },
        ],
      }),
    )
    .pipe(gulp.dest('src/svgs'));

  return optimised
    .pipe(svg2react())
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('src/__generated__/js'));
});

gulp.task('default', gulp.series('pointer-base'));
