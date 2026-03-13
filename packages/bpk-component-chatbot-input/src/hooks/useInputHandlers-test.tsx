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

import type { ChangeEvent, MouseEvent, RefObject, TouchEvent } from 'react';

import { renderHook } from '@testing-library/react';

import useInputHandlers from './useInputHandlers';

describe('useInputHandlers', () => {
  let mockInputElement: HTMLInputElement;
  let mockOnInputChange: jest.Mock;
  let mockOnInputClick: jest.Mock;
  let mockRef: RefObject<HTMLInputElement>;

  beforeEach(() => {
    mockInputElement = document.createElement('input');
    mockInputElement.focus = jest.fn();

    mockOnInputChange = jest.fn();
    mockOnInputClick = jest.fn();
    mockRef = { current: mockInputElement };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleInputChange', () => {
    it('should call onInputChange with input value', () => {
      const { result } = renderHook(() =>
        useInputHandlers(mockRef, mockOnInputChange, mockOnInputClick),
      );

      const testInput = 'test input';
      const mockEvent = {
        target: { value: testInput },
      } as ChangeEvent<HTMLInputElement>;

      result.current.handleInputChange(mockEvent);

      expect(mockOnInputChange).toHaveBeenCalledWith(testInput);
      expect(mockOnInputChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleInputClick', () => {
    it('should focus and call onInputClick when element is enabled', () => {
      const { result } = renderHook(() =>
        useInputHandlers(mockRef, mockOnInputChange, mockOnInputClick),
      );

      const mockEvent = {
        stopPropagation: jest.fn(),
      } as unknown as MouseEvent<HTMLInputElement>;

      result.current.handleInputClick(mockEvent);

      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(mockInputElement.focus).toHaveBeenCalled();
      expect(mockOnInputClick).toHaveBeenCalled();
    });

    it('should not call onInputClick when element is disabled', () => {
      mockInputElement.disabled = true;

      const { result } = renderHook(() =>
        useInputHandlers(mockRef, mockOnInputChange, mockOnInputClick),
      );

      const mockEvent = {
        stopPropagation: jest.fn(),
      } as unknown as MouseEvent<HTMLInputElement>;

      result.current.handleInputClick(mockEvent);

      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(mockInputElement.focus).not.toHaveBeenCalled();
      expect(mockOnInputClick).not.toHaveBeenCalled();
    });

    it('should handle null ref safely', () => {
      const nullRef = { current: null };

      const { result } = renderHook(() =>
        useInputHandlers(nullRef, mockOnInputChange, mockOnInputClick),
      );

      const mockEvent = {
        stopPropagation: jest.fn(),
      } as unknown as MouseEvent<HTMLInputElement>;

      expect(() => result.current.handleInputClick(mockEvent)).not.toThrow();
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(mockOnInputClick).not.toHaveBeenCalled();
    });
  });

  describe('handleTouchStart', () => {
    it('should record touch target and stop propagation', () => {
      const { result } = renderHook(() =>
        useInputHandlers(mockRef, mockOnInputChange, mockOnInputClick),
      );

      const mockEvent = {
        stopPropagation: jest.fn(),
        target: mockInputElement,
      } as unknown as TouchEvent<HTMLInputElement>;

      result.current.handleTouchStart(mockEvent);

      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(mockInputElement.focus).not.toHaveBeenCalled();
      expect(mockOnInputClick).not.toHaveBeenCalled();
    });
  });

  describe('handleTouchEnd', () => {
    it('should focus element and call onInputClick when touch target matches', () => {
      const { result } = renderHook(() =>
        useInputHandlers(mockRef, mockOnInputChange, mockOnInputClick),
      );

      const mockTouchStartEvent = {
        stopPropagation: jest.fn(),
        target: mockInputElement,
      } as unknown as TouchEvent<HTMLInputElement>;

      const mockTouchEndEvent = {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
        target: mockInputElement,
      } as unknown as TouchEvent<HTMLInputElement>;

      result.current.handleTouchStart(mockTouchStartEvent);
      result.current.handleTouchEnd(mockTouchEndEvent);

      expect(mockTouchEndEvent.stopPropagation).toHaveBeenCalled();
      expect(mockTouchEndEvent.preventDefault).toHaveBeenCalled();
      expect(mockInputElement.focus).toHaveBeenCalled();
      expect(mockOnInputClick).toHaveBeenCalled();
    });

    it('should not trigger click when touch target does not match', () => {
      const { result } = renderHook(() =>
        useInputHandlers(mockRef, mockOnInputChange, mockOnInputClick),
      );

      const differentElement = document.createElement('div');

      const mockTouchStartEvent = {
        stopPropagation: jest.fn(),
        target: mockInputElement,
      } as unknown as TouchEvent<HTMLInputElement>;

      const mockTouchEndEvent = {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
        target: differentElement,
      } as unknown as TouchEvent<HTMLInputElement>;

      result.current.handleTouchStart(mockTouchStartEvent);
      result.current.handleTouchEnd(mockTouchEndEvent);

      expect(mockTouchEndEvent.stopPropagation).toHaveBeenCalled();
      expect(mockTouchEndEvent.preventDefault).not.toHaveBeenCalled();
      expect(mockInputElement.focus).not.toHaveBeenCalled();
      expect(mockOnInputClick).not.toHaveBeenCalled();
    });

    it('should handle null ref safely', () => {
      const nullRef = { current: null };

      const { result } = renderHook(() =>
        useInputHandlers(nullRef, mockOnInputChange, mockOnInputClick),
      );

      const mockTouchStartEvent = {
        stopPropagation: jest.fn(),
        target: mockInputElement,
      } as unknown as TouchEvent<HTMLInputElement>;

      const mockTouchEndEvent = {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
        target: mockInputElement,
      } as unknown as TouchEvent<HTMLInputElement>;

      result.current.handleTouchStart(mockTouchStartEvent);

      expect(() =>
        result.current.handleTouchEnd(mockTouchEndEvent),
      ).not.toThrow();
      expect(mockTouchEndEvent.stopPropagation).toHaveBeenCalled();
      expect(mockTouchEndEvent.preventDefault).toHaveBeenCalled();
      expect(mockOnInputClick).toHaveBeenCalled();
    });
  });

  describe('callback stability', () => {
    it('should return stable handlers when dependencies do not change', () => {
      const { rerender, result } = renderHook(() =>
        useInputHandlers(mockRef, mockOnInputChange, mockOnInputClick),
      );

      const firstHandlers = result.current;

      rerender();

      expect(result.current.handleInputChange).toBe(
        firstHandlers.handleInputChange,
      );
      expect(result.current.handleInputClick).toBe(
        firstHandlers.handleInputClick,
      );
      expect(result.current.handleTouchStart).toBe(
        firstHandlers.handleTouchStart,
      );
    });
  });
});
