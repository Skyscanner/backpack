// Project-local Jest config for backpack-web. Discovered automatically by
// @nx/jest/plugin so that `nx run backpack-web:test` picks it up without a
// duplicate target on the workspace root.
module.exports = {
  rootDir: __dirname,
  // The workspace's babel.config.js lives at the repo root (../..). With jest's
  // rootDir scoped to this project, Babel would look for config from here and
  // miss it, so tell babel-jest to resolve the config by walking up.
  transform: {
    '^.+\\.[jt]sx?$': ['babel-jest', { rootMode: 'upward' }],
  },
  coverageReporters: ['text'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  moduleNameMapper: {
    '^.+\\.scss$': '<rootDir>/../../scripts/stubs/styleStub.js',
    '^.+\\.(svg|png)$': '<rootDir>/../../scripts/stubs/fileStub.js',
    'react-transition-group/CSSTransition':
      '<rootDir>/../../scripts/stubs/cssTransitionStub.js',
    '@skyscanner/bpk-svgs/dist/svgs/^.+\\.svg$':
      '<rootDir>/../../scripts/stubs/fileStub.js',
    '^react($|/.+)': '<rootDir>/../../node_modules/react$1',
  },
  setupFilesAfterEnv: ['<rootDir>/../../scripts/jest/setup.js'],
  testEnvironment: 'jsdom',
  testRegex: 'src/.*-test\\.[jt]sx?$',
  transformIgnorePatterns: [
    'node_modules/(?!bpk|@skyscanner|d3-.*|internmap)',
  ],
  verbose: true,
};
