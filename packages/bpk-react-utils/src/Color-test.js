/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import Color from 'color';
// import Color from './Color';

describe('Color', () => {
  // it('should return a function', () => {
  //   expect(Color()).toBeInstanceOf(Color());
  // });

  it('should work', () => {
    // const c = Color('#7743CE').alpha(0.5).lighten(0.5);
    // const s = (c.hsl().string());  // 'hsla(262, 59%, 81%, 0.5)'
    // expect(s).toEqual('hsla(262, 59%, 81%, 0.5)');
    expect(Color('rgb(10, 30, 25, 0.4)').rgb().string()).toEqual('rgba(10, 30, 25, 0.4)');
  });
});
