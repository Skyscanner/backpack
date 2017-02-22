import _ from 'lodash';
import rename from 'gulp-rename';
import gulp from 'gulp';
import tinycolor from 'tinycolor2';
import svgmin from 'gulp-svgmin';
import concat from 'gulp-concat';
import merge from 'merge-stream';
import tokens from 'bpk-tokens/tokens/base.raw.json';
import svg2react from './tasks/svg2react';
import svg2datauri, { sassMap } from './tasks/svg2datauri';

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
  LOGOS
*/
gulp.task('logos-base', () => {
  const optimised = gulp
    .src('src/logos/**/*.svg')
    .pipe(svgmin({
      plugins: [
        ...svgoCommonPlugins,
        { removeAttrs: { attrs: ['id', 'class', 'width', 'height', 'data-name', 'fill', 'fill-rule'] } },
      ],
    }))
    .pipe(gulp.dest('src/logos'));

  return optimised
    .pipe(svg2react())
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('dist/js/logos'));
});

gulp.task('logos-cloud', ['logos-base'], () => (
  gulp
    .src('src/logos/cloud.svg')
    .pipe(svg2datauri({ colors }))
    .pipe(sassMap('bpk-logos-cloud'))
    .pipe(rename('_logos-cloud.scss'))
    .pipe(gulp.dest('dist/scss'))
));
gulp.task('logos-inline', ['logos-base'], () => (
  gulp
    .src('src/logos/inline.svg')
    .pipe(svg2datauri({ colors }))
    .pipe(sassMap('bpk-logos-inline'))
    .pipe(rename('_logos-inline.scss'))
    .pipe(gulp.dest('dist/scss'))
));
gulp.task('logos-stacked', ['logos-base'], () => (
  gulp
    .src('src/logos/stacked.svg')
    .pipe(svg2datauri({ colors }))
    .pipe(sassMap('bpk-logos-stacked'))
    .pipe(rename('_logos-stacked.scss'))
    .pipe(gulp.dest('dist/scss'))
));
gulp.task('logos-tianxun-stacked', ['logos-base'], () => (
  gulp
    .src('src/logos/tianxun-stacked.svg')
    .pipe(svg2datauri({ colors }))
    .pipe(sassMap('bpk-logos-tianxun-stacked'))
    .pipe(rename('_logos-tianxun-stacked.scss'))
    .pipe(gulp.dest('dist/scss'))
));
gulp.task('logos-tianxun', ['logos-base'], () => (
  gulp
    .src('src/logos/tianxun.svg')
    .pipe(svg2datauri({ colors }))
    .pipe(sassMap('bpk-logos-tianxun'))
    .pipe(rename('_logos-tianxun.scss'))
    .pipe(gulp.dest('dist/scss'))
));
gulp.task('logos', ['logos-cloud', 'logos-inline', 'logos-stacked', 'logos-tianxun-stacked', 'logos-tianxun']);

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
    .pipe(svg2react())
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('dist/js/spinners'));

  const datauri = optimised
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
    .pipe(svgmin({
      plugins: [
        { addAttributesToSVGElement: {
          attribute: `style="width:${tokens.props.SPACING_MD.value};height:${tokens.props.SPACING_MD.value}"`,
        } },
        { sortAttrs: true },
      ],
    }))
    .pipe(svg2react())
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('dist/js/icons/sm'));

  const datauri = optimised
    .pipe(svg2datauri({ colors }))
    .pipe(concat('_icons-sm.scss'))
    .pipe(sassMap('bpk-icons-sm'))
    .pipe(gulp.dest('dist/scss'));

  return merge(react, datauri);
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
    .pipe(svgmin({
      plugins: [
        { addAttributesToSVGElement: {
          attribute: `style="width:${tokens.props.SPACING_BASE.value};height:${tokens.props.SPACING_BASE.value}"`,
        } },
        { sortAttrs: true },
      ],
    }))
    .pipe(svg2react())
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('dist/js/icons/lg'));

  const datauri = optimised
    .pipe(svg2datauri({ colors }))
    .pipe(concat('_icons-lg.scss'))
    .pipe(sassMap('bpk-icons-lg'))
    .pipe(gulp.dest('dist/scss'));

  return merge(react, datauri);
});

gulp.task('default', ['elements', 'logos', 'spinners', 'icons-sm', 'icons-lg']);

// TODO: include width/height in same line in react components
