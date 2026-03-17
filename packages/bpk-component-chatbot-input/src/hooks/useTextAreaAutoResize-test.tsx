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

import type { RefObject } from 'react';

import { act, renderHook } from '@testing-library/react';

import useTextAreaAutoResize, {
  LINE_HEIGHT,
  MIN_INPUT_HEIGHT,
  MAX_INPUT_HEIGHT_PHASE_1,
  MAX_INPUT_HEIGHT_PHASE_2,
  MIN_CONTAINER_HEIGHT,
  MAX_CONTAINER_HEIGHT,
} from './useTextAreaAutoResize';

const mockRequestAnimationFrame = jest.fn((callback) => {
  callback();
  return 1;
});

const mockGetComputedStyle = jest.fn();

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('useTextAreaAutoResize', () => {
  let mockTextArea: any;
  let mockMeasureElement: HTMLTextAreaElement;

  const setMeasureScrollHeight = (height: number) => {
    Object.defineProperty(mockMeasureElement, 'scrollHeight', {
      value: height,
      writable: true,
    });
  };

  const setTextAreaScrollHeight = (height: number) => {
    Object.defineProperty(mockTextArea, 'scrollHeight', {
      value: height,
      writable: true,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();

    global.requestAnimationFrame = mockRequestAnimationFrame;
    globalThis.getComputedStyle = mockGetComputedStyle;

    mockGetComputedStyle.mockReturnValue({
      fontSize: '16px',
      fontFamily: 'Arial',
      lineHeight: '24px',
      padding: '8px',
      border: '1px solid #ccc',
      boxSizing: 'border-box',
    });

    let scrollTop = 0;
    mockTextArea = {
      offsetWidth: 300,
      scrollHeight: LINE_HEIGHT,
      get scrollTop() {
        return scrollTop;
      },
      set scrollTop(value) {
        scrollTop = value;
      },
    };

    mockMeasureElement = document.createElement('textarea');
    mockMeasureElement.remove = jest.fn();
    setMeasureScrollHeight(LINE_HEIGHT);

    const originalCreateElement = document.createElement.bind(document);
    jest.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'textarea') {
        return mockMeasureElement;
      }
      return originalCreateElement(tagName);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const createRef = () => {
    const ref = {
      current: mockTextArea,
    } as RefObject<HTMLTextAreaElement>;
    return ref;
  };

  describe('initial state', () => {
    it('should return initial dimensions when ref is null or value is empty', () => {
      const ref = { current: null };
      const { result } = renderHook(() =>
        useTextAreaAutoResize({ ref, value: '' }),
      );

      expect(result.current.isExpanding).toBe(false);
      expect(result.current.textareaHeight).toBe(MIN_INPUT_HEIGHT);
      expect(result.current.containerHeight).toBe(MIN_CONTAINER_HEIGHT);
      expect(result.current.shouldReduceParentPadding).toBe(false);
    });
  });

  describe('dimension calculations', () => {
    it('should not expand for single line text', () => {
      const ref = createRef();
      setMeasureScrollHeight(LINE_HEIGHT);

      const { result } = renderHook(() =>
        useTextAreaAutoResize({ ref, value: 'Hello' }),
      );

      expect(result.current.isExpanding).toBe(false);
      expect(result.current.textareaHeight).toBe(MIN_INPUT_HEIGHT);
    });

    it('should expand naturally for multi-line text within limits', () => {
      const ref = createRef();
      setMeasureScrollHeight(LINE_HEIGHT * 3);

      const { result } = renderHook(() =>
        useTextAreaAutoResize({ ref, value: 'Line 1\nLine 2\nLine 3' }),
      );

      expect(result.current.isExpanding).toBe(true);
      expect(result.current.textareaHeight).toBe(LINE_HEIGHT * 3);
      expect(result.current.shouldReduceParentPadding).toBe(false);
    });

    it('should limit height at phase 1 (4 lines)', () => {
      const ref = createRef();
      setMeasureScrollHeight(LINE_HEIGHT * 4);

      const { result } = renderHook(() =>
        useTextAreaAutoResize({ ref, value: 'Line 1\nLine 2\nLine 3\nLine 4' }),
      );

      expect(result.current.textareaHeight).toBe(MAX_INPUT_HEIGHT_PHASE_1);
      expect(result.current.shouldReduceParentPadding).toBe(false);
    });

    it('should switch to phase 2 for 5+ lines', () => {
      const ref = createRef();
      setMeasureScrollHeight(LINE_HEIGHT * 6);

      const { result } = renderHook(() =>
        useTextAreaAutoResize({
          ref,
          value: 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5\nLine 6',
        }),
      );

      expect(result.current.textareaHeight).toBe(MAX_INPUT_HEIGHT_PHASE_2);
      expect(result.current.containerHeight).toBe(MAX_CONTAINER_HEIGHT);
      expect(result.current.shouldReduceParentPadding).toBe(true);
    });
  });

  describe('value changes', () => {
    it('should expand and shrink dynamically', () => {
      const ref = createRef();
      const { rerender, result } = renderHook(
        ({ value }) => useTextAreaAutoResize({ ref, value }),
        { initialProps: { value: 'Hello' } },
      );

      expect(result.current.isExpanding).toBe(false);

      setMeasureScrollHeight(LINE_HEIGHT * 2);
      rerender({ value: 'Hello\nWorld' });

      expect(result.current.isExpanding).toBe(true);
      expect(result.current.textareaHeight).toBe(LINE_HEIGHT * 2);

      setMeasureScrollHeight(LINE_HEIGHT);
      rerender({ value: 'Hello' });

      expect(result.current.isExpanding).toBe(false);
      expect(result.current.textareaHeight).toBe(MIN_INPUT_HEIGHT);
    });
  });

  describe('cleanup', () => {
    it('should clean up measure element on unmount', () => {
      const ref = createRef();
      const { unmount } = renderHook(() =>
        useTextAreaAutoResize({ ref, value: 'Hello' }),
      );

      unmount();

      expect(mockMeasureElement.remove).toHaveBeenCalled();
    });
  });

  describe('scroll behavior', () => {
    it('should provide scrollToBottom function', () => {
      const ref = createRef();
      const { result } = renderHook(() =>
        useTextAreaAutoResize({ ref, value: 'Hello' }),
      );

      act(() => {
        result.current.scrollToBottom();
      });

      expect(mockRequestAnimationFrame).toHaveBeenCalled();
    });

    it('should not throw when scrollToBottom is called with null ref', () => {
      const ref = { current: null };
      const { result } = renderHook(() =>
        useTextAreaAutoResize({ ref, value: '' }),
      );

      expect(() => {
        act(() => {
          result.current.scrollToBottom();
        });
      }).not.toThrow();

      expect(mockRequestAnimationFrame).not.toHaveBeenCalled();
    });

    it('should auto-scroll when appending text exceeds max height', () => {
      const ref = createRef();
      setTextAreaScrollHeight(MAX_INPUT_HEIGHT_PHASE_1);
      setMeasureScrollHeight(LINE_HEIGHT * 4);

      const { rerender } = renderHook(
        ({ value }) => useTextAreaAutoResize({ ref, value }),
        { initialProps: { value: 'Line 1\nLine 2\nLine 3\nLine 4' } },
      );

      const initialCallCount = mockRequestAnimationFrame.mock.calls.length;

      setTextAreaScrollHeight(MAX_INPUT_HEIGHT_PHASE_1 + 10);
      setMeasureScrollHeight(LINE_HEIGHT * 5);
      rerender({ value: 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5' });

      expect(mockRequestAnimationFrame.mock.calls.length).toBeGreaterThan(
        initialCallCount,
      );
    });

    it('should not auto-scroll when replacing text', () => {
      const ref = createRef();
      setTextAreaScrollHeight(MAX_INPUT_HEIGHT_PHASE_1);
      setMeasureScrollHeight(LINE_HEIGHT * 4);

      const { rerender } = renderHook(
        ({ value }) => useTextAreaAutoResize({ ref, value }),
        { initialProps: { value: 'Original' } },
      );

      const initialCallCount = mockRequestAnimationFrame.mock.calls.length;

      setMeasureScrollHeight(LINE_HEIGHT * 5);
      rerender({ value: 'Different' });

      expect(mockRequestAnimationFrame.mock.calls.length).toBe(
        initialCallCount,
      );
    });
  });
});
