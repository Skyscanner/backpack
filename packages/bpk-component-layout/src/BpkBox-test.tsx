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

import { BpkBox } from './BpkBox';
import { BpkProvider } from './BpkProvider';
import { BACKGROUND_COLORS } from './backgroundColors';
import { BpkSpacing } from './tokens';


describe('BpkBox', () => {
  it('renders children content', () => {
    const { getByText } = render(
      <BpkProvider>
        <BpkBox padding={BpkSpacing.MD}>Content</BpkBox>
      </BpkProvider>,
    );

    expect(getByText('Content')).toBeInTheDocument();
  });

  it('ignores className prop to prevent style overrides', () => {
    const { container } = render(
      <BpkProvider>
        {/* @ts-expect-error className is intentionally not part of the public API */}
        <BpkBox className="custom-class" padding={BpkSpacing.MD}>
          Content
        </BpkBox>
      </BpkProvider>,
    );

    // Chakra renders a div as the Box root element
    const div = container.querySelector('div');
    expect(div).not.toHaveClass('custom-class');
  });

  it('applies layout props via Backpack tokens', () => {
    const { container } = render(
      <BpkProvider>
        <BpkBox padding={BpkSpacing.MD}>
          Token box
        </BpkBox>
      </BpkProvider>,
    );

    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
    // We don't assert exact styles because Chakra generates classes & vars,
    // but we at least assert that the element rendered successfully.
  });

  it('forwards ref to the underlying DOM element', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <BpkProvider>
        <BpkBox ref={ref}>Content</BpkBox>
      </BpkProvider>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes tabIndex to the DOM element', () => {
    const { container } = render(
      <BpkProvider>
        <BpkBox tabIndex={0}>Focusable</BpkBox>
      </BpkProvider>,
    );
    expect(container.querySelector('div')).toHaveAttribute('tabindex', '0');
  });

  it('passes role to the DOM element', () => {
    const { container } = render(
      <BpkProvider>
        <BpkBox role="region">Region</BpkBox>
      </BpkProvider>,
    );
    expect(container.querySelector('div')).toHaveAttribute('role', 'region');
  });

  it('renders when textStyle is provided', () => {
    const { getByText } = render(
      <BpkProvider>
        <BpkBox textStyle="body-default">Styled text</BpkBox>
      </BpkProvider>,
    );
    expect(getByText('Styled text')).toBeInTheDocument();
  });

  it('renders when textStyle is not provided', () => {
    const { getByText } = render(
      <BpkProvider>
        <BpkBox>No style</BpkBox>
      </BpkProvider>,
    );
    expect(getByText('No style')).toBeInTheDocument();
  });

  it('supports basic interaction props: onClick, onFocus, onBlur', () => {
    const handleClick = jest.fn();
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    const { getByText } = render(
      <BpkProvider>
        <BpkBox
          padding={BpkSpacing.MD}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          Clickable
        </BpkBox>
      </BpkProvider>,
    );

    const element = getByText('Clickable');

    fireEvent.focus(element);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.click(element);
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.blur(element);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('calls onKeyDown when a key is pressed', () => {
    const handleKeyDown = jest.fn();
    const { getByText } = render(
      <BpkProvider>
        <BpkBox role="button" tabIndex={0} onKeyDown={handleKeyDown}>
          Interactive
        </BpkBox>
      </BpkProvider>,
    );
    fireEvent.keyDown(getByText('Interactive'), { key: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it('applies color class when color prop is set', () => {
    const { container } = render(
      <BpkProvider>
        <BpkBox color={TEXT_COLORS.textPrimary}>Colored</BpkBox>
      </BpkProvider>,
    );
    expect(container.querySelector('div')).toHaveClass('bpk-layout--text-primary');
  });

  it('applies backgroundColor class for a surface color', () => {
    const { container } = render(
      <BpkProvider>
        <BpkBox backgroundColor={BACKGROUND_COLORS.surfaceDefault}>Surface</BpkBox>
      </BpkProvider>,
    );
    expect(container.querySelector('div')).toHaveClass('bpk-layout--surface-default');
  });

  it('applies backgroundColor class for a canvas color', () => {
    const { container } = render(
      <BpkProvider>
        <BpkBox backgroundColor={BACKGROUND_COLORS.canvas}>Canvas</BpkBox>
      </BpkProvider>,
    );
    expect(container.querySelector('div')).toHaveClass('bpk-layout--canvas');
  });

  it('applies backgroundColor class for a status fill color', () => {
    const { container } = render(
      <BpkProvider>
        <BpkBox backgroundColor={BACKGROUND_COLORS.statusSuccessFill}>Success</BpkBox>
      </BpkProvider>,
    );
    expect(container.querySelector('div')).toHaveClass('bpk-layout--status-success-fill');
  });

  it('applies both color and backgroundColor classes together', () => {
    const { container } = render(
      <BpkProvider>
        <BpkBox color={TEXT_COLORS.textOnDark} backgroundColor={BACKGROUND_COLORS.surfaceHero}>
          Both
        </BpkBox>
      </BpkProvider>,
    );
    const div = container.querySelector('div');
    expect(div).toHaveClass('bpk-layout--text-on-dark');
    expect(div).toHaveClass('bpk-layout--surface-hero');
  });

  describe('id prop', () => {
    it('forwards id to the DOM element', () => {
      const { container } = render(
        <BpkProvider>
          <BpkBox id="my-region">Content</BpkBox>
        </BpkProvider>,
      );
      expect(container.querySelector('#my-region')).toBeInTheDocument();
    });
  });

  describe('aria-* props', () => {
    it('forwards aria-label to the DOM element', () => {
      const { container } = render(
        <BpkProvider>
          <BpkBox role="region" aria-label="Main content">Content</BpkBox>
        </BpkProvider>,
      );
      expect(container.querySelector('div')).toHaveAttribute('aria-label', 'Main content');
    });

    it('forwards aria-labelledby to the DOM element', () => {
      const { container } = render(
        <BpkProvider>
          <BpkBox aria-labelledby="heading-id">Content</BpkBox>
        </BpkProvider>,
      );
      expect(container.querySelector('div')).toHaveAttribute('aria-labelledby', 'heading-id');
    });

    it('forwards aria-hidden to the DOM element', () => {
      const { container } = render(
        <BpkProvider>
          <BpkBox aria-hidden>Decorative</BpkBox>
        </BpkProvider>,
      );
      expect(container.querySelector('div')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('position prop', () => {
    it.each(['static', 'relative', 'absolute', 'fixed', 'sticky'] as const)(
      'renders with position="%s"',
      (positionValue) => {
        const { getByText } = render(
          <BpkProvider>
            <BpkBox position={positionValue}>Positioned</BpkBox>
          </BpkProvider>,
        );
        expect(getByText('Positioned')).toBeInTheDocument();
      },
    );

    it('renders with a responsive position object', () => {
      const { getByText } = render(
        <BpkProvider>
          <BpkBox position={{ base: 'relative', tablet: 'sticky' }}>
            Responsive position
          </BpkBox>
        </BpkProvider>,
      );
      expect(getByText('Responsive position')).toBeInTheDocument();
    });
  });

  describe('overflow prop', () => {
    it.each(['visible', 'hidden', 'scroll', 'auto', 'clip'] as const)(
      'renders with overflow="%s"',
      (overflowValue) => {
        const { getByText } = render(
          <BpkProvider>
            <BpkBox overflow={overflowValue}>Overflow content</BpkBox>
          </BpkProvider>,
        );
        expect(getByText('Overflow content')).toBeInTheDocument();
      },
    );

    it('renders with a responsive overflow object', () => {
      const { getByText } = render(
        <BpkProvider>
          <BpkBox overflow={{ base: 'hidden', tablet: 'auto' }}>
            Responsive overflow
          </BpkBox>
        </BpkProvider>,
      );
      expect(getByText('Responsive overflow')).toBeInTheDocument();
    });
  });

  describe('overflowX / overflowY props', () => {
    it.each(['visible', 'hidden', 'scroll', 'auto', 'clip'] as const)(
      'renders with overflowX="%s"',
      (value) => {
        const { getByText } = render(
          <BpkProvider>
            <BpkBox overflowX={value}>OverflowX content</BpkBox>
          </BpkProvider>,
        );
        expect(getByText('OverflowX content')).toBeInTheDocument();
      },
    );

    it.each(['visible', 'hidden', 'scroll', 'auto', 'clip'] as const)(
      'renders with overflowY="%s"',
      (value) => {
        const { getByText } = render(
          <BpkProvider>
            <BpkBox overflowY={value}>OverflowY content</BpkBox>
          </BpkProvider>,
        );
        expect(getByText('OverflowY content')).toBeInTheDocument();
      },
    );

    it('renders with overflowX and overflowY combined', () => {
      const { getByText } = render(
        <BpkProvider>
          <BpkBox overflowX="hidden" overflowY="auto">Combined overflow</BpkBox>
        </BpkProvider>,
      );
      expect(getByText('Combined overflow')).toBeInTheDocument();
    });

    it('renders with responsive overflowX', () => {
      const { getByText } = render(
        <BpkProvider>
          <BpkBox overflowX={{ base: 'hidden', tablet: 'auto' }}>
            Responsive overflowX
          </BpkBox>
        </BpkProvider>,
      );
      expect(getByText('Responsive overflowX')).toBeInTheDocument();
    });
  });

  describe('zIndex prop', () => {
    it('renders with a numeric zIndex', () => {
      const { getByText } = render(
        <BpkProvider>
          <BpkBox zIndex={10}>Z-index 10</BpkBox>
        </BpkProvider>,
      );
      expect(getByText('Z-index 10')).toBeInTheDocument();
    });

    it('renders with zIndex="auto"', () => {
      const { getByText } = render(
        <BpkProvider>
          <BpkBox zIndex="auto">Z-index auto</BpkBox>
        </BpkProvider>,
      );
      expect(getByText('Z-index auto')).toBeInTheDocument();
    });
  });
});
