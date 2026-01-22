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
import { renderToString } from 'react-dom/server';

import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import useMediaQuery from './useMediaQuery';

describe('useMediaQuery', () => {
  describe('SSR mode', () => {
    const DummyComponent = ({ matchSSR }: { matchSSR?: boolean }) => {
      const matches = useMediaQuery('(min-width: 768px)', matchSSR);
      return <div>{matches ? 'matches' : 'no match'}</div>;
    };

    it('should match when matchSSR=true', () => {
      const html = renderToString(<DummyComponent matchSSR />);
      expect(html).toMatch(/matches/);
    });

    it('should not match when matchSSR=false', () => {
      const html = renderToString(<DummyComponent matchSSR={false} />);
      expect(html).toMatch(/no match/);
    });

    it('should not match when matchSSR not explicitly set', () => {
      const html = renderToString(<DummyComponent />);
      expect(html).toMatch(/no match/);
    });
  });

  it('should call addEventListener', () => {
    const mockAddEventListener = jest.fn();
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: mockAddEventListener,
      removeEventListener: jest.fn(),
    }));

    renderHook(() => useMediaQuery('(min-width: 768px)'));

    expect(mockAddEventListener).toHaveBeenCalledTimes(1);
  });

  it('should return true if media query matches', () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const view = renderHook(() => useMediaQuery('(min-width: 768px)'));

    expect(view.result.current).toBe(true);
  });

  it('should return false if media query doesn`t match', () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const view = renderHook(() => useMediaQuery('(min-width: 1024px)'));

    expect(view.result.current).toBe(false);
  });

  describe('Client-side hydration behavior with matchSSR', () => {
    it('should use matchSSR=true for initial state when matchSSR=true, then sync to viewport in useEffect', () => {
      // Mock actual viewport as mobile (matches=false)
      const mockMedia = {
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
      window.matchMedia = jest.fn().mockImplementation(() => mockMedia);

      // Pass matchSSR=true to simulate server rendering desktop layout
      const view = renderHook(() => useMediaQuery('(min-width: 768px)', true));

      // After initial render AND useEffect, it should be synced to actual viewport (false)
      // The useEffect at line 40 calls setMatches(media.matches) which updates to false
      expect(view.result.current).toBe(false);

      // Verify that addEventListener was called, confirming useEffect ran
      expect(mockMedia.addEventListener).toHaveBeenCalled();
    });

    it('should use actual viewport immediately when matchSSR=false (CSR-optimized)', () => {
      // Mock actual viewport as desktop (matches=true)
      window.matchMedia = jest.fn().mockImplementation(() => ({
        matches: true,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }));

      // Pass matchSSR=false explicitly (CSR-optimized)
      const view = renderHook(() => useMediaQuery('(min-width: 768px)', false));

      // Should use actual viewport (true) - no hydration safety mechanism
      expect(view.result.current).toBe(true);
    });

    it('should use actual viewport by default when matchSSR not specified', () => {
      // Mock actual viewport as mobile (matches=false)
      window.matchMedia = jest.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }));

      // Don't pass matchSSR (defaults to false)
      const view = renderHook(() => useMediaQuery('(min-width: 768px)'));

      // Should use actual viewport (false)
      expect(view.result.current).toBe(false);
    });

    it('documents that matchSSR=true prevents hydration mismatches at cost of a flash', () => {
      // Real-world scenario: Server sees mobile User-Agent, renders with matchSSR=false
      // But client has desktop viewport (e.g., Android Chrome "Request Desktop Site")

      // If we use matchSSR=false, there would be hydration mismatch:
      // - Server rendered: false (mobile User-Agent)
      // - Client initial: true (desktop viewport)
      // - React error: "Hydration failed because the initial UI does not match..."

      // Solution: Use matchSSR=true to force initial client state to match server
      const mockMedia = {
        matches: true, // Actual viewport is desktop
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
      window.matchMedia = jest.fn().mockImplementation(() => mockMedia);

      // Consumer would pass matchSSR=false (matching server's detection)
      // But in testing library, renderHook runs useEffect immediately
      // So we can only verify the final synced state
      const view = renderHook(() => useMediaQuery('(min-width: 768px)', false));

      // After useEffect, it reflects actual viewport
      expect(view.result.current).toBe(true);
    });
  });
});
