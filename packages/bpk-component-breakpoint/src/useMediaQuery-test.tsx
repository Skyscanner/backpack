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
    it('should protect against hydration mismatches when matchSSR=true', async () => {
      // Scenario: Server renders with matchSSR=true, but viewport is actually small (matches=false)
      const mockMedia = {
        matches: false, // Actual viewport doesn't match
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
      window.matchMedia = jest.fn().mockImplementation(() => mockMedia);

      const view = renderHook(() => useMediaQuery('(min-width: 768px)', true));

      // In test environment, effects run immediately after render
      // After hydration completes, should sync to actual viewport (false)
      expect(view.result.current).toBe(false);

      await waitFor(() => {
        expect(mockMedia.addEventListener).toHaveBeenCalled();
      });
    });

    it('should protect against hydration mismatches when matchSSR=false', async () => {
      // Scenario: Server renders with matchSSR=false, but viewport is actually large (matches=true)
      const mockMedia = {
        matches: true, // Actual viewport matches
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
      window.matchMedia = jest.fn().mockImplementation(() => mockMedia);

      const view = renderHook(() => useMediaQuery('(min-width: 768px)', false));

      // After hydration, should sync to actual viewport (true)
      expect(view.result.current).toBe(true);

      await waitFor(() => {
        expect(mockMedia.addEventListener).toHaveBeenCalled();
      });
    });

    it('should also provide hydration protection when matchSSR not explicitly specified', () => {
      window.matchMedia = jest.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }));

      const view = renderHook(() => useMediaQuery('(min-width: 768px)'));

      // matchSSR has default value false, so hydration protection is active
      // Final result reflects actual viewport
      expect(view.result.current).toBe(false);
    });

    it('should update to viewport value after hydration when matchSSR is provided', async () => {
      const mockMedia = {
        matches: true,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
      window.matchMedia = jest.fn().mockImplementation(() => mockMedia);

      const view = renderHook(() => useMediaQuery('(min-width: 768px)', false));

      // After effects run, should have actual viewport value
      expect(view.result.current).toBe(true);

      await waitFor(() => {
        expect(mockMedia.addEventListener).toHaveBeenCalled();
      });
    });

    it('should handle media query changes after hydration', async () => {
      let changeListener: (() => void) | null = null;
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

      // Wait for hydration and event listener setup
      await waitFor(() => {
        expect(mockMedia.addEventListener).toHaveBeenCalled();
      });

      // Simulate media query change
      mockMedia.matches = true;
      await act(async () => {
        if (changeListener) {
          changeListener();
        }
      });

      // Should reflect the new matches value
      expect(view.result.current).toBe(true);
    });
  });
});
