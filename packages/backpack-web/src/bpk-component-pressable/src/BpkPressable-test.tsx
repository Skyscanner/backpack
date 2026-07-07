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

import { fireEvent, render, screen } from '@testing-library/react';

import BpkPressable from './BpkPressable';

describe('BpkPressable — button mode (default)', () => {
  it('renders as a button element', () => {
    render(<BpkPressable>Click me</BpkPressable>);
    expect(screen.getByRole('button', { name: 'Click me' }).tagName).toBe('BUTTON');
  });

  it('has type="button" by default', () => {
    render(<BpkPressable>Submit</BpkPressable>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('accepts type="submit"', () => {
    render(<BpkPressable type="submit">Submit</BpkPressable>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('renders children', () => {
    render(<BpkPressable>Label</BpkPressable>);
    expect(screen.getByRole('button')).toHaveTextContent('Label');
  });

  it('passes disabled to the button', () => {
    render(<BpkPressable disabled>Disabled</BpkPressable>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('fires onClick when clicked', () => {
    const onClick = jest.fn();
    render(<BpkPressable onClick={onClick}>Click</BpkPressable>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', () => {
    const onClick = jest.fn();
    render(
      <BpkPressable disabled onClick={onClick}>
        Click
      </BpkPressable>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('sets data-backpack-ds-component attribute', () => {
    render(<BpkPressable>Press</BpkPressable>);
    expect(screen.getByRole('button')).toHaveAttribute(
      'data-backpack-ds-component',
      'Pressable',
    );
  });

  it('forwards additional props to the button element', () => {
    render(
      <BpkPressable aria-label="custom label" data-testid="my-pressable">
        Press
      </BpkPressable>,
    );
    const el = screen.getByTestId('my-pressable');
    expect(el).toHaveAttribute('aria-label', 'custom label');
  });

  it('applies bpk-pressable class', () => {
    render(<BpkPressable>Press</BpkPressable>);
    expect(screen.getByRole('button')).toHaveClass('bpk-pressable');
  });

  it('forwards ref to the button element', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    render(<BpkPressable ref={ref}>Press</BpkPressable>);
    expect(ref.current).not.toBeNull();
    expect((ref.current as HTMLElement).tagName).toBe('BUTTON');
  });
});

describe('BpkPressable — anchor mode (as="a")', () => {
  it('renders as an anchor element', () => {
    render(
      <BpkPressable as="a" href="/flights">
        Flights
      </BpkPressable>,
    );
    expect(screen.getByRole('link', { name: 'Flights' }).tagName).toBe('A');
  });

  it('sets the href attribute', () => {
    render(
      <BpkPressable as="a" href="/hotels">
        Hotels
      </BpkPressable>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', '/hotels');
  });

  it('renders children', () => {
    render(
      <BpkPressable as="a" href="#">
        Label
      </BpkPressable>,
    );
    expect(screen.getByRole('link')).toHaveTextContent('Label');
  });

  it('sets target="_blank" and rel="noopener noreferrer" when blank=true', () => {
    render(
      <BpkPressable as="a" href="/cars" blank>
        Cars
      </BpkPressable>,
    );
    const el = screen.getByRole('link');
    expect(el).toHaveAttribute('target', '_blank');
    expect(el).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('uses custom rel when provided with blank=true', () => {
    render(
      <BpkPressable as="a" href="/cars" blank rel="custom-rel">
        Cars
      </BpkPressable>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'custom-rel');
  });

  it('does not set target or rel when blank is false', () => {
    render(
      <BpkPressable as="a" href="/hotels">
        Hotels
      </BpkPressable>,
    );
    const el = screen.getByRole('link');
    expect(el).not.toHaveAttribute('target');
    expect(el).not.toHaveAttribute('rel');
  });

  it('sets data-backpack-ds-component attribute', () => {
    render(
      <BpkPressable as="a" href="#">
        Link
      </BpkPressable>,
    );
    expect(screen.getByRole('link')).toHaveAttribute(
      'data-backpack-ds-component',
      'Pressable',
    );
  });

  it('forwards additional props to the anchor element', () => {
    render(
      <BpkPressable as="a" href="#" data-testid="my-link" aria-label="go home">
        Home
      </BpkPressable>,
    );
    expect(screen.getByTestId('my-link')).toHaveAttribute('aria-label', 'go home');
  });

  it('applies bpk-pressable class', () => {
    render(
      <BpkPressable as="a" href="#">
        Link
      </BpkPressable>,
    );
    expect(screen.getByRole('link')).toHaveClass('bpk-pressable');
  });

  it('fires onClick when clicked', () => {
    const onClick = jest.fn();
    render(
      <BpkPressable as="a" href="#" onClick={onClick}>
        Click
      </BpkPressable>,
    );
    fireEvent.click(screen.getByRole('link'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('forwards ref to the anchor element', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    render(
      <BpkPressable as="a" href="#" ref={ref}>
        Link
      </BpkPressable>,
    );
    expect(ref.current).not.toBeNull();
    expect((ref.current as HTMLElement).tagName).toBe('A');
  });
});
