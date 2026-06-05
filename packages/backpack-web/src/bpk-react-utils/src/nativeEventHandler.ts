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

// There are cases where input element's values are modifed indirectly.
// This causes the elements to not emit events that would have been if they had been modified by the user directly.
// In order to maintain the expected native behaviour of the input element, It's possible to call this function during an
// "onEvent" handler and update the element value, together with updating react it's own state which isn't mapped to the elements value prop.
function setNativeValue(element: HTMLInputElement, value: string | number, shouldDispatchChange = true) {
  const inputProto = window.HTMLInputElement.prototype;
  const descriptor = Object.getOwnPropertyDescriptor(
    inputProto,
    'value',
  ) as PropertyDescriptor;
  const setValue = descriptor.set;
  
  if (setValue) {
    setValue.call(element, value);
    if (shouldDispatchChange) {
      const event = new Event('change', { bubbles: true });
      element.dispatchEvent(event);
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export { setNativeValue };
