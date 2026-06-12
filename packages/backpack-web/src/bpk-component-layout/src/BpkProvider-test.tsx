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

import type { ReactNode } from 'react';
import { Component } from 'react';

import { useLocaleContext } from '@ark-ui/react';
import { act, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import createCache from '@emotion/cache';

jest.mock('@emotion/cache', () =>
  jest.fn((options: object) => {
    const realCreateCache =
      jest.requireActual<typeof import('@emotion/cache')>('@emotion/cache')
        .default;
    return realCreateCache(options);
  }),
);

const mockCreateCache = createCache as jest.Mock;

import { BpkBox } from './BpkBox';
import { BpkProvider } from './BpkProvider';
import { BpkSpacing } from './tokens';

// Mirrors the production topology: error boundary whose fallback also mounts BpkProvider.
// This is exactly the structure that causes the infinite remount loop.
class LoopBoundary extends Component<
  { children: ReactNode },
  { errored: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { errored: false };
  }

  static getDerivedStateFromError() {
    return { errored: true };
  }

  componentDidCatch() {
    this.catchCount += 1;
  }

  catchCount = 0;

  render() {
    if (this.state.errored) {
      return (
        <BpkProvider>
          <div data-testid="fallback">fallback</div>
        </BpkProvider>
      );
    }
    return this.props.children;
  }
}

const LocaleReader = () => {
  const { locale } = useLocaleContext();
  return <span data-testid="locale">{locale}</span>;
};

describe('BpkProvider - Emotion cache', () => {
  afterEach(() => {
    jest.clearAllMocks();
    delete (window as any).Cypress;
    delete (window as any).hotelsDisableEmotionSpeedy;
  });

  it('creates cache without speedy in a normal (non-Cypress) environment', () => {
    render(
      <BpkProvider>
        <div />
      </BpkProvider>,
    );

    expect(mockCreateCache).toHaveBeenCalledWith({ key: 'css' });
    expect(mockCreateCache).not.toHaveBeenCalledWith(
      expect.objectContaining({ speedy: false }),
    );
  });

  it('creates cache with speedy: false when hotelsDisableEmotionSpeedy is set', async () => {
    (window as any).hotelsDisableEmotionSpeedy = true;

    render(
      <BpkProvider>
        <div />
      </BpkProvider>,
    );

    await waitFor(() => {
      expect(mockCreateCache).toHaveBeenCalledWith({
        key: 'css',
        speedy: false,
      });
    });
  });

  it('creates cache with speedy: false when window.Cypress is set', async () => {
    (window as any).Cypress = {};

    render(
      <BpkProvider>
        <div />
      </BpkProvider>,
    );

    await waitFor(() => {
      expect(mockCreateCache).toHaveBeenCalledWith({
        key: 'css',
        speedy: false,
      });
    });
  });

  it('recreates the cache after mount in Cypress to replace hydration-stripped styles', async () => {
    (window as any).hotelsDisableEmotionSpeedy = true;

    render(
      <BpkProvider>
        <div />
      </BpkProvider>,
    );

    await waitFor(() => {
      const speedyCalls = mockCreateCache.mock.calls.filter(
        (args: any[]) => args[0]?.speedy === false,
      );
      expect(speedyCalls.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('does not create a new cache when nested inside another BpkProvider', () => {
    render(
      <BpkProvider>
        <BpkProvider>
          <div />
        </BpkProvider>
      </BpkProvider>,
    );

    // Only the outermost BpkProvider should create a cache
    expect(mockCreateCache).toHaveBeenCalledTimes(1);
  });
});

describe('BpkProvider', () => {
  it('renders children inside Chakra system without crashing', () => {
    const { getByText } = render(
      <BpkProvider>
        <BpkBox padding={BpkSpacing.MD}>
          Layout content
        </BpkBox>
      </BpkProvider>,
    );

    expect(getByText('Layout content')).toBeInTheDocument();
  });

  it('can render plain DOM children', () => {
    const { getByText } = render(
      <BpkProvider>
        <div>Plain child</div>
      </BpkProvider>,
    );

    expect(getByText('Plain child')).toBeInTheDocument();
  });
});

describe('BpkProvider - RTL support', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('dir');
    document.documentElement.removeAttribute('lang');
  });

  it('passes en-US locale to Ark when document dir is ltr', () => {
    const { getByTestId } = render(
      <BpkProvider>
        <LocaleReader />
      </BpkProvider>,
    );

    expect(getByTestId('locale').textContent).toBe('en-US');
  });

  it('passes ar-SA locale to Ark when document dir is rtl on mount', () => {
    document.documentElement.setAttribute('dir', 'rtl');

    const { getByTestId } = render(
      <BpkProvider>
        <LocaleReader />
      </BpkProvider>,
    );

    expect(getByTestId('locale').textContent).toBe('ar-SA');
  });

  it('updates locale to ar-SA when dir attribute changes to rtl', async () => {
    const { getByTestId } = render(
      <BpkProvider>
        <LocaleReader />
      </BpkProvider>,
    );

    expect(getByTestId('locale').textContent).toBe('en-US');

    await act(async () => {
      document.documentElement.setAttribute('dir', 'rtl');
    });

    expect(getByTestId('locale').textContent).toBe('ar-SA');
  });

  it('updates locale back to en-US when dir attribute changes from rtl to ltr', async () => {
    document.documentElement.setAttribute('dir', 'rtl');

    const { getByTestId } = render(
      <BpkProvider>
        <LocaleReader />
      </BpkProvider>,
    );

    expect(getByTestId('locale').textContent).toBe('ar-SA');

    await act(async () => {
      document.documentElement.setAttribute('dir', 'ltr');
    });

    expect(getByTestId('locale').textContent).toBe('en-US');
  });

  it('passes html[lang] value to Ark when lang attribute is set', () => {
    document.documentElement.setAttribute('lang', 'fr-FR');

    const { getByTestId } = render(
      <BpkProvider>
        <LocaleReader />
      </BpkProvider>,
    );

    expect(getByTestId('locale').textContent).toBe('fr-FR');
  });

  it('uses html[lang] when its direction is consistent with html[dir]', () => {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar-EG');

    const { getByTestId } = render(
      <BpkProvider>
        <LocaleReader />
      </BpkProvider>,
    );

    expect(getByTestId('locale').textContent).toBe('ar-EG');
  });

  it('ignores html[lang] and uses direction fallback when lang direction conflicts with html[dir]', () => {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'en-US');

    const { getByTestId } = render(
      <BpkProvider>
        <LocaleReader />
      </BpkProvider>,
    );

    expect(getByTestId('locale').textContent).toBe('ar-SA');
  });

  it('updates locale when html[lang] attribute changes', async () => {
    const { getByTestId } = render(
      <BpkProvider>
        <LocaleReader />
      </BpkProvider>,
    );

    expect(getByTestId('locale').textContent).toBe('en-US');

    await act(async () => {
      document.documentElement.setAttribute('lang', 'fr-FR');
    });

    expect(getByTestId('locale').textContent).toBe('fr-FR');
  });

  it('falls back to direction-based locale when html[lang] is removed', async () => {
    document.documentElement.setAttribute('lang', 'fr-FR');

    const { getByTestId } = render(
      <BpkProvider>
        <LocaleReader />
      </BpkProvider>,
    );

    expect(getByTestId('locale').textContent).toBe('fr-FR');

    await act(async () => {
      document.documentElement.removeAttribute('lang');
    });

    expect(getByTestId('locale').textContent).toBe('en-US');
  });

  it('falls back to en-US and does not crash when html[lang] is an invalid locale (numeric string)', () => {
    document.documentElement.setAttribute('lang', '123');

    const { getByTestId } = render(
      <BpkProvider>
        <LocaleReader />
      </BpkProvider>,
    );

    expect(getByTestId('locale').textContent).toBe('en-US');
  });

  it('falls back to en-US and does not crash when html[lang] is an empty string', () => {
    document.documentElement.setAttribute('lang', '');

    const { getByTestId } = render(
      <BpkProvider>
        <LocaleReader />
      </BpkProvider>,
    );

    expect(getByTestId('locale').textContent).toBe('en-US');
  });

  it('does not loop when ErrorBoundary fallback also mounts BpkProvider with invalid html[lang]', () => {
    document.documentElement.setAttribute('lang', '123');

    // Suppress expected React error output for this test
    jest.spyOn(console, 'error').mockImplementation(jest.fn());

    const boundary = { current: null as LoopBoundary | null };
    render(
      // LoopBoundary mirrors the production topology: ErrorBoundary whose fallback
      // also mounts BpkProvider. Without the fix this render() never returns —
      // it exhausts the JS heap as BpkProvider → Ark throws → boundary remounts
      // BpkProvider → repeat. With the fix BpkProvider never throws.
      <LoopBoundary ref={(el) => { boundary.current = el; }}>
        <BpkProvider>
          <div>content</div>
        </BpkProvider>
      </LoopBoundary>,
    );

    expect(boundary.current?.catchCount).toBe(0);

    jest.restoreAllMocks();
  });

  it('passes a valid html[lang] through to Ark unchanged', () => {
    document.documentElement.setAttribute('lang', 'en-GB');

    const { getByTestId } = render(
      <BpkProvider>
        <LocaleReader />
      </BpkProvider>,
    );

    expect(getByTestId('locale').textContent).toBe('en-GB');
  });

  it('disconnects MutationObserver on unmount', () => {
    const disconnectSpy = jest.spyOn(MutationObserver.prototype, 'disconnect');

    const { unmount } = render(
      <BpkProvider>
        <div>child</div>
      </BpkProvider>,
    );

    unmount();

    expect(disconnectSpy).toHaveBeenCalled();
    disconnectSpy.mockRestore();
  });
});
