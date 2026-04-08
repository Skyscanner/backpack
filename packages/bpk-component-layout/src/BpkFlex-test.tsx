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

import { createRef } from 'react';

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { TEXT_COLORS } from '../../bpk-component-text';

import { BpkFlex } from './BpkFlex';
import { BpkProvider } from './BpkProvider';
import { BACKGROUND_COLORS } from './backgroundColors';
import { BpkSpacing } from './tokens';


describe('BpkFlex', () => {
  it('renders children content', () => {
    const { getByText } = render(
      <BpkProvider>
        <BpkFlex>Content</BpkFlex>
      </BpkProvider>,
    );
    expect(getByText('Content')).toBeInTheDocument();
  });

  it('accepts flex props: direction, justify, align, wrap, gap', () => {
    const { container } = render(
      <BpkProvider>
        <BpkFlex
          direction="column"
          justify="center"
          align="center"
          wrap="wrap"
          gap={BpkSpacing.MD}
        >
          Content
        </BpkFlex>
      </BpkProvider>,
    );
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle('flex-direction: column');
    expect(container.firstChild).toHaveStyle('justify-content: center');
    expect(container.firstChild).toHaveStyle('align-items: center');
    expect(container.firstChild).toHaveStyle('flex-wrap: wrap');
    expect(container.firstChild).toHaveStyle(`gap: .5rem`);
  });

  it('forwards ref to the underlying DOM element', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <BpkProvider>
        <BpkFlex ref={ref}>Content</BpkFlex>
      </BpkProvider>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes tabIndex to the DOM element', () => {
    const { container } = render(
      <BpkProvider>
        <BpkFlex tabIndex={0}>Content</BpkFlex>
      </BpkProvider>,
    );
    expect(container.firstChild).toHaveAttribute('tabindex', '0');
  });

  it('passes role to the DOM element', () => {
    const { container } = render(
      <BpkProvider>
        <BpkFlex role="list">Content</BpkFlex>
      </BpkProvider>,
    );
    expect(container.firstChild).toHaveAttribute('role', 'list');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <BpkProvider>
        <BpkFlex onClick={handleClick}>Clickable</BpkFlex>
      </BpkProvider>,
    );
    fireEvent.click(getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onKeyDown when a key is pressed', () => {
    const handleKeyDown = jest.fn();
    const { getByText } = render(
      <BpkProvider>
        <BpkFlex role="button" tabIndex={0} onKeyDown={handleKeyDown}>
          Interactive
        </BpkFlex>
      </BpkProvider>,
    );
    fireEvent.keyDown(getByText('Interactive'), { key: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it('renders when textStyle is provided', () => {
    const { getByText } = render(
      <BpkProvider>
        <BpkFlex textStyle="body-default">Content</BpkFlex>
      </BpkProvider>,
    );
    expect(getByText('Content')).toBeInTheDocument();
  });

  it('supports responsive direction', () => {
    const { container } = render(
      <BpkProvider>
        <BpkFlex direction={{ mobile: 'column', tablet: 'row' }}>
          Content
        </BpkFlex>
      </BpkProvider>,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies color class when color prop is set', () => {
    const { container } = render(
      <BpkProvider>
        <BpkFlex color={TEXT_COLORS.textPrimary}>Colored</BpkFlex>
      </BpkProvider>,
    );
    expect(container.querySelector('div')).toHaveClass('bpk-layout--text-primary');
  });

  it('applies backgroundColor class when backgroundColor prop is set', () => {
    const { container } = render(
      <BpkProvider>
        <BpkFlex backgroundColor={BACKGROUND_COLORS.surfaceDefault}>Surface</BpkFlex>
      </BpkProvider>,
    );
    expect(container.querySelector('div')).toHaveClass('bpk-layout--surface-default');
  });
});
