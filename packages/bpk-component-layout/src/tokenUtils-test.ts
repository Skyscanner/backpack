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

import {
  convertBpkSpacingToChakra,
  processBpkComponentProps,
  processBpkProps,
  processResponsiveProps,
  processTextStyleProp,
} from './tokenUtils';
import { BpkSpacing, BpkTextStyle } from './tokens';

describe('processBpkProps', () => {
  it('converts spacing tokens to rem values', () => {
    const result = processBpkProps({ padding: BpkSpacing.MD });

    // bpk-spacing-md is mapped to .5rem in theme.ts
    expect(result.padding).toBe('.5rem');
  });

  it('supports the temporary 2px spacing token (bpk-spacing-xs)', () => {
    const result = processBpkProps({ padding: BpkSpacing.XS });

    // bpk-spacing-xs is mapped to .125rem (2px) in theme.ts
    expect(result.padding).toBe('.125rem');
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

  it('removes style and logs a warning in non-production', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const result = processBpkProps({
      // style is not part of the public API but should still be stripped
      // and warned about at runtime if passed through accidentally.
      style: { dummy: 'value' },
      padding: BpkSpacing.Base,
    });

    expect('style' in result).toBe(false);
    expect(result.padding).toBe('1rem');

    // In Jest, NODE_ENV is "test" so the warning should be emitted.
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('converts Backpack breakpoint keys to Chakra keys for responsive objects', () => {
    const result = processBpkProps({
      padding: {
        mobile: BpkSpacing.SM,
        tablet: BpkSpacing.MD,
      },
    });

    expect(result.padding).toEqual({
      md: '.25rem',
      xl: '.5rem',
    });
  });

  it('maps Backpack breakpoint keys for non-spacing layout props via processResponsiveProps', () => {
    const result = processResponsiveProps({
      display: { mobile: 'flex', desktop: 'grid' },
      flexDirection: { mobile: 'column', tablet: 'row' },
      gridTemplateColumns: { tablet: 'repeat(2, 1fr)', desktop: 'repeat(4, 1fr)' },
    });

    expect(result).toEqual({
      display: { md: 'flex', '2xl': 'grid' },
      flexDirection: { md: 'column', xl: 'row' },
      gridTemplateColumns: { xl: 'repeat(2, 1fr)', '2xl': 'repeat(4, 1fr)' },
    });
  });

  it('does not let allowlisted Box layout props fall through unprocessed (e.g. array responsive values)', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const result = processBpkComponentProps(
      {
        // Chakra array syntax is intentionally not supported in the public API.
        display: ['flex', 'grid'],
      } as any,
      { component: 'BpkBox' },
    );

    expect(result.display).toBeUndefined();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('removes array-based responsive values and warns in non-production', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const result = processBpkProps({
      // array-based responsive values are intentionally not supported
      padding: [BpkSpacing.SM, BpkSpacing.MD] as any,
    });

    expect(result.padding).toBeUndefined();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('warns and drops unknown breakpoint keys from responsive objects', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const result = processBpkProps({
      padding: {
        // unknown key should be ignored
        phablet: BpkSpacing.SM,
        mobile: BpkSpacing.MD,
      } as any,
    });

    expect(result.padding).toEqual({
      md: '.5rem',
    });
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('warns and returns unknown spacing tokens as-is (dev fallback)', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const result = convertBpkSpacingToChakra('bpk-spacing-unknown');

    expect(result).toBe('bpk-spacing-unknown');
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe('processTextStyleProp', () => {
  it('passes a valid text style token through unchanged', () => {
    const result = processTextStyleProp(BpkTextStyle.BodyDefault);

    expect(result).toBe('bpk-text-body-default');
  });

  it('passes all text style tokens through unchanged', () => {
    expect(processTextStyleProp(BpkTextStyle.Xs)).toBe('bpk-text-xs');
    expect(processTextStyleProp(BpkTextStyle.Heading3)).toBe('bpk-text-heading-3');
    expect(processTextStyleProp(BpkTextStyle.Hero1)).toBe('bpk-text-hero-1');
    expect(processTextStyleProp(BpkTextStyle.Editorial2)).toBe('bpk-text-editorial-2');
  });

  it('removes and warns on array-based responsive values', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const result = processTextStyleProp([BpkTextStyle.Sm, BpkTextStyle.Lg] as any);

    expect(result).toBeUndefined();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('maps Backpack breakpoint keys to Chakra keys for responsive textStyle objects', () => {
    const result = processTextStyleProp({
      base: BpkTextStyle.Sm,
      mobile: BpkTextStyle.Base,
      tablet: BpkTextStyle.Lg,
    });

    expect(result).toEqual({
      base: 'bpk-text-sm',
      md: 'bpk-text-base',
      xl: 'bpk-text-lg',
    });
  });

  it('warns and drops unknown breakpoint keys from responsive textStyle objects', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const result = processTextStyleProp({
      phablet: BpkTextStyle.Sm,
      mobile: BpkTextStyle.Base,
    } as any);

    expect(result).toEqual({ md: 'bpk-text-base' });
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe('processBpkProps (textStyle)', () => {
  it('processes textStyle prop and passes it through', () => {
    const result = processBpkProps({ textStyle: BpkTextStyle.Heading1 });

    expect(result.textStyle).toBe('bpk-text-heading-1');
  });

  it('processes responsive textStyle with Backpack breakpoint keys', () => {
    const result = processBpkProps({
      textStyle: {
        base: BpkTextStyle.Sm,
        desktop: BpkTextStyle.Xl,
      },
    });

    expect(result.textStyle).toEqual({
      base: 'bpk-text-sm',
      '2xl': 'bpk-text-xl',
    });
  });

  it('does not interfere with spacing props when textStyle is provided', () => {
    const result = processBpkProps({
      padding: BpkSpacing.MD,
      textStyle: BpkTextStyle.Label1,
    });

    expect(result.padding).toBe('.5rem');
    expect(result.textStyle).toBe('bpk-text-label-1');
  });
});
