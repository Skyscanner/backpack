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

/*
  Checks if the current device is an iPhone as reported by the user agent.
*/
const isDeviceIphone = () =>
  /iPhone/i.test(
    typeof window !== 'undefined' ? window.navigator.userAgent : '',
  );

/*
  Checks if the current device is an iPad as reported by the user agent for older generation iPads
  or by checking the number of touch points for newer generation iPads as in newer devices the user agent
  reports as a Macintosh.
*/
const isDeviceIpad = () =>
  /iPad/i.test(typeof window !== 'undefined' ? window.navigator.userAgent : '') || /Macintosh/.test(typeof window !== 'undefined' ? window.navigator.userAgent : '') && (window.navigator.maxTouchPoints > 2);

/*
  Checks if the current device is an iOS device.  
*/
const isDeviceIos = () => isDeviceIphone() || isDeviceIpad();

export { isDeviceIphone, isDeviceIpad, isDeviceIos };
