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

import { render, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';

import { BpkBox } from './BpkBox';
import { BpkSpacing } from './tokens';

describe('BpkBox', () => {
  it('renders children content', () => {
    const { getByText } = render(
      <BpkBox padding={BpkSpacing.MD}>Content</BpkBox>,
    );

    expect(getByText('Content')).toBeInTheDocument();
  });

  it('ignores className prop to prevent style overrides', () => {
    const { container } = render(
      // @ts-expect-error className is intentionally not part of the public API
      <BpkBox className="custom-class" padding={BpkSpacing.MD}>
        Content
      </BpkBox>,
    );

    const div = container.querySelector('div');
    expect(div).not.toHaveClass('custom-class');
  });

  it('applies layout props via Backpack tokens', () => {
    const { container } = render(
      <BpkBox padding={BpkSpacing.MD}>
        Token box
      </BpkBox>,
    );

    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
  });

  it('supports basic interaction props: onClick, onFocus, onBlur', () => {
    const handleClick = jest.fn();
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    const { getByText } = render(
      <BpkBox
        padding={BpkSpacing.MD}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        Clickable
      </BpkBox>,
    );

    const element = getByText('Clickable');

    fireEvent.focus(element);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.click(element);
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.blur(element);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});
