import del from 'del';
import _ from 'lodash';
import gulp from 'gulp';
import clone from 'gulp-clone';
import rename from 'gulp-rename';
import svgmin from 'gulp-svgmin';
import concat from 'gulp-concat';
import merge from 'merge-stream';
import tinycolor from 'tinycolor2';
import tokens from 'bpk-tokens/tokens/base.raw.json';

import svg2react from './tasks/svg2react';
import svg2datauri, { sassMap, svg2sassvar } from './tasks/svg2datauri';

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
    .pipe(svgmin({
      plugins: [
        ...svgoCommonPlugins,
        { removeAttrs: { attrs: ['id', 'class', 'width', 'height', 'data-name'] } },
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
    .pipe(svgmin({
      plugins: [
        ...svgoCommonPlugins,
        { removeAttrs: { attrs: ['id', 'class', 'data-name', 'fill', 'fill-rule'] } },
      ],
    }))
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
gulp.task('icons-sm', () => {
  const optimised = gulp
    .src('src/icons/sm/**/*.svg')
    .pipe(svgmin({
      plugins: [
        ...svgoCommonPlugins,
        { removeAttrs: { attrs: ['id', 'class', 'data-name', 'fill', 'fill-rule'] } },
      ],
    }))
    .pipe(gulp.dest('src/icons/sm'));

  const react = optimised
    .pipe(clone())
    .pipe(svgmin({
      plugins: [
        { addAttributesToSVGElement: {
          attribute: `style="width:${tokens.props.ICON_SIZE_SM.value};height:${tokens.props.ICON_SIZE_SM.value}"`,
        } },
        { sortAttrs: true },
      ],
    }))
    .pipe(svg2react())
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('dist/js/icons/sm'));

  const datauri = optimised
    .pipe(clone())
    .pipe(svg2datauri({ colors }))
    .pipe(concat('_icons-sm.scss'))
    .pipe(sassMap('bpk-icons-sm'))
    .pipe(gulp.dest('dist/scss'));

  const rawDatauri = optimised
    .pipe(clone())
    .pipe(svg2sassvar())
    .pipe(concat('_icons-no-color-sm.scss'))
    .pipe(sassMap('bpk-icons-no-color-sm'))
    .pipe(gulp.dest('dist/scss'));

  return merge(react, datauri, rawDatauri);
});

gulp.task('icons-lg', () => {
  const optimised = gulp
    .src('src/icons/lg/**/*.svg')
    .pipe(svgmin({
      plugins: [
        ...svgoCommonPlugins,
        { removeAttrs: { attrs: ['id', 'class', 'data-name', 'fill', 'fill-rule'] } },
      ],
    }))
    .pipe(gulp.dest('src/icons/lg'));

  const react = optimised
    .pipe(clone())
    .pipe(svgmin({
      plugins: [
        { addAttributesToSVGElement: {
          attribute: `style="width:${tokens.props.ICON_SIZE_LG.value};height:${tokens.props.ICON_SIZE_LG.value}"`,
        } },
        { sortAttrs: true },
      ],
    }))
    .pipe(svg2react())
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('dist/js/icons/lg'));

  const datauri = optimised
    .pipe(clone())
    .pipe(svg2datauri({ colors }))
    .pipe(concat('_icons-lg.scss'))
    .pipe(sassMap('bpk-icons-lg'))
    .pipe(gulp.dest('dist/scss'));

  const rawDatauri = optimised
    .pipe(clone())
    .pipe(svg2sassvar())
    .pipe(concat('_icons-no-color-lg.scss'))
    .pipe(sassMap('bpk-icons-no-color-lg'))
    .pipe(gulp.dest('dist/scss'));

  return merge(react, datauri, rawDatauri);
});

gulp.task('default', ['elements', 'spinners', 'icons-sm', 'icons-lg']);

// TODO: include width/height in same line in react components
