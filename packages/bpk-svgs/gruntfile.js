const _ = require('lodash');
const tinycolor = require('tinycolor2');
const tokens = require('bpk-tokens/tokens/base.raw.json');

const colors = _(tokens.props)
  .filter({ category: 'colors', type: 'color' })
  .keyBy('name')
  .mapValues('value')
  .mapKeys((value, key) => _.kebabCase(key).replace('color-', ''))
  .mapValues(value => tinycolor(value).toHexString())
  .value();

module.exports = function gruntConfig(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadTasks('tasks');

  grunt.initConfig({

    clean: {
      dist: ['dist'],
      src: ['**/*.svg.react.js'],
    },

    svgmin: {
      elements: {
        options: {
          plugins: [
            { removeTitle: true },
            { removeStyleElement: true },
            { removeAttrs: { attrs: ['id', 'class', 'width', 'height', 'data-name'] } },
            { removeEmptyContainers: true },
            { sortAttrs: true },
            { removeUselessDefs: true },
            { removeEmptyText: true },
            { removeEditorsNSData: true },
            { removeEmptyAttrs: true },
            { removeHiddenElems: true },
          ],
        },
        files: [
          {
            expand: true,
            cwd: 'src/elements',
            src: '*.svg',
            dest: 'src/elements',
          },
        ],
      },
      logos: {
        options: {
          plugins: [
            { removeTitle: true },
            { removeStyleElement: true },
            { removeAttrs: { attrs: ['id', 'class', 'width', 'height', 'data-name', 'fill', 'fill-rule'] } },
            { removeEmptyContainers: true },
            { sortAttrs: true },
            { removeUselessDefs: true },
            { removeEmptyText: true },
            { removeEditorsNSData: true },
            { removeEmptyAttrs: true },
            { removeHiddenElems: true },
          ],
        },
        files: [
          {
            expand: true,
            cwd: 'src/logos',
            src: '*.svg',
            dest: 'src/logos',
          },
        ],
      },
      everythingElse: {
        options: {
          plugins: [
            { removeTitle: true },
            { removeStyleElement: true },
            { removeAttrs: { attrs: ['id', 'class', 'data-name', 'fill', 'fill-rule'] } },
            { removeEmptyContainers: true },
            { sortAttrs: true },
            { removeUselessDefs: true },
            { removeEmptyText: true },
            { removeEditorsNSData: true },
            { removeEmptyAttrs: true },
            { removeHiddenElems: true },
          ],
        },
        files: [
          {
            expand: true,
            cwd: 'src/icons',
            src: '**/*.svg',
            dest: 'src/icons',
          },
          {
            expand: true,
            cwd: 'src/spinners',
            src: '*.svg',
            dest: 'src/spinners',
          },
        ],
      },
    },

    datauri: {
      elements: {
        options: {
          mapName: 'bpk-elements',
        },
        files: {
          'dist/scss/_elements.scss': 'src/elements/*.svg',
        },
      },
      smIcons: {
        options: {
          mapName: 'bpk-icons-sm',
          colors,
        },
        files: {
          'dist/scss/_icons-sm.scss': 'src/icons/sm/*.svg',
        },
      },
      lgIcons: {
        options: {
          mapName: 'bpk-icons-lg',
          colors,
        },
        files: {
          'dist/scss/_icons-lg.scss': 'src/icons/lg/*.svg',
        },
      },
      cloudLogo: {
        options: {
          mapName: 'bpk-logos-cloud',
          colors,
        },
        files: {
          'dist/scss/_logos-cloud.scss': 'src/logos/cloud.svg',
        },
      },
      inlineLogo: {
        options: {
          mapName: 'bpk-logos-inline',
          colors,
        },
        files: {
          'dist/scss/_logos-inline.scss': 'src/logos/inline.svg',
        },
      },
      stackedLogo: {
        options: {
          mapName: 'bpk-logos-stacked',
          colors,
        },
        files: {
          'dist/scss/_logos-stacked.scss': 'src/logos/stacked.svg',
        },
      },
      tianxunLogo: {
        options: {
          mapName: 'bpk-logos-tianxun',
          colors,
        },
        files: {
          'dist/scss/_logos-tianxun.scss': 'src/logos/tianxun.svg',
        },
      },
      tianxunStackedLogo: {
        options: {
          mapName: 'bpk-logos-tianxun-stacked',
          colors,
        },
        files: {
          'dist/scss/_logos-tianxun-stacked.scss': 'src/logos/tianxun-stacked.svg',
        },
      },
      spinners: {
        options: {
          mapName: 'bpk-spinners',
          colors,
        },
        files: {
          'dist/scss/_spinners.scss': 'src/spinners/*.svg',
        },
      },
    },

    exec: {
      svg2react: 'svg2react src/icons/sm/*.svg src/icons/lg/*.svg src/logos/*.svg src/spinners/*.svg',
    },

    copy: {
      reactSvgs: {
        files: [
          {
            expand: true,
            cwd: 'src',
            dest: 'dist/js/',
            src: '**/*.svg.react.js',
            rename(dest, src) {
              return dest + src.replace('.svg.react.js', '.js');
            },
          },
        ],
      },
    },
  });

  grunt.registerTask('default', ['clean:dist', 'svgmin', 'datauri', 'exec', 'copy', 'clean:src']);
};
