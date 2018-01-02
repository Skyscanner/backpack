/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

import sortLinks from './links-sorter';

describe('links-sorter', () => {
  it('should sort alphabetically', () => {
    const links = [{ id: 'c' }, { id: 'a' }, { id: 'b' }];

    expect(sortLinks(links)).toEqual([{ id: 'a' }, { id: 'b' }, { id: 'c' }]);
  });

  it('should secondary sort by route existence', () => {
    const links = [
      { id: 'c' },
      { id: 'a' },
      { id: 'b' },
      { id: 'd', route: '/path/to/d' },
      { id: 'f', route: '/path/to/f' },
      { id: 'e', route: '/path/to/e' },
    ];

    expect(sortLinks(links)).toEqual([
      { id: 'd', route: '/path/to/d' },
      { id: 'e', route: '/path/to/e' },
      { id: 'f', route: '/path/to/f' },
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
    ]);
  });
});
