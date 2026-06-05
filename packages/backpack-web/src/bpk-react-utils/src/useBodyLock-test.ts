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

import { renderHook } from '@testing-library/react';

const resetBodyStyles = () => {
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.style.touchAction = '';
  document.body.style.overscrollBehavior = '';
};

describe('useBodyLock', () => {
  let useBodyLock: (isLocked: boolean) => void;

  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
    resetBodyStyles();
    jest.isolateModules(() => {
      useBodyLock = jest.requireActual('./useBodyLock').default;
    });
  });

  afterEach(() => {
    resetBodyStyles();
  });

  it('should apply all lock styles to body when isLocked is true', () => {
    renderHook(() => useBodyLock(true));
    expect(document.body.style.position).toBe('fixed');
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.style.top).toBe('-200px');
    expect(document.body.style.width).toBe('100%');
    expect(document.body.style.touchAction).toBe('none');
    expect(document.body.style.overscrollBehavior).toBe('contain');
  });

  it('should not modify body styles when isLocked is false', () => {
    renderHook(() => useBodyLock(false));
    expect(document.body.style.position).toBe('');
    expect(document.body.style.overflow).toBe('');
  });

  describe('on unlock (isLocked changes to false)', () => {
    it('should restore original body styles', () => {
      document.body.style.overflow = 'auto';

      const { rerender } = renderHook(({ locked }) => useBodyLock(locked), {
        initialProps: { locked: true },
      });

      expect(document.body.style.position).toBe('fixed');

      rerender({ locked: false });

      expect(document.body.style.position).toBe('');
      expect(document.body.style.overflow).toBe('auto');
    });

    it('should restore scrollY position', () => {
      const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});

      const { rerender } = renderHook(({ locked }) => useBodyLock(locked), {
        initialProps: { locked: true },
      });

      rerender({ locked: false });

      expect(scrollToSpy).toHaveBeenCalledWith(0, 200);
      scrollToSpy.mockRestore();
    });
  });

  describe('on unmount while locked', () => {
    it('should restore body styles on unmount', () => {
      const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
      const { unmount } = renderHook(() => useBodyLock(true));
      expect(document.body.style.position).toBe('fixed');

      unmount();

      expect(document.body.style.position).toBe('');
      expect(document.body.style.overflow).toBe('');
      expect(scrollToSpy).toHaveBeenCalledWith(0, 200);
      scrollToSpy.mockRestore();
    });
  });

  describe('concurrent callers (reference counting)', () => {
    it('should keep body locked when inner dialog closes first (LIFO order)', () => {
      const modal = renderHook(({ locked }) => useBodyLock(locked), {
        initialProps: { locked: true },
      });
      const bottomSheet = renderHook(({ locked }) => useBodyLock(locked), {
        initialProps: { locked: true },
      });

      expect(document.body.style.position).toBe('fixed');

      bottomSheet.rerender({ locked: false });
      expect(document.body.style.position).toBe('fixed');
      expect(document.body.style.overflow).toBe('hidden');

      const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
      modal.rerender({ locked: false });
      expect(document.body.style.position).toBe('');
      expect(document.body.style.overflow).toBe('');
      expect(scrollToSpy).toHaveBeenCalledWith(0, 200);
      scrollToSpy.mockRestore();
    });

    it('should restore original body styles, not the already-locked styles', () => {
      document.body.style.overflow = 'auto';

      const modal = renderHook(({ locked }) => useBodyLock(locked), {
        initialProps: { locked: true },
      });
      expect(document.body.style.overflow).toBe('hidden');

      const bottomSheet = renderHook(({ locked }) => useBodyLock(locked), {
        initialProps: { locked: true },
      });

      const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
      bottomSheet.rerender({ locked: false });
      modal.rerender({ locked: false });

      expect(document.body.style.overflow).toBe('auto');
      scrollToSpy.mockRestore();
    });

    it('should handle unmount of inner dialog while outer is still active', () => {
      renderHook(() => useBodyLock(true));
      const bottomSheet = renderHook(() => useBodyLock(true));

      bottomSheet.unmount();

      expect(document.body.style.position).toBe('fixed');
      expect(document.body.style.overflow).toBe('hidden');
    });
  });
});
