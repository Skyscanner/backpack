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

import getGlobal from './globals-helper';

const origWindow = global;

describe('globals-helper', () => {
  describe('getGlobal', () => {
    afterEach(() => {
      global = origWindow; // eslint-disable-line
      global.BPK_DOC_GLOBALS = undefined;
    });

    it('should get a value', () => {
      global.BPK_DOC_GLOBALS = {};
      global.BPK_DOC_GLOBALS.foo = 'foo';
      global.BPK_DOC_GLOBALS.bar = { baz: 'baz' };
      expect(getGlobal('foo', 'bar')).toEqual('foo');
      expect(getGlobal('bar.baz', 'bar')).toEqual('baz');
    });

    it('should return the default when window is not present', () => {
      global = undefined; // eslint-disable-line
      expect(getGlobal('foo', 'bar')).toEqual('bar');
    });

    it('should return the default when BPK_DOC_GLOBALS is not present', () => {
      expect(getGlobal('foo', 'bar')).toEqual('bar');
    });

    it('should return the default when value not present', () => {
      global.BPK_DOC_GLOBALS = {};
      global.BPK_DOC_GLOBALS.foo = 'foo';
      expect(getGlobal('bar', 'foo')).toEqual('foo');
    });
  });
});
