/*
 * Copyright 2010 Skyscanner Ltd
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

/** @type {import('jest').Config} */
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
    'react-transition-group/CSSTransition':
      '<rootDir>/scripts/stubs/cssTransitionStub.js',
    '@skyscanner/bpk-svgs/dist/svgs/^.+\\.svg$':
      '<rootDir>/scripts/stubs/fileStub.js',
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
