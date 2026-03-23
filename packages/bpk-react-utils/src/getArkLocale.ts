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

type Direction = 'ltr' | 'rtl';

const ARK_LOCALE: Record<Direction, string> = {
  ltr: 'en-US',
  rtl: 'ar-SA',
};

/**
 * Returns the current document text direction.
 * SSR-safe: returns 'ltr' when document is unavailable.
 * @returns {'ltr' | 'rtl'} The current document direction.
 */
export const getDocumentDir = (): Direction => {
  if (typeof document === 'undefined') return 'ltr';
  return document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
};

/**
 * Returns a BCP 47 locale string suitable for Ark UI's LocaleProvider,
 * derived from the current document direction.
 *
 * Ark UI infers text direction (LTR/RTL) from the locale — it does not read
 * document.dir directly. This utility bridges the gap.
 *
 * Usage: <LocaleProvider locale={getArkLocale()}>
 * @returns {string} A BCP 47 locale string ('en-US' for LTR, 'ar-SA' for RTL).
 */
const getArkLocale = (): string => ARK_LOCALE[getDocumentDir()];

export default getArkLocale;
