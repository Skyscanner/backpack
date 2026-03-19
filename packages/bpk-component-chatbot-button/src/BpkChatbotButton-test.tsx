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

import { act, render, screen, fireEvent } from '@testing-library/react';

import BpkChatbotButton from './BpkChatbotButton';

const mockOnClick = jest.fn();

describe('BpkChatbotButton', () => {
  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('should render correctly (collapsed by default)', () => {
    const { asFragment } = render(
      <BpkChatbotButton label="Chat with AI" onClick={mockOnClick} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when expanded', () => {
    const { asFragment } = render(
      <BpkChatbotButton label="Chat with AI" expanded onClick={mockOnClick} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when disabled', () => {
    const { asFragment } = render(
      <BpkChatbotButton label="Chat with AI" disabled onClick={mockOnClick} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a custom icon', () => {
    const { asFragment } = render(
      <BpkChatbotButton
        label="Chat with AI"
        icon={<span>icon</span>}
        onClick={mockOnClick}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should use aria-label when collapsed', () => {
    render(
      <BpkChatbotButton label="Chat with AI" onClick={mockOnClick} />,
    );
    const button = screen.getByTestId('bpk-chatbot-button');
    expect(button).toHaveAttribute('aria-label', 'Chat with AI');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('should not have aria-label when expanded (visible text provides accessible name)', () => {
    render(
      <BpkChatbotButton label="Chat with AI" expanded onClick={mockOnClick} />,
    );
    const button = screen.getByTestId('bpk-chatbot-button');
    expect(button).not.toHaveAttribute('aria-label');
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('should call onClick when clicked', () => {
    render(
      <BpkChatbotButton label="Chat with AI" onClick={mockOnClick} />,
    );
    fireEvent.click(screen.getByTestId('bpk-chatbot-button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', () => {
    render(
      <BpkChatbotButton label="Chat with AI" onClick={mockOnClick} disabled />,
    );
    fireEvent.click(screen.getByTestId('bpk-chatbot-button'));
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  describe('isAnimate behaviour', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest
        .spyOn(global, 'requestAnimationFrame')
        .mockImplementation((cb: FrameRequestCallback) => {
          cb(0);
          return 0;
        });
    });

    afterEach(() => {
      jest.useRealTimers();
      jest.restoreAllMocks();
    });

    it('should expand on the next animation frame when isAnimate becomes true', () => {
      const { rerender } = render(
        <BpkChatbotButton
          label="Chat with AI"
          isAnimate={false}
          onClick={mockOnClick}
        />,
      );
      const button = screen.getByTestId('bpk-chatbot-button');
      expect(button).toHaveAttribute('aria-expanded', 'false');

      act(() => {
        rerender(
          <BpkChatbotButton
            label="Chat with AI"
            isAnimate
            onClick={mockOnClick}
          />,
        );
      });

      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('should collapse after animationDuration when isAnimate is true', () => {
      act(() => {
        render(
          <BpkChatbotButton
            label="Chat with AI"
            isAnimate
            animationDuration={2000}
            onClick={mockOnClick}
          />,
        );
      });

      const button = screen.getByTestId('bpk-chatbot-button');
      expect(button).toHaveAttribute('aria-expanded', 'true');

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('should collapse immediately when isAnimate toggles to false', () => {
      const { rerender } = render(
        <BpkChatbotButton
          label="Chat with AI"
          isAnimate
          animationDuration={2000}
          onClick={mockOnClick}
        />,
      );
      const button = screen.getByTestId('bpk-chatbot-button');
      expect(button).toHaveAttribute('aria-expanded', 'true');

      act(() => {
        rerender(
          <BpkChatbotButton
            label="Chat with AI"
            isAnimate={false}
            animationDuration={2000}
            onClick={mockOnClick}
          />,
        );
      });

      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('should reset to collapsed when page becomes visible after being hidden', () => {
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        get: () => 'visible',
      });

      render(
        <BpkChatbotButton label="Chat with AI" isAnimate onClick={mockOnClick} />,
      );
      const button = screen.getByTestId('bpk-chatbot-button');
      expect(button).toHaveAttribute('aria-expanded', 'true');

      // Simulate tab hidden then visible
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        get: () => 'hidden',
      });
      act(() => {
        document.dispatchEvent(new Event('visibilitychange'));
      });

      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        get: () => 'visible',
      });
      act(() => {
        document.dispatchEvent(new Event('visibilitychange'));
      });

      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('should prevent event bubbling on click', () => {
    const parentClick = jest.fn();
    const { container } = render(
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div onClick={parentClick}>
        <BpkChatbotButton label="Chat with AI" onClick={mockOnClick} />
      </div>,
    );
    const button = container.querySelector('[data-testid="bpk-chatbot-button"]');
    if (button) {
      fireEvent.click(button);
    }
    expect(mockOnClick).toHaveBeenCalled();
    expect(parentClick).not.toHaveBeenCalled();
  });
});
