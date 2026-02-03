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
// @ts-nocheck

import { render } from '@testing-library/react';

import { setNativeValue } from './nativeEventHandler';

const TestComponent = () => (
  <input id="input_element" name="test" type="text" defaultValue="0" />
);

describe('nativeEventHandler', () => {
  it('should capture "change" event and value from setNativeValue', () => {
    let callbackValue = null;
    const { container } = render(<TestComponent />);

    container.addEventListener('change', (event) => {
      callbackValue = (event.target as HTMLInputElement).value;
    });

    const input = container.querySelector(
      '[id="input_element"]',
    ) as HTMLInputElement;
    setNativeValue(input, 'new_value');

    expect(callbackValue).toBe('new_value');
  });
});
