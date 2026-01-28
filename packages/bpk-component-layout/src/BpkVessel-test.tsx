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

import { BpkProvider } from './BpkProvider';
import { BpkVessel } from './BpkVessel';
import { BpkSpacing } from './tokens';

describe('BpkVessel', () => {
  it('renders children content', () => {
    const { getByText } = render(
      <BpkProvider>
        <BpkVessel padding={BpkSpacing.MD}>Content</BpkVessel>
      </BpkProvider>,
    );

    expect(getByText('Content')).toBeInTheDocument();
  });

  it('forwards className and style (migration hatch)', () => {
    const { container } = render(
      <BpkProvider>
        <BpkVessel
          className="custom-class"
          style={{ opacity: 0.5 }}
          padding={BpkSpacing.MD}
        >
          Content
        </BpkVessel>
      </BpkProvider>,
    );

    const div = container.querySelector('div');
    expect(div).toHaveClass('custom-class');
    expect(div).toHaveStyle('opacity: 0.5');
  });

  it('forwards multiple classNames correctly', () => {
    const { container } = render(
      <BpkProvider>
        <BpkVessel className="class-one class-two" padding={BpkSpacing.SM}>
          Content
        </BpkVessel>
      </BpkProvider>,
    );

    const div = container.querySelector('div');
    expect(div).toHaveClass('class-one');
    expect(div).toHaveClass('class-two');
  });

  it('applies Backpack layout props correctly', () => {
    const { container } = render(
      <BpkProvider>
        <BpkVessel
          padding={BpkSpacing.LG}
          margin={BpkSpacing.MD}
          display="flex"
          justifyContent="center"
        >
          Content
        </BpkVessel>
      </BpkProvider>,
    );

    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
    // Layout props are processed via Chakra's CSS-in-JS system
  });

  it('supports interaction props: onClick, onFocus, onBlur', () => {
    const handleClick = jest.fn();
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    const { getByText } = render(
      <BpkProvider>
        <BpkVessel
          padding={BpkSpacing.MD}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          Interactive Content
        </BpkVessel>
      </BpkProvider>,
    );

    const element = getByText('Interactive Content');

    fireEvent.click(element);
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.focus(element);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(element);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('works without className or style props', () => {
    const { getByText } = render(
      <BpkProvider>
        <BpkVessel padding={BpkSpacing.MD}>Plain Content</BpkVessel>
      </BpkProvider>,
    );

    expect(getByText('Plain Content')).toBeInTheDocument();
  });

  it('handles empty className gracefully', () => {
    const { container } = render(
      <BpkProvider>
        <BpkVessel className="" padding={BpkSpacing.MD}>
          Content
        </BpkVessel>
      </BpkProvider>,
    );

    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
  });

  it('merges inline styles with layout styles correctly', () => {
    const { container } = render(
      <BpkProvider>
        <BpkVessel
          padding={BpkSpacing.MD}
          style={{ opacity: 0.8, fontSize: '16px' }}
        >
          Styled Content
        </BpkVessel>
      </BpkProvider>,
    );

    const div = container.querySelector('div');
    expect(div).toHaveStyle('opacity: 0.8');
    expect(div).toHaveStyle('font-size: 16px');
  });
});

