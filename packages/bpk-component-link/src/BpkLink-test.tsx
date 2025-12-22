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

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import BpkLink, { themeAttributes } from './BpkLink';

describe('BpkLink', () => {
  describe('as anchor (default)', () => {
    it('should render correctly with a "href" attribute', () => {
      const { asFragment } = render(<BpkLink href="#">Link</BpkLink>);

      expect(asFragment()).toMatchSnapshot();
    });

    it('should render with a ref forwarded', () => {
      const myRef = createRef<HTMLAnchorElement>();

      render(
        <BpkLink ref={myRef} href="#">
          Link
        </BpkLink>,
      );

      expect(myRef.current).not.toBeNull();
      expect(myRef.current?.tagName).toBe('A');
    });

    it('should render correctly with a "className" attribute', () => {
      const { asFragment } = render(
        <BpkLink href="#" className="test-class">
          Link
        </BpkLink>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with a "blank" attribute', () => {
      const { asFragment } = render(
        <BpkLink href="#" blank>
          Link (new window)
        </BpkLink>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with a "rel" attribute', () => {
      const { asFragment } = render(
        <BpkLink href="#" blank rel="rel-attr">
          Link (new window)
        </BpkLink>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with "blank" and "rel" attributes', () => {
      const { asFragment } = render(
        <BpkLink href="#" blank rel="rel-overwrite">
          Link (new window)
        </BpkLink>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with a "alternate" attribute', () => {
      const { asFragment } = render(
        <BpkLink href="#" alternate>
          Link
        </BpkLink>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with arbitrary attributes', () => {
      const { asFragment } = render(
        <BpkLink href="#" id="test-id">
          Link
        </BpkLink>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with "implicit" attribute', () => {
      const { asFragment } = render(
        <BpkLink href="#" implicit>
          Link
        </BpkLink>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with both "implicit" and "alternate" attributes', () => {
      const { asFragment } = render(
        <BpkLink href="#" implicit alternate>
          Link
        </BpkLink>,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('as button', () => {
    it('should render as a button element', () => {
      render(
        <BpkLink as="button" onClick={() => {}}>
          Button Link
        </BpkLink>,
      );

      const button = screen.getByRole('button', { name: 'Button Link' });
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveClass('bpk-link');
    });

    it('should render with a ref forwarded to button', () => {
      const myRef = createRef<HTMLButtonElement>();

      render(
        <BpkLink as="button" ref={myRef} onClick={() => {}}>
          Button Link
        </BpkLink>,
      );

      expect(myRef.current).not.toBeNull();
      expect(myRef.current?.tagName).toBe('BUTTON');
    });

    it('should have type="button" by default', () => {
      render(
        <BpkLink as="button" onClick={() => {}}>
          Button Link
        </BpkLink>,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should allow overriding type attribute', () => {
      render(
        <BpkLink as="button" type="submit" onClick={() => {}}>
          Submit Button Link
        </BpkLink>,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('should apply custom className', () => {
      render(
        <BpkLink as="button" onClick={() => {}} className="test-class">
          Button Link
        </BpkLink>,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bpk-link', 'test-class');
    });

    it('should apply alternate class when alternate prop is true', () => {
      render(
        <BpkLink as="button" onClick={() => {}} alternate>
          Button Link
        </BpkLink>,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bpk-link', 'bpk-link--alternate');
    });

    it('should apply implicit class when implicit prop is true', () => {
      render(
        <BpkLink as="button" onClick={() => {}} implicit>
          Button Link
        </BpkLink>,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bpk-link', 'bpk-link--implicit');
    });

    it('should pass through arbitrary attributes', () => {
      render(
        <BpkLink as="button" onClick={() => {}} id="test-id" data-testid="custom">
          Button Link
        </BpkLink>,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('id', 'test-id');
      expect(button).toHaveAttribute('data-testid', 'custom');
    });

    it('should support disabled attribute', () => {
      render(
        <BpkLink as="button" onClick={() => {}} disabled>
          Disabled Button Link
        </BpkLink>,
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('as span', () => {
    it('should render as a span element', () => {
      render(<BpkLink as="span">Span Link</BpkLink>);

      const innerSpan = screen.getByText('Span Link');
      const outerSpan = innerSpan.parentElement;
      expect(outerSpan?.tagName).toBe('SPAN');
      expect(outerSpan).toHaveClass('bpk-link');
    });

    it('should render with a ref forwarded to span', () => {
      const myRef = createRef<HTMLSpanElement>();

      render(
        <BpkLink as="span" ref={myRef}>
          Span Link
        </BpkLink>,
      );

      expect(myRef.current).not.toBeNull();
      expect(myRef.current?.tagName).toBe('SPAN');
    });

    it('should apply custom className', () => {
      render(
        <BpkLink as="span" className="test-class">
          Span Link
        </BpkLink>,
      );

      const innerSpan = screen.getByText('Span Link');
      const outerSpan = innerSpan.parentElement;
      expect(outerSpan).toHaveClass('bpk-link', 'test-class');
    });

    it('should apply alternate class when alternate prop is true', () => {
      render(
        <BpkLink as="span" alternate>
          Span Link
        </BpkLink>,
      );

      const innerSpan = screen.getByText('Span Link');
      const outerSpan = innerSpan.parentElement;
      expect(outerSpan).toHaveClass('bpk-link', 'bpk-link--alternate');
    });

    it('should apply implicit class when implicit prop is true', () => {
      render(
        <BpkLink as="span" implicit>
          Span Link
        </BpkLink>,
      );

      const innerSpan = screen.getByText('Span Link');
      const outerSpan = innerSpan.parentElement;
      expect(outerSpan).toHaveClass('bpk-link', 'bpk-link--implicit');
    });
  });

  describe('as div', () => {
    it('should render as a div element', () => {
      render(<BpkLink as="div">Div Link</BpkLink>);

      const innerSpan = screen.getByText('Div Link');
      const outerDiv = innerSpan.parentElement;
      expect(outerDiv?.tagName).toBe('DIV');
      expect(outerDiv).toHaveClass('bpk-link');
    });

    it('should render with a ref forwarded to div', () => {
      const myRef = createRef<HTMLDivElement>();

      render(
        <BpkLink as="div" ref={myRef}>
          Div Link
        </BpkLink>,
      );

      expect(myRef.current).not.toBeNull();
      expect(myRef.current?.tagName).toBe('DIV');
    });

    it('should apply custom className', () => {
      render(
        <BpkLink as="div" className="test-class">
          Div Link
        </BpkLink>,
      );

      const innerSpan = screen.getByText('Div Link');
      const outerDiv = innerSpan.parentElement;
      expect(outerDiv).toHaveClass('bpk-link', 'test-class');
    });

    it('should apply alternate class when alternate prop is true', () => {
      render(
        <BpkLink as="div" alternate>
          Div Link
        </BpkLink>,
      );

      const innerSpan = screen.getByText('Div Link');
      const outerDiv = innerSpan.parentElement;
      expect(outerDiv).toHaveClass('bpk-link', 'bpk-link--alternate');
    });

    it('should apply implicit class when implicit prop is true', () => {
      render(
        <BpkLink as="div" implicit>
          Div Link
        </BpkLink>,
      );

      const innerSpan = screen.getByText('Div Link');
      const outerDiv = innerSpan.parentElement;
      expect(outerDiv).toHaveClass('bpk-link', 'bpk-link--implicit');
    });
  });

  describe('themeAttributes', () => {
    it('exports the expected themeAttributes', () => {
      expect(themeAttributes).toEqual([
        'linkColor',
        'linkHoverColor',
        'linkActiveColor',
        'linkVisitedColor',
      ]);
    });
  });
});
