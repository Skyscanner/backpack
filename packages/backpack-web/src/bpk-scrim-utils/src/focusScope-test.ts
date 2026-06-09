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

import focusScope from './focusScope';

/*
 * Note: jsdom's `tabbable` implementation cannot detect tabbable elements
 * because getComputedStyle always returns empty values. As a result, the
 * focus fallback (container itself) is always used. These tests validate
 * the scoping and teardown logic rather than tabbable element detection.
 */

describe('focusScope', () => {
  let container: HTMLDivElement;
  let outsideButton: HTMLButtonElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    outsideButton = document.createElement('button');
    outsideButton.textContent = 'Outside';
    document.body.appendChild(outsideButton);
  });

  afterEach(() => {
    focusScope.unscopeFocus();
    document.body.innerHTML = '';
  });

  it('should focus the scoped container on scopeFocus', () => {
    focusScope.scopeFocus(container);
    expect(document.activeElement).toBe(container);
  });

  it('should set tabindex on container when there are no tabbable descendants', () => {
    focusScope.scopeFocus(container);
    expect(container.getAttribute('tabindex')).toBe('-1');
  });

  it('should not override existing tabindex on container', () => {
    container.setAttribute('tabindex', '0');
    focusScope.scopeFocus(container);
    expect(container.getAttribute('tabindex')).toBe('0');
  });

  it('should recapture focus when focus moves outside the scoped element', () => {
    focusScope.scopeFocus(container);

    outsideButton.focus();
    outsideButton.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

    expect(document.activeElement).toBe(container);
  });

  it('should not recapture focus when focus stays inside the scoped element', () => {
    const innerButton = document.createElement('button');
    container.appendChild(innerButton);
    focusScope.scopeFocus(container);

    innerButton.focus();
    innerButton.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

    expect(document.activeElement).toBe(innerButton);
  });

  it('should stop capturing focus after unscopeFocus', () => {
    focusScope.scopeFocus(container);
    focusScope.unscopeFocus();

    outsideButton.focus();
    outsideButton.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

    expect(document.activeElement).toBe(outsideButton);
  });

  it('should replace previous scope when scopeFocus is called again', () => {
    const secondContainer = document.createElement('div');
    document.body.appendChild(secondContainer);

    focusScope.scopeFocus(container);
    focusScope.scopeFocus(secondContainer);

    expect(document.activeElement).toBe(secondContainer);

    outsideButton.focus();
    outsideButton.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

    expect(document.activeElement).toBe(secondContainer);
  });

  describe('pauseFocus / resumeFocus', () => {
    it('should stop capturing focus after pauseFocus', () => {
      focusScope.scopeFocus(container);
      focusScope.pauseFocus();

      outsideButton.focus();
      outsideButton.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

      expect(document.activeElement).toBe(outsideButton);
    });

    it('should resume capturing focus after resumeFocus, without stealing focus immediately', () => {
      focusScope.scopeFocus(container);
      focusScope.pauseFocus();

      // focus has moved outside while paused
      outsideButton.focus();
      outsideButton.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      expect(document.activeElement).toBe(outsideButton);

      // resume — does NOT immediately steal focus back
      focusScope.resumeFocus();
      expect(document.activeElement).toBe(outsideButton);

      // but a new focusin outside the container IS now intercepted
      outsideButton.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      expect(document.activeElement).toBe(container);
    });

    it('should be a no-op when pauseFocus is called with no active scope', () => {
      expect(() => focusScope.pauseFocus()).not.toThrow();
    });

    it('should be a no-op when resumeFocus is called with no previously scoped element', () => {
      expect(() => focusScope.resumeFocus()).not.toThrow();

      outsideButton.focus();
      outsideButton.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      // focus should not have been redirected
      expect(document.activeElement).toBe(outsideButton);
    });

    it('should not resume after unscopeFocus clears the paused element', () => {
      focusScope.scopeFocus(container);
      focusScope.pauseFocus();
      focusScope.unscopeFocus(); // permanent clear — discards pausedElement

      focusScope.resumeFocus(); // should be no-op

      outsideButton.focus();
      outsideButton.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      expect(document.activeElement).toBe(outsideButton);
    });
  });
});
