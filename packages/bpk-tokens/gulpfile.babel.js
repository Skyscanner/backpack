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

import fs from 'fs';
import path from 'path';

import del from 'del';
import gulp from 'gulp';
import theo from 'theo';
import gulpTheo from 'gulp-theo';
import { flatten } from 'lodash';
import gulpMerge from 'merge2';
import jsonLint from 'gulp-jsonlint';

import transformDarkValues from './src/transformDarkValues';
import bpkScss from './formatters/bpk.scss';
import bpkEs6Js from './formatters/bpk.es6.js';
import bpkIosJson from './formatters/bpk.ios.json';
import bpkRawJson, {
  bpkRawJsonAndroid,
  bpkRawJsonIos,
} from './formatters/bpk.raw.json';
import bpkCommonJs from './formatters/bpk.common.js';
import bpkAndroid from './formatters/bpk.android.xml';
import bpkDefaultScss from './formatters/bpk.default.scss';
import {
  bpkReactNativeEs6JsIos,
  bpkReactNativeEs6JsAndroid,
} from './formatters/bpk.react.native.es6.js';
import {
  bpkReactNativeCommonJsIos,
  bpkReactNativeCommonJsAndroid,
} from './formatters/bpk.react.native.common.js';

const RAW_FORMATS = {
  web: ['raw.json'],
  ios: ['raw.ios.json'],
  android: ['raw.android.json'],
};

const PLATFORM_FORMATS = {
  web: ['scss', 'default.scss', 'common.js', 'es6.js'],
  ios: [
    'ios.json',
    'react.native.ios.js',
    { format: 'IOS_react.native.es6.js', nest: true },
    { format: 'IOS_react.native.common.js', nest: true },
  ],
  android: [
    'android.xml',
    'react.native.android.js',
    { format: 'ANDROID_react.native.es6.js', nest: true },
    { format: 'ANDROID_react.native.common.js', nest: true },
  ],
};

const createTokenSets = formats =>
  flatten(
    Object.keys(formats).map(platform =>
      formats[platform].map(format =>
        typeof format !== 'string'
          ? { platform, ...format }
          : { platform, format },
      ),
    ),
  );

const rawTokenSets = createTokenSets(RAW_FORMATS);
const platformTokenSets = createTokenSets(PLATFORM_FORMATS);

theo.registerFormat('scss', bpkScss);
theo.registerFormat('default.scss', bpkDefaultScss);
theo.registerFormat('es6.js', bpkEs6Js);
theo.registerFormat('raw.json', bpkRawJson);
theo.registerFormat('ios.json', bpkIosJson);
theo.registerFormat('raw.ios.json', bpkRawJsonIos);
theo.registerFormat('raw.android.json', bpkRawJsonAndroid);
theo.registerFormat('react.native.ios.js', bpkReactNativeEs6JsIos);
theo.registerFormat('react.native.android.js', bpkReactNativeEs6JsAndroid);
theo.registerFormat('ANDROID_react.native.es6.js', bpkReactNativeEs6JsAndroid);
theo.registerFormat(
  'ANDROID_react.native.common.js',
  bpkReactNativeCommonJsAndroid,
);
theo.registerFormat('IOS_react.native.es6.js', bpkReactNativeEs6JsIos);
theo.registerFormat('IOS_react.native.common.js', bpkReactNativeCommonJsIos);
theo.registerFormat('common.js', bpkCommonJs);
theo.registerFormat('android.xml', bpkAndroid);

theo.registerTransform('ios', ['color/hex8rgba']);
theo.registerTransform('android', ['color/hex8rgba']);

gulp.task('clean', done => del(['tokens'], done));

gulp.task('lint', () =>
  gulp
    .src('./src/**/*.json')
    .pipe(jsonLint())
    .pipe(jsonLint.reporter())
    .pipe(jsonLint.failAfterError()),
);

const createTokens = (tokenSets, done) => {
  const streams = tokenSets.map(({ platform, format, nest }) => {
    let outputPath = 'tokens';

    if (nest) {
      outputPath = `${outputPath}/${platform}`;
    }

    return gulp
      .src([`./src/${platform}/*.json`])
      .pipe(
        gulpTheo({
          transform: { type: platform },
          format: { type: format },
        }),
      )
      .on('error', done)
      .pipe(transformDarkValues())
      .on('error', done)
      .pipe(gulp.dest(path.resolve(__dirname, outputPath)))
      .on('error', done)
      .on(`finish`, () => {
        const oldPath = path.resolve(outputPath, `base.${format}`);
        const newPath = path.resolve(
          outputPath,
          `base.${format}`
            .split('ANDROID_')
            .join('')
            .split('IOS_')
            .join(''),
        );
        if (oldPath !== newPath) {
          fs.renameSync(oldPath, newPath);
        }
      });
  });

  gulpMerge(streams).on('finish', done);
};

const createRawTokens = done => createTokens(rawTokenSets, done);
const createPlatformTokens = done => createTokens(platformTokenSets, done);

gulp.task('tokens:raw', createRawTokens);

gulp.task('tokens:platform', createPlatformTokens);

gulp.task(
  'tokens',
  gulp.series(gulp.parallel('clean', 'lint'), 'tokens:raw', 'tokens:platform'),
);

gulp.task('default', gulp.series('tokens'));
