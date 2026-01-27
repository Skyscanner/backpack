/**
 * Shared Jest config for NX libs - not used by packages/ yet
 *
 * This preset contains the standard Jest configuration extracted from the root
 * package.json. Future NX libraries can import and extend this configuration.
 *
 * Existing packages/ still use the configuration in package.json directly.
 */

module.exports = {
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
    '^.+\\.scss$': '<rootDir>/scripts/stubs/styleStub.js',
    '^.+\\.(svg|png)$': '<rootDir>/scripts/stubs/fileStub.js',
    'react-transition-group/CSSTransition': '<rootDir>/scripts/stubs/cssTransitionStub.js',
    '@skyscanner/bpk-svgs/dist/svgs/^.+\\.svg$': '<rootDir>/scripts/stubs/fileStub.js',
    '^react($|/.+)': '<rootDir>/node_modules/react$1',
  },

  setupFilesAfterEnv: ['<rootDir>/scripts/jest/setup.js'],

  testEnvironment: 'jsdom',

  testRegex: 'packages/.*-test\\.[jt]sx?$',

  transformIgnorePatterns: [
    'node_modules/(?!bpk|@skyscanner|d3-.*|internmap)',
  ],

  verbose: true,
};
