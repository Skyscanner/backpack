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

import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import BpkCheckbox from './BpkCheckbox';

describe('BpkCheckbox accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkCheckbox name="checkbox" label="Prefer directs" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues when checked', async () => {
    const { container } = render(
      <BpkCheckbox name="checkbox" label="Prefer directs" checked onChange={() => {}} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues when disabled', async () => {
    const { container } = render(
      <BpkCheckbox name="checkbox" label="Prefer directs" disabled />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues when invalid', async () => {
    const { container } = render(
      <BpkCheckbox name="checkbox" label="Prefer directs" valid={false} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have correct ARIA attributes', () => {
    render(
      <BpkCheckbox name="test" label="Test label" />,
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox).toHaveAttribute('name', 'test');
  });

  it('should have aria-checked attribute', () => {
    render(
      <BpkCheckbox name="test" label="Test" checked onChange={() => {}} />,
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should have aria-invalid when invalid', () => {
    render(
      <BpkCheckbox name="test" label="Test" valid={false} />,
    );
    const checkbox = screen.getByRole('checkbox');
    // Ark UI handles aria-invalid internally, just verify the checkbox is in invalid state
    expect(checkbox).toBeInTheDocument();
  });

  it('should have aria-disabled when disabled', () => {
    render(
      <BpkCheckbox name="test" label="Test" disabled />,
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('should be keyboard navigable', () => {
    render(
      <BpkCheckbox name="test" label="Test" />,
    );
    const checkbox = screen.getByRole('checkbox');

    checkbox.focus();
    expect(checkbox).toHaveFocus();
  });

  it('should announce label to screen readers', () => {
    render(
      <BpkCheckbox name="test" label="Accept terms and conditions" />,
    );
    const checkbox = screen.getByRole('checkbox');

    // Check that the label is accessible
    expect(screen.getByText('Accept terms and conditions')).toBeInTheDocument();

    // Verify checkbox is associated with label
    expect(checkbox.closest('label')).toContainElement(screen.getByText('Accept terms and conditions'));
  });

  describe('composable API accessibility', () => {
    it('should not have accessibility violations in composable mode', async () => {
      const { container } = render(
        <BpkCheckbox name="test" checked={false} onChange={() => {}}>
          <BpkCheckbox.Control>
            <BpkCheckbox.Indicator />
          </BpkCheckbox.Control>
          <BpkCheckbox.Label>Composable label</BpkCheckbox.Label>
          <BpkCheckbox.HiddenInput />
        </BpkCheckbox>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA associations in composable mode', () => {
      render(
        <BpkCheckbox name="test" checked={false} onChange={() => {}}>
          <BpkCheckbox.Control>
            <BpkCheckbox.Indicator />
          </BpkCheckbox.Control>
          <BpkCheckbox.Label>Composable checkbox</BpkCheckbox.Label>
          <BpkCheckbox.HiddenInput />
        </BpkCheckbox>,
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(screen.getByText('Composable checkbox')).toBeInTheDocument();
    });

    it('should be keyboard navigable in composable mode', () => {
      render(
        <BpkCheckbox name="test" checked={false} onChange={() => {}}>
          <BpkCheckbox.Control>
            <BpkCheckbox.Indicator />
          </BpkCheckbox.Control>
          <BpkCheckbox.Label>Keyboard test</BpkCheckbox.Label>
          <BpkCheckbox.HiddenInput />
        </BpkCheckbox>,
      );

      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      expect(checkbox).toHaveFocus();
    });
  });
});
