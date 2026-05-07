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

import { BpkProvider } from './BpkProvider';
import { BpkStack, BpkHStack, BpkVStack } from './BpkStack';
import { BACKGROUND_COLORS } from './backgroundColors';
import { BpkSpacing } from './tokens';


describe('BpkStack', () => {
  it('renders children content', () => {
    const { getByText } = render(
      <BpkProvider>
        <BpkStack gap={BpkSpacing.MD}>
          <div>Child 1</div>
          <div>Child 2</div>
        </BpkStack>
      </BpkProvider>,
    );

    expect(getByText('Child 1')).toBeInTheDocument();
    expect(getByText('Child 2')).toBeInTheDocument();
  });

  it('forwards ref to the underlying DOM element', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <BpkProvider>
        <BpkStack ref={ref} gap={BpkSpacing.MD}>
          <div>Child</div>
        </BpkStack>
      </BpkProvider>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes tabIndex to the DOM element', () => {
    const { container } = render(
      <BpkProvider>
        <BpkStack tabIndex={0} gap={BpkSpacing.MD}>
          <div>Child</div>
        </BpkStack>
      </BpkProvider>,
    );
    expect(container.firstChild).toHaveAttribute('tabindex', '0');
  });

  it('passes role to the DOM element', () => {
    const { container } = render(
      <BpkProvider>
        <BpkStack role="list" gap={BpkSpacing.MD}>
          <div>Child</div>
        </BpkStack>
      </BpkProvider>,
    );
    expect(container.firstChild).toHaveAttribute('role', 'list');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <BpkProvider>
        <BpkStack onClick={handleClick} gap={BpkSpacing.MD}>
          <div>Clickable</div>
        </BpkStack>
      </BpkProvider>,
    );
    fireEvent.click(getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onKeyDown when a key is pressed', () => {
    const handleKeyDown = jest.fn();
    const { getByText } = render(
      <BpkProvider>
        <BpkStack role="button" tabIndex={0} onKeyDown={handleKeyDown} gap={BpkSpacing.MD}>
          <div>Interactive</div>
        </BpkStack>
      </BpkProvider>,
    );
    fireEvent.keyDown(getByText('Interactive'), { key: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it('renders when textStyle is provided', () => {
    const { getByText } = render(
      <BpkProvider>
        <BpkStack textStyle="body-default" gap={BpkSpacing.MD}>
          <div>Child</div>
        </BpkStack>
      </BpkProvider>,
    );
    expect(getByText('Child')).toBeInTheDocument();
  });

  describe('BpkHStack', () => {
    it('defaults to row direction', () => {
      const { container } = render(
        <BpkProvider>
          <BpkHStack gap={BpkSpacing.MD}>
            <div>Child 1</div>
            <div>Child 2</div>
          </BpkHStack>
        </BpkProvider>,
      );

      // Chakra's HStack uses direction="row" and aligns items "center" by default
      const stack = container.firstChild;
      expect(stack).toHaveStyle('flex-direction: row');
      expect(stack).toHaveStyle('align-items: center');
    });
  });

  describe('BpkVStack', () => {
    it('defaults to column direction', () => {
      const { container } = render(
        <BpkProvider>
          <BpkVStack gap={BpkSpacing.MD}>
            <div>Child 1</div>
            <div>Child 2</div>
          </BpkVStack>
        </BpkProvider>,
      );

      // Chakra's VStack uses direction="column" and aligns items "center" by default
      const stack = container.firstChild;
      expect(stack).toHaveStyle('flex-direction: column');
      expect(stack).toHaveStyle('align-items: center');
    });
  });

  describe('BpkStack Props', () => {
    it('accepts valid gap tokens', () => {
      const { container } = render(
        <BpkProvider>
          <BpkStack gap={BpkSpacing.LG}>
            <div>Child 1</div>
          </BpkStack>
        </BpkProvider>,
      );

      // We can check if the style attribute or class reflects the gap.
      // Chakra usually applies 'gap' for Stack gap.
      // The exact value depends on the theme, but it should be present.
      const stack = container.firstChild;
      // bpk-gap-lg usually maps to 1.5rem (24px)
      expect(stack).toHaveStyle('gap: 1.5rem');
    });

    it('supports align and justify props', () => {
      const { container } = render(
        <BpkProvider>
          <BpkStack align="center" justify="space-between" gap={BpkSpacing.MD}>
            <div>Child 1</div>
          </BpkStack>
        </BpkProvider>,
      );

      const stack = container.firstChild;
      expect(stack).toHaveStyle('align-items: center');
      expect(stack).toHaveStyle('justify-content: space-between');
    });

    it('filters out invalid props (e.g. className)', () => {
      const { container } = render(
        <BpkProvider>
          {/* @ts-expect-error className is intentionally not part of the public API */}
          <BpkStack className="forbidden-class" gap={BpkSpacing.MD}>
            <div>Child</div>
          </BpkStack>
        </BpkProvider>,
      );

      const stack = container.firstChild;
      expect(stack).not.toHaveClass('forbidden-class');
    });
  });

  describe('color and backgroundColor', () => {
    it('applies color class to BpkStack', () => {
      const { container } = render(
        <BpkProvider>
          <BpkStack color={TEXT_COLORS.textPrimary}>Content</BpkStack>
        </BpkProvider>,
      );
      expect(container.querySelector('div')).toHaveClass('bpk-layout--text-primary');
    });

    it('applies backgroundColor class to BpkStack', () => {
      const { container } = render(
        <BpkProvider>
          <BpkStack backgroundColor={BACKGROUND_COLORS.surfaceElevated}>Content</BpkStack>
        </BpkProvider>,
      );
      expect(container.querySelector('div')).toHaveClass('bpk-layout--surface-elevated');
    });

    it('applies color class to BpkHStack', () => {
      const { container } = render(
        <BpkProvider>
          <BpkHStack color={TEXT_COLORS.textOnDark}>Content</BpkHStack>
        </BpkProvider>,
      );
      expect(container.querySelector('div')).toHaveClass('bpk-layout--text-on-dark');
    });

    it('applies backgroundColor class to BpkVStack', () => {
      const { container } = render(
        <BpkProvider>
          <BpkVStack backgroundColor={BACKGROUND_COLORS.statusDangerFill}>Content</BpkVStack>
        </BpkProvider>,
      );
      expect(container.querySelector('div')).toHaveClass('bpk-layout--status-danger-fill');
    });
  });
});
