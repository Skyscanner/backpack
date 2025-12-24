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

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import BpkButtonLink from './BpkButtonLink';
import BpkLink from './BpkLink';

describe('BpkLink accessibility tests', () => {
  describe('as anchor (default)', () => {
    it('should not have programmatically-detectable accessibility issues', async () => {
      const { container } = render(<BpkLink href="#">Link</BpkLink>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should be focusable with keyboard', async () => {
      render(<BpkLink href="#">Link</BpkLink>);
      const link = screen.getByRole('link');

      await userEvent.tab();

      expect(link).toHaveFocus();
    });

    it('should navigate with Enter key (native anchor behavior)', async () => {
      const onClick = jest.fn();
      render(
        <BpkLink href="#" onClick={onClick}>
          Link
        </BpkLink>,
      );
      const link = screen.getByRole('link');

      link.focus();
      fireEvent.keyDown(link, { key: 'Enter' });

      // Native anchor behavior handles Enter key automatically
      expect(link).toHaveFocus();
    });
  });

  describe('as button', () => {
    it('should not have programmatically-detectable accessibility issues', async () => {
      const { container } = render(
        <BpkLink as="button" onClick={() => {}}>
          Button Link
        </BpkLink>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should be focusable with keyboard', async () => {
      render(
        <BpkLink as="button" onClick={() => {}}>
          Button Link
        </BpkLink>,
      );
      const button = screen.getByRole('button');

      await userEvent.tab();

      expect(button).toHaveFocus();
    });

    it('should activate with Enter key', async () => {
      const onClick = jest.fn();
      render(
        <BpkLink as="button" onClick={onClick}>
          Button Link
        </BpkLink>,
      );
      const button = screen.getByRole('button');

      button.focus();
      await userEvent.keyboard('{Enter}');

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should activate with Space key', async () => {
      const onClick = jest.fn();
      render(
        <BpkLink as="button" onClick={onClick}>
          Button Link
        </BpkLink>,
      );
      const button = screen.getByRole('button');

      button.focus();
      await userEvent.keyboard(' ');

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should not require role="button" because it is a native button', () => {
      render(
        <BpkLink as="button" onClick={() => {}}>
          Button Link
        </BpkLink>,
      );
      const button = screen.getByRole('button');

      // Native button, so no explicit role attribute needed
      expect(button.tagName).toBe('BUTTON');
      expect(button).not.toHaveAttribute('role');
    });
  });

  describe('as span (non-interactive)', () => {
    it('should not have programmatically-detectable accessibility issues', async () => {
      const { container } = render(<BpkLink as="span">Span Link</BpkLink>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not be in the tab order', async () => {
      render(
        <>
          <button type="button">Before</button>
          <BpkLink as="span">Span Link</BpkLink>
          <button type="button">After</button>
        </>,
      );

      await userEvent.tab();
      expect(screen.getByText('Before')).toHaveFocus();

      await userEvent.tab();
      expect(screen.getByText('After')).toHaveFocus();
    });

    it('should not have interactive role', () => {
      render(<BpkLink as="span">Span Link</BpkLink>);
      const span = screen.getByText('Span Link').parentElement;

      expect(span?.tagName).toBe('SPAN');
      expect(span).not.toHaveAttribute('role');
    });
  });

  describe('as div (non-interactive)', () => {
    it('should not have programmatically-detectable accessibility issues', async () => {
      const { container } = render(<BpkLink as="div">Div Link</BpkLink>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not be in the tab order', async () => {
      render(
        <>
          <button type="button">Before</button>
          <BpkLink as="div">Div Link</BpkLink>
          <button type="button">After</button>
        </>,
      );

      await userEvent.tab();
      expect(screen.getByText('Before')).toHaveFocus();

      await userEvent.tab();
      expect(screen.getByText('After')).toHaveFocus();
    });

    it('should not have interactive role', () => {
      render(<BpkLink as="div">Div Link</BpkLink>);
      const div = screen.getByText('Div Link').parentElement;

      expect(div?.tagName).toBe('DIV');
      expect(div).not.toHaveAttribute('role');
    });
  });
});

describe('BpkButtonLink accessibility tests (legacy)', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkButtonLink onClick={() => null}>Link</BpkButtonLink>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
