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
import { useEffect, useState } from 'react';

import { LocaleProvider } from '@ark-ui/react';

export interface BpkProviderProps {
  children: ReactNode;
}

type Direction = 'ltr' | 'rtl';

const FALLBACK_LOCALE_BY_DIRECTION: Record<Direction, string> = {
  ltr: 'en-US',
  rtl: 'ar-SA',
};

const RTL_LANGUAGE_SUBTAGS = new Set([
  'ar', 'he', 'fa', 'ur', 'yi', 'iw', 'ps', 'sd', 'ug', 'ku',
]);

const getLangDir = (locale: string): Direction => {
  try {
    const dir = (new Intl.Locale(locale) as any).textInfo?.direction;
    if (dir) return dir === 'rtl' ? 'rtl' : 'ltr';
  } catch {
    // Ignore invalid locale strings
  }
  return RTL_LANGUAGE_SUBTAGS.has(locale.split('-')[0].toLowerCase())
    ? 'rtl'
    : 'ltr';
};

const getArkLocale = (): string => {
  if (typeof document === 'undefined') return 'en-US';

  const explicitDir = document.documentElement.getAttribute('dir');
  const lang = document.documentElement.getAttribute('lang');

  if (explicitDir === 'rtl' || explicitDir === 'ltr') {
    if (lang && getLangDir(lang) === explicitDir) return lang;
    return FALLBACK_LOCALE_BY_DIRECTION[explicitDir];
  }

  return lang || 'en-US';
};

const useArkLocale = (): string => {
  const [locale, setLocale] = useState<string>('en-US');

  useEffect(() => {
    setLocale(getArkLocale());
    const observer = new MutationObserver(() => setLocale(getArkLocale()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir', 'lang'],
    });
    return () => observer.disconnect();
  }, []);

  return locale;
};

/**
 * BpkProvider - Required root provider for Backpack components.
 *
 * Sets up locale context for Ark-based components (BpkCheckboxV2,
 * BpkSegmentedControlV2, etc.), reactively tracking document direction
 * (html[dir]) and language (html[lang]) for correct RTL rendering.
 *
 * @param {BpkProviderProps} props - The provider props.
 * @returns {JSX.Element} The provider wrapping its children.
 */
export const BpkProvider = ({ children }: BpkProviderProps): JSX.Element => {
  const locale = useArkLocale();
  return <LocaleProvider locale={locale}>{children}</LocaleProvider>;
};
