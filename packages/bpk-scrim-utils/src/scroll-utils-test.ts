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

import {
  fixBody,
  lockScroll,
  lockTouchAction,
  restoreScroll,
  storeScroll,
  unfixBody,
  unlockScroll,
  unlockTouchAction,
} from './scroll-utils';

describe('scroll-utils', () => {
  const resetBodyStyles = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.touchAction = '';
    document.body.style.overscrollBehavior = '';
  };

  beforeEach(() => {
    resetBodyStyles();
    // reset the module-level scrollOffset to 0 before each test
    Object.defineProperty(window, 'pageYOffset', {
      configurable: true,
      value: 0,
    });
    storeScroll();
  });

  afterEach(() => {
    resetBodyStyles();
  });

  describe('storeScroll / restoreScroll', () => {
    it('restoreScroll scrolls to the offset captured by storeScroll', () => {
      Object.defineProperty(window, 'pageYOffset', {
        configurable: true,
        value: 420,
      });
      storeScroll();

      const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation();
      restoreScroll();
      expect(scrollToSpy).toHaveBeenCalledWith(0, 420);
      scrollToSpy.mockRestore();
    });
  });

  describe('fixBody', () => {
    it('sets top, width and position to preserve scroll position', () => {
      Object.defineProperty(window, 'pageYOffset', {
        configurable: true,
        value: 250,
      });
      storeScroll();
      fixBody();

      expect(document.body.style.top).toBe('-250px');
      expect(document.body.style.width).toBe('100%');
      expect(document.body.style.position).toBe('fixed');
    });
  });

  describe('unfixBody', () => {
    it('clears top, width and position', () => {
      Object.defineProperty(window, 'pageYOffset', {
        configurable: true,
        value: 100,
      });
      storeScroll();
      fixBody();
      unfixBody();

      expect(document.body.style.top).toBe('');
      expect(document.body.style.width).toBe('');
      expect(document.body.style.position).toBe('');
    });
  });

  describe('lockScroll', () => {
    it('sets overflow and overscroll-behavior on the body, without touching touch-action', () => {
      lockScroll();

      expect(document.body.style.overflow).toBe('hidden');
      expect(document.body.style.overscrollBehavior).toBe('contain');
      expect(document.body.style.touchAction).toBe('');
    });
  });

  describe('unlockScroll', () => {
    it('clears overflow and padding-right, restores overscroll-behavior to pre-lock value', () => {
      lockScroll();
      unlockScroll();

      expect(document.body.style.overflow).toBe('');
      expect(document.body.style.paddingRight).toBe('');
      expect(document.body.style.overscrollBehavior).toBe('');
    });

    it('restores host-app inline overscroll-behavior after unlock', () => {
      document.body.style.overscrollBehavior = 'none';

      lockScroll();
      unlockScroll();

      expect(document.body.style.overscrollBehavior).toBe('none');
    });
  });

  describe('lockTouchAction', () => {
    it('sets touch-action to none on the body', () => {
      lockTouchAction();

      expect(document.body.style.touchAction).toBe('none');
    });
  });

  describe('unlockTouchAction', () => {
    it('restores touch-action to the pre-lock value (empty when unset)', () => {
      lockTouchAction();
      unlockTouchAction();

      expect(document.body.style.touchAction).toBe('');
    });

    it('restores host-app inline touch-action after unlock', () => {
      document.body.style.touchAction = 'manipulation';

      lockTouchAction();
      unlockTouchAction();

      expect(document.body.style.touchAction).toBe('manipulation');
    });
  });
});
