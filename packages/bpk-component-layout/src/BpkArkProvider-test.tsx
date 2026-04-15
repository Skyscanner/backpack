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

import { BpkArkProvider } from './BpkArkProvider';

const LocaleReader = () => {
  const { locale } = useLocaleContext();
  return <span data-testid="locale">{locale}</span>;
};

describe('BpkArkProvider', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('dir');
    document.documentElement.removeAttribute('lang');
  });

  it('renders children without crashing', () => {
    const { getByText } = render(
      <BpkArkProvider>
        <div>Ark child</div>
      </BpkArkProvider>,
    );

    expect(getByText('Ark child')).toBeInTheDocument();
  });

  it('passes en-US locale to Ark when document dir is ltr', () => {
    const { getByTestId } = render(
      <BpkArkProvider>
        <LocaleReader />
      </BpkArkProvider>,
    );

    expect(getByTestId('locale').textContent).toBe('en-US');
  });

  it('passes ar-SA locale to Ark when document dir is rtl on mount', () => {
    document.documentElement.setAttribute('dir', 'rtl');

    const { getByTestId } = render(
      <BpkArkProvider>
        <LocaleReader />
      </BpkArkProvider>,
    );

    expect(getByTestId('locale').textContent).toBe('ar-SA');
  });

  it('updates locale to ar-SA when dir attribute changes to rtl', async () => {
    const { getByTestId } = render(
      <BpkArkProvider>
        <LocaleReader />
      </BpkArkProvider>,
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
      <BpkArkProvider>
        <LocaleReader />
      </BpkArkProvider>,
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
      <BpkArkProvider>
        <LocaleReader />
      </BpkArkProvider>,
    );

    expect(getByTestId('locale').textContent).toBe('fr-FR');
  });

  it('uses html[lang] when its direction is consistent with html[dir]', () => {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar-EG');

    const { getByTestId } = render(
      <BpkArkProvider>
        <LocaleReader />
      </BpkArkProvider>,
    );

    expect(getByTestId('locale').textContent).toBe('ar-EG');
  });

  it('ignores html[lang] and uses direction fallback when lang direction conflicts with html[dir]', () => {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'en-US');

    const { getByTestId } = render(
      <BpkArkProvider>
        <LocaleReader />
      </BpkArkProvider>,
    );

    expect(getByTestId('locale').textContent).toBe('ar-SA');
  });

  it('disconnects MutationObserver on unmount', () => {
    const disconnectSpy = jest.spyOn(MutationObserver.prototype, 'disconnect');

    const { unmount } = render(
      <BpkArkProvider>
        <div>child</div>
      </BpkArkProvider>,
    );

    unmount();

    expect(disconnectSpy).toHaveBeenCalled();
    disconnectSpy.mockRestore();
  });
});
