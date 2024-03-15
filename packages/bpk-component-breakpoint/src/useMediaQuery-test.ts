import { renderHook } from '@testing-library/react-hooks';

import useMediaQuery from './useMediaQuery';

describe('useMediaQuery', () => {
  it('should return true if media query matches', () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const view = renderHook(() => useMediaQuery('(min-width: 768px)'));

    expect(view.result.all.length).toBe(1);

    expect(view.result.all[0]).toBe(true);
  });

  it('should return false if media query doesn`t match', () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const view = renderHook(() => useMediaQuery('(min-width: 1024px)'));

    expect(view.result.all.length).toBe(1);

    expect(view.result.all[0]).toBe(false);
  });
});
