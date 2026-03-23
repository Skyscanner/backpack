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

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { LocaleProvider } from '@ark-ui/react/locale';

import { getDocumentDir } from '../../bpk-react-utils';

type Direction = 'ltr' | 'rtl';

/**
 * Event fired by BpkRtlToggle when the document direction changes.
 * @see packages/bpk-component-rtl-toggle/src/utils.ts
 */
const DIRECTION_CHANGE_EVENT = 'bpkchangedirection';

const ARK_LOCALE: Record<Direction, string> = {
  ltr: 'en-US',
  rtl: 'ar-SA',
};

const DirectionContext = createContext<Direction>('ltr');

interface BpkDirectionProviderProps {
  children: ReactNode;
}

/**
 * BpkDirectionProvider - Bridges document.dir to Ark UI's LocaleProvider.
 *
 * Ark UI does not read direction from the HTML element's dir attribute.
 * This provider reads document.dir on mount and subscribes to the
 * bpkchangedirection event (fired by BpkRtlToggle) to update reactively.
 *
 * Composed internally by BpkProvider. Not intended for direct consumer use.
 *
 * @param {BpkDirectionProviderProps} props - The provider props.
 * @returns {JSX.Element} Children wrapped in direction and Ark locale context.
 */
const BpkDirectionProvider = ({
  children,
}: BpkDirectionProviderProps): JSX.Element => {
  const [dir, setDir] = useState<Direction>(getDocumentDir);

  useEffect(() => {
    const html = document.querySelector('html');
    const handleDirectionChange = () => setDir(getDocumentDir());
    html?.addEventListener(DIRECTION_CHANGE_EVENT, handleDirectionChange);
    return () => {
      html?.removeEventListener(DIRECTION_CHANGE_EVENT, handleDirectionChange);
    };
  }, []);

  return (
    <DirectionContext.Provider value={dir}>
      <LocaleProvider locale={ARK_LOCALE[dir]}>{children}</LocaleProvider>
    </DirectionContext.Provider>
  );
};

/**
 * Returns the current document direction ('ltr' | 'rtl') from
 * Backpack's direction context. Must be used inside BpkProvider.
 * @returns {'ltr' | 'rtl'} The current direction.
 */
export const useDirection = (): Direction => useContext(DirectionContext);

export default BpkDirectionProvider;
