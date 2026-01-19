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
  matchSSR = false,
  ssrSafe = false,
): boolean => {
  const isClient = typeof window !== 'undefined' && !!window.matchMedia;

  const [matches, setMatches] = useState(() => {
    // In SSR or when ssrSafe=true: use matchSSR to match server-rendered HTML
    // This prevents hydration errors when User-Agent (server) != viewport size (client)
    if (!isClient || ssrSafe) {
      return matchSSR;
    }

    // In CSR when ssrSafe=false: use real viewport immediately for no flicker
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (isClient) {
      const media = window.matchMedia(query);
      setMatches(media.matches);
      const listener = () => {
        setMatches(media.matches);
      };
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
    return () => {};
  }, [query, isClient]);

  return matches;
};

export default useMediaQuery;
