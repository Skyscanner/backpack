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

import fs from 'fs';
import path from 'path';

import del from 'del';
import gulp from 'gulp';

const ICONS_FOLDER_PATH = './node_modules/@skyscanner/bpk-svgs/dist/js/icons';

const getFolders = (dir) =>
  fs
    .readdirSync(dir)
    .filter((file) => fs.statSync(path.join(dir, file)).isDirectory());

gulp.task('clean', (done) => del(getFolders(ICONS_FOLDER_PATH), done));

gulp.task('copy', () =>
  gulp.src(`${ICONS_FOLDER_PATH}/**/*.js`).pipe(gulp.dest('.')),
);

gulp.task('default', gulp.series('copy'));
