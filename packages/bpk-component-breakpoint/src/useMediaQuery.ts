import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(
    window.matchMedia ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    if (window.matchMedia) {
      const media = window.matchMedia(query);
      setMatches(media.matches);
      const listener = () => {
        setMatches(media.matches);
      };
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
    return undefined;
  }, [query]);

  return matches;
};

export default useMediaQuery;
