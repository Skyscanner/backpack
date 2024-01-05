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

import 'jest-axe/extend-expect';
import 'raf/polyfill';
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';

// The below is a workaround to the problem were calling resetModules causes react to be required twice.
// further details can be found here: https://github.com/jestjs/jest/issues/8987#issuecomment-584898030
let mockActualReact;
jest.doMock('react', () => {
  if (!mockActualReact) {
    mockActualReact = jest.requireActual('react');
  }
  return mockActualReact;
});

registerRequireContextHook();
