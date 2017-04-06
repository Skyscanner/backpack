import fs from 'fs';
import del from 'del';
import path from 'path';
import gulp from 'gulp';

const ICONS_FOLDER_PATH = './node_modules/bpk-svgs/dist/js/icons';

const getFolders = dir =>
  fs.readdirSync(dir)
    .filter(file => fs.statSync(path.join(dir, file)).isDirectory());

gulp.task('clean', () => del(getFolders(ICONS_FOLDER_PATH)));

gulp.task('copy', () => {
  gulp
    .src(`${ICONS_FOLDER_PATH}/**/*.js`)
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['copy']);
