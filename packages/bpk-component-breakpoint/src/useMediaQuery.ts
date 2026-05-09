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

import { useEffect, useState } from 'react';

const useMediaQuery = (
  query: string,
  matchSSR?: boolean,
): boolean => {
  const isClient = typeof window !== 'undefined' && !!window.matchMedia;

  // When matchSSR is provided, we need hydration protection
  const needsHydrationProtection = matchSSR !== undefined;
  const [isHydrated, setIsHydrated] = useState(!needsHydrationProtection);

  const [matches, setMatches] = useState(() => {
    if (!isClient) {
      return matchSSR ?? false;
    }

    if (needsHydrationProtection) {
      return matchSSR;
    }

    return window.matchMedia(query).matches;
  });

  // Mark hydration as complete
  useEffect(() => {
    if (needsHydrationProtection && !isHydrated) {
      setIsHydrated(true);
    }
  }, [needsHydrationProtection, isHydrated]);

  useEffect(() => {
    // Wait for hydration to complete
    if (!isClient || !isHydrated) {
      return () => { };
    }

    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = () => {
      setMatches(media.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query, isClient, isHydrated]);

  return matches;
};

export default useMediaQuery;
