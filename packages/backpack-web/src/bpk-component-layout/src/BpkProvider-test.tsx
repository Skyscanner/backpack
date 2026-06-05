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

import { useLocaleContext } from '@ark-ui/react';
import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { BpkBox } from './BpkBox';
import { BpkProvider } from './BpkProvider';
import { BpkSpacing } from './tokens';

const LocaleReader = () => {
  const { locale } = useLocaleContext();
  return <span data-testid="locale">{locale}</span>;
};

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
