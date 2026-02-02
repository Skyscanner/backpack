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

import { render } from '@testing-library/react';

import BpkVisuallyHidden from './BpkVisuallyHidden';

describe('BpkVisuallyHidden', () => {
  it('should render as a span by default', () => {
    const { container } = render(
      <BpkVisuallyHidden>Content</BpkVisuallyHidden>,
    );
    const element = container.firstChild as HTMLElement;

    expect(element.tagName.toLowerCase()).toBe('span');
    expect(element.textContent).toBe('Content');
    expect(element).toHaveClass('bpk-visually-hidden');
  });

  (
    [
      'div',
      'span',
      'p',
      'strong',
      'em',
      'small',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
    ] as const
  ).forEach((as) => {
    it(`should render as a ${as} element when as="${as}"`, () => {
      const { container } = render(
        <BpkVisuallyHidden as={as}>Content</BpkVisuallyHidden>,
      );
      const element = container.firstChild as HTMLElement;

      expect(element.tagName.toLowerCase()).toBe(as);
      expect(element.textContent).toBe('Content');
      expect(element).toHaveClass('bpk-visually-hidden');
    });
  });
});
