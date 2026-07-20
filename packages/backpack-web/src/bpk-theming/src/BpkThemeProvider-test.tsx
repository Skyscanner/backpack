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

import BpkThemeProvider, { useBpkTheme } from './BpkThemeProvider';

import type { BpkTheme } from './BpkThemeProvider';

const THEME: BpkTheme = {
  corePrimary: '#e00045',
  coreAccent: '#0770e3',
  button: { colourBgPrimary: '#e00045' },
};

describe('BpkThemeProvider', () => {
  it('renders children without a theme', () => {
    const { asFragment } = render(
      <BpkThemeProvider>
        <p>No theme</p>
      </BpkThemeProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders children with a partial theme and sets CSS vars', () => {
    const { asFragment } = render(
      <BpkThemeProvider theme={THEME}>
        <p>Themed</p>
      </BpkThemeProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('applies flat semantic string values as inline CSS vars', () => {
    const { container } = render(
      <BpkThemeProvider theme={{ corePrimary: '#e00045' }}>
        <p>check</p>
      </BpkThemeProvider>,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.getPropertyValue('--bpk-core-primary')).toBe(
      '#e00045',
    );
  });

  it('applies namespaced component string values as inline CSS vars', () => {
    const { container } = render(
      <BpkThemeProvider theme={{ button: { colourBgPrimary: '#e00045' } }}>
        <p>check</p>
      </BpkThemeProvider>,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(
      wrapper.style.getPropertyValue('--bpk-private-button-colour-bg-primary'),
    ).toBe('#e00045');
  });

  it('renders a <style> tag for flat semantic mode-specific values', () => {
    const { container } = render(
      <BpkThemeProvider
        theme={{ corePrimary: { light: '#e00045', dark: '#ff6b8a' } }}
      >
        <p>mode</p>
      </BpkThemeProvider>,
    );
    const styleTag = container.querySelector('style');
    expect(styleTag).not.toBeNull();
    expect(styleTag!.textContent).toContain('--bpk-core-primary');
    expect(styleTag!.textContent).toContain('#e00045');
    expect(styleTag!.textContent).toContain('#ff6b8a');
  });

  it('renders the correct <style> tag dark mode selector', () => {
    const { container } = render(
      <BpkThemeProvider
        theme={{ corePrimary: { light: '#e00045', dark: '#ff6b8a' } }}
      >
        <p>mode</p>
      </BpkThemeProvider>,
    );
    const styleTag = container.querySelector('style');
    expect(styleTag!.textContent).toContain(':root[data-theme="dark"]');
  });

  it('renders with as="section" wrapper element', () => {
    const { asFragment } = render(
      <BpkThemeProvider as="section" theme={THEME}>
        <p>Section</p>
      </BpkThemeProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(asFragment().querySelector('section')).not.toBeNull();
  });

  it('renders with legacy component prop', () => {
    const { asFragment } = render(
      <BpkThemeProvider component="header" theme={THEME}>
        <p>Header</p>
      </BpkThemeProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('ignores legacy themeAttributes prop without error', () => {
    const { asFragment } = render(
      <BpkThemeProvider
        theme={{ corePrimary: '#e00045' }}
        themeAttributes={['corePrimary']}
      >
        <p>Legacy</p>
      </BpkThemeProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders without theme when theme is undefined', () => {
    const { container } = render(
      <BpkThemeProvider>
        <p>No vars</p>
      </BpkThemeProvider>,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.cssText).toBe('');
  });

  it('applies user style alongside theme vars', () => {
    const { container } = render(
      <BpkThemeProvider
        theme={{ corePrimary: '#e00045' }}
        style={{ padding: '8px' }}
      >
        <p>Padded</p>
      </BpkThemeProvider>,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.padding).toBe('8px');
    expect(wrapper.style.getPropertyValue('--bpk-core-primary')).toBe(
      '#e00045',
    );
  });

  it('spreads arbitrary props onto the wrapper element', () => {
    const { container } = render(
      <BpkThemeProvider theme={THEME} data-testid="wrapper">
        <p>Arbitrary props</p>
      </BpkThemeProvider>,
    );
    expect(container.querySelector('[data-testid="wrapper"]')).not.toBeNull();
  });

  it('does not inject inline vars for mode-specific values', () => {
    const { container } = render(
      <BpkThemeProvider
        theme={{ corePrimary: { light: '#e00045', dark: '#ff6b8a' } }}
      >
        <p>mode only</p>
      </BpkThemeProvider>,
    );
    // Wrapper div must not have --bpk-core-primary in its inline style
    const wrapperDivs = container.querySelectorAll('div');
    const wrapper = wrapperDivs[wrapperDivs.length - 1] as HTMLElement;
    expect(wrapper.style.getPropertyValue('--bpk-core-primary')).toBe('');
  });
});

describe('useBpkTheme', () => {
  it('returns null outside a provider', () => {
    let capturedTheme: BpkTheme | null = undefined as unknown as BpkTheme | null;

    const Consumer = () => {
      capturedTheme = useBpkTheme();
      return <p>consumer</p>;
    };

    render(<Consumer />);
    expect(capturedTheme).toBeNull();
  });

  it('returns the current theme inside a provider', () => {
    let capturedTheme: BpkTheme | null = null;

    const Consumer = () => {
      capturedTheme = useBpkTheme();
      return <p>consumer</p>;
    };

    render(
      <BpkThemeProvider theme={THEME}>
        <Consumer />
      </BpkThemeProvider>,
    );

    expect(capturedTheme).toEqual(THEME);
  });

  it('returns null when provider has no theme', () => {
    let capturedTheme: BpkTheme | null = undefined as unknown as BpkTheme | null;

    const Consumer = () => {
      capturedTheme = useBpkTheme();
      return <p>consumer</p>;
    };

    render(
      <BpkThemeProvider>
        <Consumer />
      </BpkThemeProvider>,
    );

    expect(capturedTheme).toBeNull();
  });
});
