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

import applyRTLTransforms from './applyRTLTransforms';

jest.mock('./getScriptDirection', () => jest.fn());

describe('applyRTLTransforms', () => {
  it('should clone given object', () => {
    const original = { foo: 'bar' };
    const result = applyRTLTransforms(original);

    expect(result).toEqual(original);
    expect(result).not.toBe(original);
  });

  it('should transform "left" to "right" on "attachment" property when script direction is "rtl"', () => {
    require('./getScriptDirection').mockReturnValueOnce('rtl'); // eslint-disable-line global-require
    const original = { attachment: 'middle left' };
    const result = applyRTLTransforms(original);

    expect(result.attachment).toEqual('middle right');
  });

  it('should transform "right" to "left" on "attachment" property when script direction is "rtl"', () => {
    require('./getScriptDirection').mockReturnValueOnce('rtl'); // eslint-disable-line global-require
    const original = { attachment: 'middle right' };
    const result = applyRTLTransforms(original);

    expect(result.attachment).toEqual('middle left');
  });

  it('should not transform "left" to "right" on "attachment" property when script direction isnt "rtl"', () => {
    require('./getScriptDirection').mockReturnValueOnce('ltr'); // eslint-disable-line global-require
    const original = { attachment: 'middle left' };
    const result = applyRTLTransforms(original);

    expect(result.attachment).toEqual('middle left');
  });

  it('should not transform "right" to "left" on "attachment" property when script direction isnt "rtl"', () => {
    require('./getScriptDirection').mockReturnValueOnce('ltr'); // eslint-disable-line global-require
    const original = { attachment: 'middle right' };
    const result = applyRTLTransforms(original);

    expect(result.attachment).toEqual('middle right');
  });

  it('should transform "left" to "right" on "targetAttachment" property when script direction is "rtl"', () => {
    require('./getScriptDirection').mockReturnValueOnce('rtl'); // eslint-disable-line global-require
    const original = { targetAttachment: 'middle left' };
    const result = applyRTLTransforms(original);

    expect(result.targetAttachment).toEqual('middle right');
  });

  it('should transform "right" to "left" on "targetAttachment" property when script direction is "rtl"', () => {
    require('./getScriptDirection').mockReturnValueOnce('rtl'); // eslint-disable-line global-require
    const original = { targetAttachment: 'middle right' };
    const result = applyRTLTransforms(original);

    expect(result.targetAttachment).toEqual('middle left');
  });

  it('should not transform "left" to "right" on "targetAttachment" property when script direction isnt "rtl"', () => {
    require('./getScriptDirection').mockReturnValueOnce('ltr'); // eslint-disable-line global-require
    const original = { targetAttachment: 'middle left' };
    const result = applyRTLTransforms(original);

    expect(result.targetAttachment).toEqual('middle left');
  });

  it('should not transform "right" to "left" on "targetAttachment" property when script direction isnt "rtl"', () => {
    require('./getScriptDirection').mockReturnValueOnce('ltr'); // eslint-disable-line global-require
    const original = { targetAttachment: 'middle right' };
    const result = applyRTLTransforms(original);

    expect(result.targetAttachment).toEqual('middle right');
  });
});
