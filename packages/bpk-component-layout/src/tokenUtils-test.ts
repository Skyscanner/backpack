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
  convertBpkSpacingToValue,
  processBpkComponentProps,
  processBpkProps,
  processResponsiveProps,
} from './tokenUtils';
import { BpkSpacing } from './tokens';

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

    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('removes style and logs a warning in non-production', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const result = processBpkProps({
      style: { dummy: 'value' },
      padding: BpkSpacing.Base,
    });

    expect('style' in result).toBe(false);
    expect(result.padding).toBe('1rem');

    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('extracts first breakpoint value from responsive objects for inline styles', () => {
    const result = processBpkProps({
      padding: {
        mobile: BpkSpacing.SM,
        tablet: BpkSpacing.MD,
      },
    });

    // With inline styles, responsive objects are flattened to the first value
    expect(result.padding).toBe('.25rem');
  });

  it('extracts first value from responsive layout props via processResponsiveProps', () => {
    const result = processResponsiveProps({
      display: { mobile: 'flex', desktop: 'grid' },
      flexDirection: { mobile: 'column', tablet: 'row' },
      gridTemplateColumns: { tablet: 'repeat(2, 1fr)', desktop: 'repeat(4, 1fr)' },
    });

    expect(result).toEqual({
      display: 'flex',
      flexDirection: 'column',
      gridTemplateColumns: 'repeat(2, 1fr)',
    });
  });

  it('does not let allowlisted Box layout props fall through unprocessed (e.g. array responsive values)', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const result = processBpkComponentProps(
      {
        display: ['flex', 'grid'],
      } as any,
      { component: 'BpkBox' },
    );

    expect(result.styles.display).toBeUndefined();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('removes array-based responsive values and warns in non-production', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const result = processBpkProps({
      padding: [BpkSpacing.SM, BpkSpacing.MD] as any,
    });

    expect(result.padding).toBeUndefined();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('uses first value from responsive objects regardless of breakpoint key validity', () => {
    const result = processBpkProps({
      padding: {
        phablet: BpkSpacing.SM,
        mobile: BpkSpacing.MD,
      } as any,
    });

    // With inline styles, responsive objects are flattened to the first value
    expect(result.padding).toBe('.25rem');
  });

  it('warns and returns unknown spacing tokens as-is (dev fallback)', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const result = convertBpkSpacingToValue('bpk-spacing-unknown');

    expect(result).toBe('bpk-spacing-unknown');
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
