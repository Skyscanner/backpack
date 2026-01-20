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

import { render, fireEvent, screen } from '@testing-library/react';

import BpkSlider from './BpkSlider';

// Mock the ResizeObserver which 'react-slider' uses to handle slider resize programatically
window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

// Mock pointer capture APIs not available in jsdom (used by Radix slider)
Element.prototype.setPointerCapture = jest.fn();
Element.prototype.releasePointerCapture = jest.fn();

// Mock requestAnimationFrame for testing the Chrome workaround
const mockRequestAnimationFrame = jest.spyOn(window, 'requestAnimationFrame');
beforeEach(() => {
  mockRequestAnimationFrame.mockImplementation((cb) => {
    cb(0);
    return 0;
  });
});
afterEach(() => {
  mockRequestAnimationFrame.mockClear();
});

describe('BpkSlider', () => {
  const defaultProps = {
    min: 0,
    max: 100,
    value: 25,
    onChange: jest.fn(),
    onAfterChange: jest.fn(),
    ariaLabel: ['min', 'max'],
    ariaValuetext: ['0','80']
  }
  it('should render correctly', () => {
    const { asFragment } = render(<BpkSlider {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "step" attribute', () => {
    const { asFragment } = render(
      <BpkSlider {...defaultProps} step={10} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a range of values', () => {
    const { asFragment } = render(
      <BpkSlider {...defaultProps} value={[10, 90]} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a minimum distance between controls', () => {
    const { asFragment } = render(
      <BpkSlider {...defaultProps} value={[10, 90]} minDistance={20} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  describe('onAfterChange', () => {
    it('should add document pointer event listeners on pointerdown', () => {
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener');

      render(<BpkSlider {...defaultProps} />);
      const thumb = screen.getByRole('slider');

      // Listeners should not be added until pointerdown
      addEventListenerSpy.mockClear();

      fireEvent.pointerDown(thumb, { pointerId: 1 });

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'pointerup',
        expect.any(Function),
      );
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'pointercancel',
        expect.any(Function),
      );

      addEventListenerSpy.mockRestore();
    });

    it('should remove document pointer event listeners after pointerup', () => {
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

      render(<BpkSlider {...defaultProps} />);
      const thumb = screen.getByRole('slider');

      fireEvent.pointerDown(thumb, { pointerId: 1 });
      fireEvent.pointerUp(document, { pointerId: 1 });

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'pointerup',
        expect.any(Function),
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'pointercancel',
        expect.any(Function),
      );

      removeEventListenerSpy.mockRestore();
    });

    it('should fire onAfterChange on document pointerup after thumb pointerdown', () => {
      const onAfterChange = jest.fn();

      render(
        <BpkSlider {...defaultProps} onAfterChange={onAfterChange} />,
      );

      const thumb = screen.getByRole('slider');

      // Simulate pointerdown on thumb (starts dragging)
      fireEvent.pointerDown(thumb, { pointerId: 1 });

      // Simulate pointerup on document (Chrome workaround scenario)
      fireEvent.pointerUp(document, { pointerId: 1 });

      expect(onAfterChange).toHaveBeenCalledTimes(1);
    });

    it('should not fire onAfterChange on document pointerup without prior pointerdown', () => {
      const onAfterChange = jest.fn();

      render(
        <BpkSlider {...defaultProps} onAfterChange={onAfterChange} />,
      );

      // pointerup without prior pointerdown should not trigger callback
      fireEvent.pointerUp(document, { pointerId: 1 });

      expect(onAfterChange).not.toHaveBeenCalled();
    });

    it('should fire onAfterChange on document pointercancel after thumb pointerdown', () => {
      const onAfterChange = jest.fn();

      render(
        <BpkSlider {...defaultProps} onAfterChange={onAfterChange} />,
      );

      const thumb = screen.getByRole('slider');

      fireEvent.pointerDown(thumb, { pointerId: 1 });
      fireEvent.pointerCancel(document, { pointerId: 1 });

      expect(onAfterChange).toHaveBeenCalledTimes(1);
    });
  });
});
