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

/* @flow strict */

import cssModules from './cssModules';

describe('cssModules', () => {
  it('should return a function', () => {
    expect(cssModules()).toBeInstanceOf(Function);
  });

  describe('returned function', () => {
    it('should pass through key as className if not found', () => {
      const getClassName = cssModules();

      expect(getClassName('foo')).toEqual('foo');
      expect(getClassName('bar')).toEqual('bar');
      expect(getClassName('baz')).toEqual('baz');
    });

    it('should resolve classNames for known keys', () => {
      const getClassName = cssModules({
        foo: 'a',
        bar: 'b',
        baz: 'c',
      });

      expect(getClassName('foo')).toEqual('a');
      expect(getClassName('bar')).toEqual('b');
      expect(getClassName('baz')).toEqual('c');
    });

    it('should resolve multiple class names', () => {
      const getClassName = cssModules({
        foo: 'a',
      });

      expect(getClassName('foo', 'bar')).toEqual('a bar');
    });

    it('should ignore values other than strings', () => {
      const getClassName = cssModules({
        foo: 'a',
      });

      expect(getClassName('foo', false, 1, undefined, {}, true, 'bar')).toEqual(
        'a bar',
      );
    });
  });
});
