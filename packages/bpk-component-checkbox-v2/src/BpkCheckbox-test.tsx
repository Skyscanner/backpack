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

import BpkCheckbox from '../index';

describe('BpkCheckbox.Root', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkCheckbox.Root name="test">
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Prefer directs</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with checked state', () => {
    const { asFragment } = render(
      <BpkCheckbox.Root name="test" checked onCheckedChange={() => {}}>
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Prefer directs</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with disabled attribute', () => {
    const { asFragment } = render(
      <BpkCheckbox.Root name="test" disabled>
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Prefer directs</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with white attribute', () => {
    const { asFragment } = render(
      <BpkCheckbox.Root name="test" white>
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Prefer directs</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with invalid attribute', () => {
    const { asFragment } = render(
      <BpkCheckbox.Root name="test" invalid>
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Prefer directs</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with required attribute', () => {
    const { asFragment } = render(
      <BpkCheckbox.Root name="test" required>
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Prefer directs</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with indeterminate state', () => {
    const { asFragment } = render(
      <BpkCheckbox.Root name="test" checked="indeterminate">
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Prefer directs</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render children', () => {
    render(
      <BpkCheckbox.Root name="test">
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Test Label</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should set data-backpack-ds-component attribute', () => {
    const { container } = render(
      <BpkCheckbox.Root name="test">
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Test</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    expect(
      container.querySelector('[data-backpack-ds-component="Checkbox"]'),
    ).toBeInTheDocument();
  });

  it('should apply white class', () => {
    const { container } = render(
      <BpkCheckbox.Root name="test" white>
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Test</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('white');
  });

  it('should apply disabled class', () => {
    const { container } = render(
      <BpkCheckbox.Root name="test" disabled>
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Test</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('disabled');
  });

  it('should render a hidden input for form submission', () => {
    const { container } = render(
      <BpkCheckbox.Root name="test">
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Test</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    expect(container.querySelector('input[type="checkbox"]')).toBeInTheDocument();
  });
});

describe('BpkCheckbox.Label', () => {
  it('should stop propagation when clicking a link inside label', () => {
    const onCheckedChange = jest.fn();
    render(
      <BpkCheckbox.Root name="test" onCheckedChange={onCheckedChange}>
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>
          Accept <a href="/terms">terms</a>
        </BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    const link = screen.getByText('terms');
    fireEvent.click(link);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});

describe('BpkCheckbox.Content', () => {
  it('should render children in a content slot', () => {
    render(
      <BpkCheckbox.Root name="test">
        <BpkCheckbox.Control />
        <BpkCheckbox.Content>
          <BpkCheckbox.Label>Marketing emails</BpkCheckbox.Label>
          <p>We will send you offers and updates.</p>
        </BpkCheckbox.Content>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    expect(screen.getByText('Marketing emails')).toBeInTheDocument();
    expect(
      screen.getByText('We will send you offers and updates.'),
    ).toBeInTheDocument();
  });

  it('should apply content class', () => {
    const { container } = render(
      <BpkCheckbox.Root name="test">
        <BpkCheckbox.Control />
        <BpkCheckbox.Content>
          <BpkCheckbox.Label>Test</BpkCheckbox.Label>
        </BpkCheckbox.Content>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    const contentDiv = container.querySelector('[class*="content"]');
    expect(contentDiv).toBeInTheDocument();
  });

  it('should accept custom className', () => {
    const { container } = render(
      <BpkCheckbox.Root name="test">
        <BpkCheckbox.Control />
        <BpkCheckbox.Content className="my-custom-class">
          <BpkCheckbox.Label>Test</BpkCheckbox.Label>
        </BpkCheckbox.Content>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>,
    );
    const contentDiv = container.querySelector('.my-custom-class');
    expect(contentDiv).toBeInTheDocument();
  });
});

describe('BpkCheckbox.Group', () => {
  it('should render multiple checkboxes', () => {
    render(
      <BpkCheckbox.Group name="group" defaultValue={['a']}>
        <BpkCheckbox.Root value="a">
          <BpkCheckbox.Control />
          <BpkCheckbox.Label>Option A</BpkCheckbox.Label>
          <BpkCheckbox.HiddenInput />
        </BpkCheckbox.Root>
        <BpkCheckbox.Root value="b">
          <BpkCheckbox.Control />
          <BpkCheckbox.Label>Option B</BpkCheckbox.Label>
          <BpkCheckbox.HiddenInput />
        </BpkCheckbox.Root>
      </BpkCheckbox.Group>,
    );
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });
});
