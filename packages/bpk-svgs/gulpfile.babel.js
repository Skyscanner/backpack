/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

import del from 'del';
import _ from 'lodash';
import gulp from 'gulp';
import chmod from 'gulp-chmod';
import clone from 'gulp-clone';
import rename from 'gulp-rename';
import svgmin from 'gulp-svgmin';
import concat from 'gulp-concat';
import merge from 'merge-stream';
import tinycolor from 'tinycolor2';
import tokens from 'bpk-tokens/tokens/base.raw.json';
import iconfont from 'gulp-iconfont';
import punycode from 'punycode';
import fs from 'fs';
import svg2react from './tasks/svg2react';
import svg2datauri, { sassMap, svg2sassvar } from './tasks/svg2datauri';
import getIconFontMetadataProvider from './tasks/getIconFontMetadataProvider';

const remToPx = value => {
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
    .pipe(
      svgmin({
        plugins: [
          ...svgoCommonPlugins,
          {
            removeAttrs: {
              attrs: ['id', 'class', 'data-name'],
            },
          },
        ],
      }),
    )
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
    .pipe(
      svgmin({
        plugins: [
          ...svgoCommonPlugins,
          {
            removeAttrs: {
              attrs: ['id', 'class', 'data-name', 'fill', 'fill-rule'],
            },
          },
        ],
      }),
    )
    .pipe(gulp.dest('src/spinners'));

  const react = optimised
    .pipe(clone())
    .pipe(svg2react())
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('dist/js/spinners'));

  const datauri = optimised
    .pipe(clone())
    .pipe(svg2datauri({ colors }))
    .pipe(concat('_spinners.scss'))
    .pipe(sassMap('bpk-spinners'))
    .pipe(gulp.dest('dist/scss'));

  return merge(react, datauri);
});

/*
  ICONS
*/
gulp.task('icons-common', () =>
  gulp
    .src('src/icons/**/*.svg')
    .pipe(chmod(0o644))
    .pipe(
      svgmin({
        plugins: [
          ...svgoCommonPlugins,
          {
            removeAttrs: {
              attrs: [
                'id',
                'class',
                'data-name',
                'fill',
                'fill-rule',
                'width',
                'height',
                'viewBox',
              ],
            },
          },
          {
            addAttributesToSVGElement: {
              attribute: `viewBox="0 0 ${largeIconPxSize} ${largeIconPxSize}"`,
            },
          },
        ],
      }),
    )
    .pipe(gulp.dest('src/icons')),
);

gulp.task('icons-sm', ['icons-common'], () => {
  const svgs = gulp.src('src/icons/**/*.svg').pipe(chmod(0o644));

  const styleAttribute = `style="width:${smallIconSize};height:${smallIconSize}"`;

  const react = svgs
    .pipe(clone())
    .pipe(
      svgmin({
        plugins: [
          {
            addAttributesToSVGElement: {
              attribute: `width="${smallIconPxSize}" height="${smallIconPxSize}" ${styleAttribute}`,
            },
          },
        ],
      }),
    )
    .pipe(svg2react())
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('dist/js/icons/sm'));

  const datauri = svgs
    .pipe(clone())
    .pipe(
      svgmin({
        plugins: [
          {
            addAttributesToSVGElement: {
              attribute: `width="${smallIconPxSize}" height="${smallIconPxSize}"`,
            },
          },
        ],
      }),
    )
    .pipe(svg2datauri({ colors }))
    .pipe(concat('_icons-sm.scss'))
    .pipe(sassMap('bpk-icons-sm'))
    .pipe(gulp.dest('dist/scss'));

  const rawDatauri = svgs
    .pipe(clone())
    .pipe(
      svgmin({
        plugins: [
          {
            addAttributesToSVGElement: {
              attribute: `width="${smallIconPxSize}" height="${smallIconPxSize}"`,
            },
          },
        ],
      }),
    )
    .pipe(svg2sassvar())
    .pipe(concat('_icons-no-color-sm.scss'))
    .pipe(sassMap('bpk-icons-no-color-sm'))
    .pipe(gulp.dest('dist/scss'));

  return merge(react, datauri, rawDatauri);
});

gulp.task('icons-lg', ['icons-common'], () => {
  const svgs = gulp.src('src/icons/**/*.svg').pipe(chmod(0o644));

  const styleAttribute = `style="width:${largeIconSize};height:${largeIconSize}"`;

  const react = svgs
    .pipe(clone())
    .pipe(
      svgmin({
        plugins: [
          {
            addAttributesToSVGElement: {
              attribute: `width="${largeIconPxSize}" height="${largeIconPxSize}" ${styleAttribute}`,
            },
          },
        ],
      }),
    )
    .pipe(svg2react())
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('dist/js/icons/lg'));

  const datauri = svgs
    .pipe(clone())
    .pipe(
      svgmin({
        plugins: [
          {
            addAttributesToSVGElement: {
              attribute: `width="${largeIconPxSize}" height="${largeIconPxSize}"`,
            },
          },
        ],
      }),
    )
    .pipe(svg2datauri({ colors }))
    .pipe(concat('_icons-lg.scss'))
    .pipe(sassMap('bpk-icons-lg'))
    .pipe(gulp.dest('dist/scss'));

  const rawDatauri = svgs
    .pipe(clone())
    .pipe(
      svgmin({
        plugins: [
          {
            addAttributesToSVGElement: {
              attribute: `width="${largeIconPxSize}" height="${largeIconPxSize}"`,
            },
          },
        ],
      }),
    )
    .pipe(svg2sassvar())
    .pipe(concat('_icons-no-color-lg.scss'))
    .pipe(sassMap('bpk-icons-no-color-lg'))
    .pipe(gulp.dest('dist/scss'));

  return merge(react, datauri, rawDatauri);
});

gulp.task('icons-font', ['icons-common'], () => {
  /* We generate two copies of the exact same font here because when we
   * integrate both the React Native Icon and iOS Icon in the same iOS
   * app the underlying names in the font have to be different to
   * prevent UIKit from refusing to load either font. Setting a
   * different name for the `fontName` parameter of `iconFont`
   * ensures this happens. Simply having a different name on
   * disk is not enough as UIKit uses the name at index 1 in
   * the name table of the font for uniqueness.
   */
  const generateFont = (name = 'BpkIcon') =>
    gulp
      .src('src/icons/**/*.svg')
      .pipe(chmod(0o644))
      .pipe(
        iconfont({
          metadataProvider: getIconFontMetadataProvider(
            'tasks/codepoints.json',
          ),
          fontName: name,
          formats: ['ttf', 'eot', 'woff'],
          /**
           * Normalize and fontHeight(>1000) are needed in order to have all the glyphs rendered
           * correctly, for more info go to the npm package docs
           * https://www.npmjs.com/package/gulp-iconfont
           */
          normalize: true,
          fontHeight: 1001,
          timestamp: 1436442578, // A static timestamp to prevent changes showing up in git, backpack's first commit!
        }),
      );

  const fontStream = generateFont();
  const saveFonts = [
    fontStream.pipe(clone()).pipe(gulp.dest('dist/font')),
    generateFont('BpkIconIOS')
      .pipe(clone())
      .pipe(gulp.dest('dist/font')),
  ];

  const saveMapping = fontStream.on('glyphs', glyphs => {
    const baseDir = 'dist/font';
    const mapping = glyphs.reduce((acc, glyph) => {
      // use punycode to get the text representation of the unicode
      acc[glyph.name] = punycode.ucs2
        .decode(glyph.unicode[0])
        .map(point => `${point.toString(16).toUpperCase()}`)
        .join('');
      return acc;
    }, {});

    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir);
    }

    const mappingStream = fs.createWriteStream(`${baseDir}/iconMapping.json`, {
      flags: 'w',
    });

    mappingStream.write(JSON.stringify(mapping, null, 4));
    mappingStream.end();
  });

  return merge(...saveFonts, saveMapping);
});

gulp.task('copy-svgs', ['icons-common'], () =>
  gulp
    .src('src/**/*.svg')
    .pipe(clone())
    .pipe(gulp.dest('dist/svgs')),
);

gulp.task('default', [
  'elements',
  'spinners',
  'icons-sm',
  'icons-lg',
  'icons-font',
  'copy-svgs',
]);
