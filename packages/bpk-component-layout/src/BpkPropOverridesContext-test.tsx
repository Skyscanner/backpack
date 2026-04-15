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

import { render } from '@testing-library/react';

import { getValidatedPropOverride, usePropOverrides } from './BpkPropOverridesContext';
import { BpkProvider } from './BpkProvider';

const OverrideReader = ({ componentName }: { componentName: string }) => {
  const overrides = usePropOverrides(componentName);
  return <span data-testid="overrides">{JSON.stringify(overrides)}</span>;
};

describe('usePropOverrides', () => {
  it('returns null when no provider is present', () => {
    const { getByTestId } = render(<OverrideReader componentName="BpkButton" />);
    expect(getByTestId('overrides').textContent).toBe('null');
  });

  it('returns null when provider has no entry for the component', () => {
    const { getByTestId } = render(
      <BpkProvider propOverrides={{ BpkChip: { type: { default: 'on-dark' } } }}>
        <OverrideReader componentName="BpkButton" />
      </BpkProvider>,
    );
    expect(getByTestId('overrides').textContent).toBe('null');
  });

  it('returns overrides for the requested component', () => {
    const overrides = { type: { primary: 'secondary' } };
    const { getByTestId } = render(
      <BpkProvider propOverrides={{ BpkButton: overrides }}>
        <OverrideReader componentName="BpkButton" />
      </BpkProvider>,
    );
    expect(JSON.parse(getByTestId('overrides').textContent!)).toEqual(overrides);
  });

  it('returns null when propOverrides is not provided', () => {
    const { getByTestId } = render(
      <BpkProvider>
        <OverrideReader componentName="BpkButton" />
      </BpkProvider>,
    );
    expect(getByTestId('overrides').textContent).toBe('null');
  });
});

describe('getValidatedPropOverride', () => {
  const allowedTypes = ['primary', 'secondary', 'destructive'] as const;

  it('returns the override value when both source and target are valid', () => {
    const result = getValidatedPropOverride(
      { primary: 'secondary' },
      'primary',
      allowedTypes,
    );
    expect(result).toBe('secondary');
  });

  it('returns null when the override map is null', () => {
    expect(getValidatedPropOverride(null, 'primary', allowedTypes)).toBeNull();
  });

  it('returns null when the override map is undefined', () => {
    expect(getValidatedPropOverride(undefined, 'primary', allowedTypes)).toBeNull();
  });

  it('returns null when the source value is not in the allowed set', () => {
    const result = getValidatedPropOverride(
      { bogus: 'secondary' } as Record<string, string>,
      'bogus',
      allowedTypes,
    );
    expect(result).toBeNull();
  });

  it('returns null when the target value is not in the allowed set', () => {
    const result = getValidatedPropOverride(
      { primary: 'invalid' as any },
      'primary',
      allowedTypes,
    );
    expect(result).toBeNull();
  });

  it('returns null when no mapping exists for the source value', () => {
    const result = getValidatedPropOverride(
      { secondary: 'destructive' },
      'primary',
      allowedTypes,
    );
    expect(result).toBeNull();
  });
});
