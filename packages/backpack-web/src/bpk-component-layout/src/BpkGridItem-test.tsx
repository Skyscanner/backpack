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

import { TEXT_COLORS } from '../../bpk-component-text';

import { BpkGridItem } from './BpkGridItem';
import { BpkProvider } from './BpkProvider';
import { BACKGROUND_COLORS } from './backgroundColors';
import { BpkSpacing } from './tokens';


describe('BpkGridItem', () => {
  it('renders its children', () => {
    const { getByText } = render(
      <BpkProvider>
        <BpkGridItem>
          <span>Grid item</span>
        </BpkGridItem>
      </BpkProvider>,
    );

    expect(getByText('Grid item')).toBeInTheDocument();
  });

  it('accepts grid span props', () => {
    const { container } = render(
      <BpkProvider>
        <BpkGridItem colSpan={2} rowSpan={3}>
          Spanning item
        </BpkGridItem>
      </BpkProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle('grid-column: span 2/span 2');
    expect(container.firstChild).toHaveStyle('grid-row: span 3/span 3');
  });

  it('renders when textStyle is provided', () => {
    const { getByText } = render(
      <BpkProvider>
        <BpkGridItem textStyle="body-default">Item</BpkGridItem>
      </BpkProvider>,
    );
    expect(getByText('Item')).toBeInTheDocument();
  });

  it('supports Backpack spacing tokens', () => {
    const { container } = render(
      <BpkProvider>
        <BpkGridItem padding={BpkSpacing.MD}>Spacing item</BpkGridItem>
      </BpkProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('supports interactive props: tabIndex, role, onClick', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <BpkProvider>
        <BpkGridItem role="button" tabIndex={0} onClick={handleClick}>
          Clickable
        </BpkGridItem>
      </BpkProvider>,
    );
    const element = getByText('Clickable');
    expect(element).toHaveAttribute('role', 'button');
    expect(element).toHaveAttribute('tabindex', '0');
    fireEvent.click(element);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onKeyDown when a key is pressed', () => {
    const handleKeyDown = jest.fn();
    const { getByText } = render(
      <BpkProvider>
        <BpkGridItem role="button" tabIndex={0} onKeyDown={handleKeyDown}>
          Interactive
        </BpkGridItem>
      </BpkProvider>,
    );
    fireEvent.keyDown(getByText('Interactive'), { key: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it('applies color class when color prop is set', () => {
    const { container } = render(
      <BpkProvider>
        <BpkGridItem color={TEXT_COLORS.textSecondary}>Colored</BpkGridItem>
      </BpkProvider>,
    );
    expect(container.querySelector('div')).toHaveClass('bpk-layout--text-secondary');
  });

  it('applies backgroundColor class when backgroundColor prop is set', () => {
    const { container } = render(
      <BpkProvider>
        <BpkGridItem backgroundColor={BACKGROUND_COLORS.statusWarningFill}>Warning</BpkGridItem>
      </BpkProvider>,
    );
    expect(container.querySelector('div')).toHaveClass('bpk-layout--status-warning-fill');
  });
});
