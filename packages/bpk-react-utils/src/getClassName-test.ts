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

import getClassName from './getClassName';

describe('getClassName', () => {

  describe('returned function', () => {
    it('should pass through key as className if not found', () => {
      expect(getClassName('foo')).toEqual('foo');
      expect(getClassName('bar')).toEqual('bar');
      expect(getClassName('baz')).toEqual('baz');
    });

    it('should resolve classNames for known keys', () => {
      expect(getClassName('foo')).toEqual('a');
      expect(getClassName('bar')).toEqual('b');
      expect(getClassName('baz')).toEqual('c');
    });

    it('should resolve multiple class names', () => {
      expect(getClassName('foo', 'bar')).toEqual('a bar');
    });

    it('should ignore values other than strings', () => {
      expect(getClassName('foo', false, 1, undefined, {}, true, 'bar')).toEqual(
        'a bar',
      );
    });
  });
});
