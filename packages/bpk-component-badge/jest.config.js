const baseConfig = require('../../jest.preset.js');

const { testRegex, ...configWithoutTestRegex } = baseConfig;

module.exports = {
  ...configWithoutTestRegex,
  displayName: 'bpk-component-badge',
  testMatch: ['<rootDir>/src/**/*-test.tsx'],
  coverageDirectory: '../../coverage/packages/bpk-component-badge',

  // Use root babel config
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { rootMode: 'upward' }],
  },

  // Override paths from preset to be relative to component root
  moduleNameMapper: {
    '^.+\\.scss$': '<rootDir>/../../scripts/stubs/styleStub.js',
    '^.+\\.(svg|png)$': '<rootDir>/../../scripts/stubs/fileStub.js',
    'react-transition-group/CSSTransition': '<rootDir>/../../scripts/stubs/cssTransitionStub.js',
    '@skyscanner/bpk-svgs/dist/svgs/^.+\\.svg$': '<rootDir>/../../scripts/stubs/fileStub.js',
    '^react($|/.+)': '<rootDir>/../../node_modules/react$1',
  },

  setupFilesAfterEnv: ['<rootDir>/../../scripts/jest/setup.js'],
};
