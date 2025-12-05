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

import { processBpkProps } from './tokenUtils';
import {
  BpkSpacing,
  BpkColor,
  BpkBorderWidth,
  BpkShadow,
  BpkBorderRadius,
} from './tokens';

// Import foundations tokens to assert concrete values
 
const bpkTokens = require('@skyscanner/bpk-foundations-web/tokens/base.es6');

describe('processBpkProps', () => {
  it('converts spacing tokens to rem values', () => {
    const result = processBpkProps({ padding: BpkSpacing.MD });

    // bpk-spacing-md is mapped to .5rem in theme.ts
    expect(result.padding).toBe('.5rem');
  });

  it('passes through percentage spacing values unchanged', () => {
    const result = processBpkProps({ margin: '50%' });

    expect(result.margin).toBe('50%');
  });

  it('converts RTL and inline spacing props', () => {
    const result = processBpkProps({
      marginInline: BpkSpacing.Base,
      paddingStart: BpkSpacing.SM,
      paddingEnd: BpkSpacing.LG,
    });

    expect(result.marginInline).toBe('1rem');
    expect(result.paddingStart).toBe('.25rem');
    expect(result.paddingEnd).toBe('1.5rem');
  });

  it('validates and passes through size props (rem and percentages)', () => {
    const result = processBpkProps({
      width: '10rem',
      height: '50%',
      minWidth: '1.5rem',
      maxHeight: '100%',
    });

    expect(result.width).toBe('10rem');
    expect(result.height).toBe('50%');
    expect(result.minWidth).toBe('1.5rem');
    expect(result.maxHeight).toBe('100%');
  });

  it('removes invalid size values', () => {
    const result = processBpkProps({
      width: 'not-a-valid-size',
    });

    expect(result.width).toBeUndefined();
  });

  it('converts Backpack color tokens to concrete color values', () => {
    const result = processBpkProps({
      backgroundColor: BpkColor.Canvas,
      color: BpkColor.TextPrimary,
    });

    expect(result.backgroundColor).toBe(bpkTokens.canvasDay);
    expect(result.color).toBe(bpkTokens.textPrimaryDay);
  });

  it('converts border width tokens to concrete border width values', () => {
    const result = processBpkProps({
      borderWidth: BpkBorderWidth.SM,
      borderTopWidth: BpkBorderWidth.LG,
    });

    expect(result.borderWidth).toBe(bpkTokens.borderSizeSm);
    expect(result.borderTopWidth).toBe(bpkTokens.borderSizeLg);
  });

  it('converts border radius tokens to concrete border radius values', () => {
    const result = processBpkProps({
      borderRadius: BpkBorderRadius.MD,
      borderTopLeftRadius: BpkBorderRadius.SM,
    });

    expect(result.borderRadius).toBe(bpkTokens.borderRadiusMd);
    expect(result.borderTopLeftRadius).toBe(bpkTokens.borderRadiusSm);
  });

  it('converts shadow tokens to concrete box-shadow values', () => {
    const result = processBpkProps({
      boxShadow: BpkShadow.SM,
    });

    expect(result.boxShadow).toBe(bpkTokens.boxShadowSm);
  });

  it('removes className and logs a warning in non-production', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const result = processBpkProps({
      className: 'custom-class',
      padding: BpkSpacing.Base,
    });

    expect('className' in result).toBe(false);
    expect(result.padding).toBe('1rem');

    // In Jest, NODE_ENV is "test" so the warning should be emitted.
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
