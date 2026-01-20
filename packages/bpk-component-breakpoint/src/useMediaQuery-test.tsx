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
});
