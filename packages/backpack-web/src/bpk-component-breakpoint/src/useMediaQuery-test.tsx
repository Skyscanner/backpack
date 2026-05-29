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

import { act, renderHook, waitFor } from '@testing-library/react';
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

  describe('Client-side rendering (no matchSSR)', () => {
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
  });

  describe('Client-side hydration behavior with matchSSR', () => {
    it('should protect against hydration mismatches when matchSSR=true', async () => {
      // Scenario: Server renders with matchSSR=true (assuming large viewport based on User-Agent)
      // But actual client viewport is small (matches=false)
      const mockMedia = {
        matches: false, // Actual client viewport doesn't match
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
      window.matchMedia = jest.fn().mockImplementation(() => mockMedia);

      const view = renderHook(() => useMediaQuery('(min-width: 768px)', true));

      // Initial render: Uses matchSSR=true to match server HTML
      // After hydration completes: Syncs to actual viewport (false)
      // In test environment, effects run immediately, so we see the final synced value
      expect(view.result.current).toBe(false);

      // Verify event listener was set up after hydration
      await waitFor(() => {
        expect(mockMedia.addEventListener).toHaveBeenCalled();
      });
    });

    it('should protect against hydration mismatches when matchSSR=false', async () => {
      // Scenario: Server renders with matchSSR=false (assuming small viewport based on User-Agent)
      // But actual client viewport is large (matches=true)
      const mockMedia = {
        matches: true, // Actual client viewport matches
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
      window.matchMedia = jest.fn().mockImplementation(() => mockMedia);

      const view = renderHook(() => useMediaQuery('(min-width: 768px)', false));

      // Initial render: Uses matchSSR=false to match server HTML
      // After hydration completes: Syncs to actual viewport (true)
      // In test environment, effects run immediately, so we see the final synced value
      expect(view.result.current).toBe(true);

      // Verify event listener was set up after hydration
      await waitFor(() => {
        expect(mockMedia.addEventListener).toHaveBeenCalled();
      });
    });

    it('should NOT provide hydration protection when matchSSR is not specified', () => {
      // Scenario: Pure client-side rendering (no SSR)
      window.matchMedia = jest.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }));

      const view = renderHook(() => useMediaQuery('(min-width: 768px)'));

      // When matchSSR is undefined (not provided), no hydration protection is needed
      // This is a CSR scenario - should immediately use actual viewport value
      expect(view.result.current).toBe(false);
    });

    it('should update to viewport value after hydration when matchSSR is provided', async () => {
      // Scenario: Server renders with matchSSR=false, client viewport actually matches=true
      const mockMedia = {
        matches: true,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
      window.matchMedia = jest.fn().mockImplementation(() => mockMedia);

      const view = renderHook(() => useMediaQuery('(min-width: 768px)', false));

      // Initial render uses matchSSR=false to match server HTML
      // After hydration effects run, syncs to actual viewport value (true)
      expect(view.result.current).toBe(true);

      // Verify hydration completed and listener was set up
      await waitFor(() => {
        expect(mockMedia.addEventListener).toHaveBeenCalled();
      });
    });

    it('should handle media query changes after hydration', async () => {
      // Scenario: After hydration completes, viewport size changes (e.g., window resize)
      let changeListener: ((e?: MediaQueryListEvent) => void) | null = null;
      const mockMedia = {
        matches: false,
        addEventListener: jest.fn((event, listener) => {
          if (event === 'change') {
            changeListener = listener as () => void;
          }
        }),
        removeEventListener: jest.fn(),
      };
      window.matchMedia = jest.fn().mockImplementation(() => mockMedia);

      const view = renderHook(() => useMediaQuery('(min-width: 768px)', true));

      // Wait for hydration to complete and event listener to be set up
      await waitFor(() => {
        expect(mockMedia.addEventListener).toHaveBeenCalled();
      });

      // Simulate viewport change: small → large
      mockMedia.matches = true;
      await act(async () => {
        if (changeListener) {
          changeListener();
        }
      });

      // Hook should reflect the new viewport state
      expect(view.result.current).toBe(true);
    });
  });
});
