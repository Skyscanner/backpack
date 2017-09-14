/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import _ from 'lodash';
import chmod from 'gulp-chmod';
import clone from 'gulp-clone';
import concat from 'gulp-concat';
import del from 'del';
import gulp from 'gulp';
import gulpFilter from 'gulp-filter';
import merge from 'merge-stream';
import rename from 'gulp-rename';
import svg2png from 'gulp-svg2png';
import svgmin from 'gulp-svgmin';
import tinycolor from 'tinycolor2';
import tokens from 'bpk-tokens/tokens/base.raw.json';

import svg2react from './tasks/svg2react';
import svg2datauri, { sassMap, svg2sassvar } from './tasks/svg2datauri';

const remToPx = (value) => {
  let parsed = null;

  if (/rem$/.test(value)) {
    parsed = parseFloat(value.replace(/rem/, '')) * 16;
  }

  return parsed || null;
};

const smallIconSize = tokens.props.ICON_SIZE_SM.value;
const smallIconPxSize = remToPx(smallIconSize);
const largeIconSize = tokens.props.ICON_SIZE_LG.value;
const largeIconPxSize = remToPx(largeIconSize);

const colors = _(tokens.props)
  .filter({ category: 'colors', type: 'color' })
  .keyBy('name')
  .mapValues('value')
  .mapKeys((value, key) => _.kebabCase(key).replace('color-', ''))
  .mapValues(value => tinycolor(value).toHexString())
  .value();

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

gulp.task('clean', () => del(['dist']));

/*
  ELEMENTS
*/
gulp.task('elements', () => {
  const optimised = gulp
    .src('src/elements/**/*.svg')
    .pipe(chmod(0o644))
    .pipe(svgmin({
      plugins: [
        ...svgoCommonPlugins,
        {
          removeAttrs: {
            attrs: ['id', 'class', 'data-name'],
          },
        },
      ],
    }))
    .pipe(gulp.dest('src/elements'));

  return optimised
    .pipe(svg2datauri())
    .pipe(concat('_elements.scss'))
    .pipe(sassMap('bpk-elements'))
    .pipe(gulp.dest('dist/scss'));
});

/*
  SPINNERS
*/
gulp.task('spinners', () => {
  const optimised = gulp
    .src('src/spinners/**/*.svg')
    .pipe(chmod(0o644))
    .pipe(svgmin({
      plugins: [
        ...svgoCommonPlugins,
        {
          removeAttrs: {
            attrs: ['id', 'class', 'data-name', 'fill', 'fill-rule'],
          },
        },
      ],
    }))
    .pipe(gulp.dest('src/spinners'));

  const react = optimised
    .pipe(clone())
    .pipe(svg2react())
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('dist/js/spinners'));

  const reactNative = [];
  for (let i = 1; i < 4; i += 1) {
    const rnSpinners = optimised
        .pipe(gulpFilter('**/spinner.svg'))
        .pipe(svg2png({ width: 24 * i }))
        .pipe(rename({
          suffix: `@${i}x`,
        }))
        .pipe(gulp.dest('dist/png/spinners/'));

    reactNative.push(rnSpinners);
  }

  const datauri = optimised
    .pipe(clone())
    .pipe(svg2datauri({ colors }))
    .pipe(concat('_spinners.scss'))
    .pipe(sassMap('bpk-spinners'))
    .pipe(gulp.dest('dist/scss'));

  return merge(react, reactNative, datauri);
});

/*
  ICONS
*/
gulp.task('icons-common', () => gulp
  .src('src/icons/**/*.svg')
  .pipe(chmod(0o644))
  .pipe(svgmin({
    plugins: [
      ...svgoCommonPlugins,
      {
        removeAttrs: {
          attrs: ['id', 'class', 'data-name', 'fill', 'fill-rule', 'width', 'height', 'viewBox'],
        },
      },
      {
        addAttributesToSVGElement: {
          attribute: `viewBox="0 0 ${largeIconPxSize} ${largeIconPxSize}"`,
        },
      },
    ],
  }))
  .pipe(gulp.dest('src/icons')));

gulp.task('icons-sm', ['icons-common'], () => {
  const svgs = gulp
    .src('src/icons/**/*.svg')
    .pipe(chmod(0o644));

  const styleAttribute = `style="width:${smallIconSize};height:${smallIconSize}"`;

  const react = svgs
    .pipe(clone())
    .pipe(svgmin({
      plugins: [
        {
          addAttributesToSVGElement: {
            attribute: `width="${smallIconPxSize}" height="${smallIconPxSize}" ${styleAttribute}`,
          },
        },
      ],
    }))
    .pipe(svg2react())
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('dist/js/icons/sm'));

  const reactNative = [];
  for (let i = 1; i < 4; i += 1) {
    const rnIconsSm = svgs
        .pipe(svg2png({ width: 18 * i }))
        .pipe(rename({
          suffix: `@${i}x`,
        }))
        .pipe(gulp.dest('dist/png/icons/sm/'));

    reactNative.push(rnIconsSm);
  }

  const datauri = svgs
    .pipe(clone())
    .pipe(svgmin({
      plugins: [
        {
          addAttributesToSVGElement: {
            attribute: `width="${smallIconPxSize}" height="${smallIconPxSize}"`,
          },
        },
      ],
    }))
    .pipe(svg2datauri({ colors }))
    .pipe(concat('_icons-sm.scss'))
    .pipe(sassMap('bpk-icons-sm'))
    .pipe(gulp.dest('dist/scss'));

  const rawDatauri = svgs
    .pipe(clone())
    .pipe(svgmin({
      plugins: [
        {
          addAttributesToSVGElement: {
            attribute: `width="${smallIconPxSize}" height="${smallIconPxSize}"`,
          },
        },
      ],
    }))
    .pipe(svg2sassvar())
    .pipe(concat('_icons-no-color-sm.scss'))
    .pipe(sassMap('bpk-icons-no-color-sm'))
    .pipe(gulp.dest('dist/scss'));

  return merge(react, reactNative, datauri, rawDatauri);
});

gulp.task('icons-lg', ['icons-common'], () => {
  const svgs = gulp
    .src('src/icons/**/*.svg')
    .pipe(chmod(0o644));

  const styleAttribute = `style="width:${largeIconSize};height:${largeIconSize}"`;

  const react = svgs
    .pipe(clone())
    .pipe(svgmin({
      plugins: [
        {
          addAttributesToSVGElement: {
            attribute: `width="${largeIconPxSize}" height="${largeIconPxSize}" ${styleAttribute}`,
          },
        },
      ],
    }))
    .pipe(svg2react())
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('dist/js/icons/lg'));

  const reactNative = [];
  for (let i = 1; i < 4; i += 1) {
    const rnIconsLg = svgs
        .pipe(svg2png({ width: 24 * i }))
        .pipe(rename({
          suffix: `@${i}x`,
        }))
        .pipe(gulp.dest('dist/png/icons/lg/'));

    reactNative.push(rnIconsLg);
  }

  const datauri = svgs
    .pipe(clone())
    .pipe(svgmin({
      plugins: [
        {
          addAttributesToSVGElement: {
            attribute: `width="${largeIconPxSize}" height="${largeIconPxSize}"`,
          },
        },
      ],
    }))
    .pipe(svg2datauri({ colors }))
    .pipe(concat('_icons-lg.scss'))
    .pipe(sassMap('bpk-icons-lg'))
    .pipe(gulp.dest('dist/scss'));

  const rawDatauri = svgs
    .pipe(clone())
    .pipe(svgmin({
      plugins: [
        {
          addAttributesToSVGElement: {
            attribute: `width="${largeIconPxSize}" height="${largeIconPxSize}"`,
          },
        },
      ],
    }))
    .pipe(svg2sassvar())
    .pipe(concat('_icons-no-color-lg.scss'))
    .pipe(sassMap('bpk-icons-no-color-lg'))
    .pipe(gulp.dest('dist/scss'));

  return merge(react, reactNative, datauri, rawDatauri);
});

gulp.task('default', ['elements', 'spinners', 'icons-sm', 'icons-lg']);
