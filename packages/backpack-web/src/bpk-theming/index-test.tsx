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

import BpkThemeProvider, {
  BpkThemeProvider as NamedBpkThemeProvider,
  BpkThemeProviderV2,
} from './index';

describe('bpk-theming exports', () => {
  it('keeps the legacy provider as the default export', () => {
    expect(BpkThemeProvider).toBe(NamedBpkThemeProvider);

    const { container } = render(
      <BpkThemeProvider
        theme={{ buttonColor: '#e00045' }}
        themeAttributes={['buttonColor']}
      >
        <p>Themed</p>
      </BpkThemeProvider>,
    );

    expect(
      (container.firstChild as HTMLElement).style.getPropertyValue(
        '--bpk-button-color',
      ),
    ).toBe('#e00045');
  });

  it('exposes the typed provider as an opt-in named export', () => {
    const { container } = render(
      <BpkThemeProviderV2 theme={{ corePrimary: '#e00045' }}>
        <p>Themed</p>
      </BpkThemeProviderV2>,
    );

    expect(
      (container.firstChild as HTMLElement).style.getPropertyValue(
        '--bpk-core-primary',
      ),
    ).toBe('#e00045');
  });
});
