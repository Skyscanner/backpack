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

import BpkLink, { themeAttributes } from '../index';

describe('BpkLink', () => {
  describe('as anchor (default)', () => {
    it('should render as an anchor element with href', () => {
      render(<BpkLink href="#">Link</BpkLink>);

      const link = screen.getByRole('link', { name: 'Link' });
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '#');
      expect(link).toHaveClass('bpk-link');
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

    it('should apply custom className', () => {
      render(
        <BpkLink href="#" className="test-class">
          Link
        </BpkLink>,
      );

      const link = screen.getByRole('link');
      expect(link).toHaveClass('bpk-link', 'test-class');
    });

    it('should set target="_blank" and rel="noopener noreferrer" when blank is true', () => {
      render(
        <BpkLink href="#" blank>
          Link (new window)
        </BpkLink>,
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should use custom rel when provided with blank', () => {
      render(
        <BpkLink href="#" blank rel="custom-rel">
          Link (new window)
        </BpkLink>,
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'custom-rel');
    });

    it('should apply rel without blank', () => {
      render(
        <BpkLink href="#" rel="nofollow">
          Link
        </BpkLink>,
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('rel', 'nofollow');
      expect(link).not.toHaveAttribute('target');
    });

    it('should apply alternate class when alternate prop is true', () => {
      render(
        <BpkLink href="#" alternate>
          Link
        </BpkLink>,
      );

      const link = screen.getByRole('link');
      expect(link).toHaveClass('bpk-link', 'bpk-link--alternate');
    });

    it('should pass through arbitrary attributes', () => {
      render(
        <BpkLink href="#" id="test-id" data-testid="custom">
          Link
        </BpkLink>,
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('id', 'test-id');
      expect(link).toHaveAttribute('data-testid', 'custom');
    });

    it('should apply implicit class when implicit prop is true', () => {
      render(
        <BpkLink href="#" implicit>
          Link
        </BpkLink>,
      );

      const link = screen.getByRole('link');
      expect(link).toHaveClass('bpk-link', 'bpk-link--implicit');
    });

    it('should apply both implicit and alternate classes', () => {
      render(
        <BpkLink href="#" implicit alternate>
          Link
        </BpkLink>,
      );

      const link = screen.getByRole('link');
      expect(link).toHaveClass(
        'bpk-link',
        'bpk-link--implicit',
        'bpk-link--alternate',
      );
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
        <BpkLink
          as="button"
          onClick={() => {}}
          id="test-id"
          data-testid="custom"
        >
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
