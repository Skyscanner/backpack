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

const useMediaQuery = (query: string, matchSSR = false): boolean => {
  const isClient = typeof window !== 'undefined' && !!window.matchMedia;

  const [matches, setMatches] = useState(
    isClient ? window.matchMedia(query).matches : matchSSR,
  );

  useEffect(() => {
    if(isClient){
      const media = window.matchMedia(query);
      setMatches(media.matches);
      const listener = () => {
        setMatches(media.matches);
      };
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
    return () => {}
  }, [query, isClient]);

  return matches;
};

export default useMediaQuery;
