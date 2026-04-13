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

import focusStore from './focusStore';

describe('focusStore', () => {
  let button: HTMLButtonElement;

  beforeEach(() => {
    button = document.createElement('button');
    button.textContent = 'Test';
    document.body.appendChild(button);
  });

  afterEach(() => {
    focusStore.clearStoredFocus();
    document.body.innerHTML = '';
  });

  it('should store and restore focus to the previously active element', () => {
    button.focus();
    expect(document.activeElement).toBe(button);

    focusStore.storeFocus();

    // Move focus elsewhere
    (document.activeElement as HTMLElement)?.blur();

    focusStore.restoreFocus();
    expect(document.activeElement).toBe(button);
  });

  it('should clear stored reference after restoreFocus', () => {
    button.focus();
    focusStore.storeFocus();
    focusStore.restoreFocus();

    // Second call should be a no-op
    (document.activeElement as HTMLElement)?.blur();
    focusStore.restoreFocus();
    expect(document.activeElement).not.toBe(button);
  });

  it('should handle restoreFocus when nothing was stored', () => {
    expect(() => focusStore.restoreFocus()).not.toThrow();
  });

  it('should handle restoreFocus when stored element has been removed from DOM', () => {
    button.focus();
    focusStore.storeFocus();

    document.body.removeChild(button);

    expect(() => focusStore.restoreFocus()).not.toThrow();
  });

  it('should clear stored focus with clearStoredFocus', () => {
    button.focus();
    focusStore.storeFocus();
    focusStore.clearStoredFocus();

    (document.activeElement as HTMLElement)?.blur();
    focusStore.restoreFocus();
    expect(document.activeElement).not.toBe(button);
  });

  it('should handle element without focus method gracefully', () => {
    // Simulate a non-HTMLElement activeElement
    const fakeElement = { nodeName: 'fake' } as unknown as Element;
    button.focus();
    focusStore.storeFocus();

    // Overwrite the stored element with a non-focusable object
    Object.defineProperty(document, 'activeElement', {
      value: fakeElement,
      writable: true,
      configurable: true,
    });
    focusStore.storeFocus();

    expect(() => focusStore.restoreFocus()).not.toThrow();
  });
});
