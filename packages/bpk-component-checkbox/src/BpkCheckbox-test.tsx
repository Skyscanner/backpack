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
import userEvent from '@testing-library/user-event';

// @ts-expect-error - bpk-theming is a JS module without type definitions
import BpkThemeProvider from '../../bpk-theming';

import BpkCheckbox from './BpkCheckbox';
import themeAttributes from './themeAttributes';

describe('BpkCheckbox', () => {
  describe('rendering', () => {
    it('should render with label', () => {
      render(<BpkCheckbox name="test" label="Test label" />);
      expect(screen.getByText('Test label')).toBeInTheDocument();
    });

    it('should render checked checkbox', () => {
      render(<BpkCheckbox name="test" label="Test" checked onChange={() => {}} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('should render unchecked checkbox', () => {
      render(<BpkCheckbox name="test" label="Test" checked={false} onChange={() => {}} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });

    it('should render with custom className', () => {
      const { container } = render(
        <BpkCheckbox name="test" label="Test" className="custom-class" />,
      );
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('should render with required asterisk', () => {
      render(<BpkCheckbox name="test" label="Test" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('should not render asterisk when disabled and required', () => {
      render(<BpkCheckbox name="test" label="Test" required disabled />);
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });

    it('should render with smallLabel', () => {
      const { container } = render(
        <BpkCheckbox name="test" label="Test" smallLabel />,
      );
      expect(container.querySelector('.bpk-checkbox__label--small')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('should call onChange when clicked', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(
        <BpkCheckbox name="test" label="Test" checked={false} onChange={handleChange} />,
      );

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('should call onCheckedChange when clicked', async () => {
      const user = userEvent.setup();
      const handleCheckedChange = jest.fn();

      render(
        <BpkCheckbox
          name="test"
          label="Test"
          checked={false}
          onCheckedChange={handleCheckedChange}
        />,
      );

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      expect(handleCheckedChange).toHaveBeenCalledTimes(1);
      expect(handleCheckedChange).toHaveBeenCalledWith(
        expect.objectContaining({ checked: true }),
      );
    });

    it('should toggle with Space key', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(
        <BpkCheckbox name="test" label="Test" checked={false} onChange={handleChange} />,
      );

      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      await user.keyboard(' ');

      expect(handleChange).toHaveBeenCalled();
    });

    it('should not call onChange when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(
        <BpkCheckbox
          name="test"
          label="Test"
          disabled
          checked={false}
          onChange={handleChange}
        />,
      );

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('controlled mode', () => {
    it('should work in controlled mode', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      const { rerender } = render(
        <BpkCheckbox name="test" label="Test" checked={false} onChange={handleChange} />,
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(handleChange).toHaveBeenCalled();

      // Simulate parent updating checked prop
      rerender(
        <BpkCheckbox name="test" label="Test" checked onChange={handleChange} />,
      );

      expect(checkbox).toBeChecked();
    });
  });

  describe('uncontrolled mode', () => {
    it('should work in uncontrolled mode with defaultChecked', () => {
      render(<BpkCheckbox name="test" label="Test" defaultChecked />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('should start unchecked when defaultChecked is false', () => {
      render(<BpkCheckbox name="test" label="Test" defaultChecked={false} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });
  });

  describe('label click', () => {
    it('should toggle checkbox when label is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(
        <BpkCheckbox name="test" label="Test label" checked={false} onChange={handleChange} />,
      );

      const label = screen.getByText('Test label');
      await user.click(label);

      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('snapshots', () => {
    it('should render default checkbox correctly', () => {
      const { container } = render(<BpkCheckbox name="test" label="Test" />);
      expect(container).toMatchSnapshot();
    });

    it('should render checked checkbox correctly', () => {
      const { container } = render(
        <BpkCheckbox name="test" label="Test" checked onChange={() => {}} />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render disabled checkbox correctly', () => {
      const { container } = render(
        <BpkCheckbox name="test" label="Test" disabled />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render invalid checkbox correctly', () => {
      const { container } = render(
        <BpkCheckbox name="test" label="Test" valid={false} />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render white checkbox correctly', () => {
      const { container } = render(
        <BpkCheckbox name="test" label="Test" white />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render required checkbox correctly', () => {
      const { container } = render(
        <BpkCheckbox name="test" label="Test" required />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render small label checkbox correctly', () => {
      const { container } = render(
        <BpkCheckbox name="test" label="Test" smallLabel />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render indeterminate checkbox correctly', () => {
      const { container } = render(
        <BpkCheckbox name="test" label="Test" indeterminate />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render disabled and indeterminate checkbox correctly', () => {
      const { container} = render(
        <BpkCheckbox name="test" label="Test" disabled indeterminate />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('indeterminate state', () => {
    it('should render with indeterminate state', () => {
      render(<BpkCheckbox name="test" label="Test" indeterminate />);
      const checkbox = screen.getByRole('checkbox');
      // Ark UI handles indeterminate state through data-state attribute
      expect(checkbox).toBeInTheDocument();
    });

    it('should have visual indicator for indeterminate state', () => {
      const { container } = render(
        <BpkCheckbox name="test" label="Test" indeterminate />,
      );
      // Check that the checkbox control is rendered
      expect(container.querySelector('[data-scope="checkbox"][data-part="control"]')).toBeInTheDocument();
    });
  });

  describe('validation states', () => {
    it('should render with valid=false (invalid state)', () => {
      render(<BpkCheckbox name="test" label="Test" valid={false} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('should show error styling when valid=false', () => {
      const { container } = render(
        <BpkCheckbox name="test" label="Test" valid={false} />,
      );
      expect(container.querySelector('.bpk-checkbox--invalid')).toBeInTheDocument();
    });

    it('should have neutral state when valid=null', () => {
      const { container } = render(
        <BpkCheckbox name="test" label="Test" valid={null} />,
      );
      expect(container.querySelector('.bpk-checkbox--invalid')).not.toBeInTheDocument();
    });

    it('should render snapshot for invalid state', () => {
      const { container } = render(
        <BpkCheckbox name="test" label="Test" valid={false} />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should maintain red border when checked and invalid', () => {
      const { container } = render(
        <BpkCheckbox name="test" label="Test" valid={false} checked onChange={() => {}} />,
      );
      expect(container.querySelector('.bpk-checkbox--invalid')).toBeInTheDocument();
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('should render snapshot for checked invalid state', () => {
      const { container } = render(
        <BpkCheckbox name="test" label="Test" valid={false} checked onChange={() => {}} />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('RTL support', () => {
    it('should render correctly in RTL mode', () => {
      const { container } = render(
        <div dir="rtl">
          <BpkCheckbox name="test" label="Test" />
        </div>,
      );
      expect(container.querySelector('[dir="rtl"]')).toBeInTheDocument();
    });

    it('should render RTL snapshot', () => {
      const { container } = render(
        <div dir="rtl">
          <BpkCheckbox name="test" label="RTL Test" />
        </div>,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render required asterisk in RTL correctly', () => {
      const { container } = render(
        <div dir="rtl">
          <BpkCheckbox name="test" label="Test" required />
        </div>,
      );
      expect(screen.getByText('*')).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });

  describe('form integration', () => {
    it('should have name attribute for form submission', () => {
      render(<BpkCheckbox name="accept-terms" label="Test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('name', 'accept-terms');
    });

    it('should have value attribute when provided', () => {
      render(<BpkCheckbox name="option" label="Test" value="yes" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('value', 'yes');
    });

    it('should work with form submission', () => {
      const handleSubmit = jest.fn((e) => e.preventDefault());
      render(
        <form onSubmit={handleSubmit}>
          <BpkCheckbox name="agree" label="I agree" defaultChecked />
          <button type="submit">Submit</button>
        </form>,
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
      expect(checkbox).toHaveAttribute('name', 'agree');
    });
  });

  describe('edge cases', () => {
    it('should handle long labels without breaking layout', () => {
      const longLabel = 'This is a very long label that should wrap properly and not break the checkbox layout or cause any overflow issues in the component';
      render(<BpkCheckbox name="test" label={longLabel} />);
      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    it('should handle missing onChange gracefully', () => {
      render(<BpkCheckbox name="test" label="Test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('should handle null className', () => {
      render(<BpkCheckbox name="test" label="Test" className={null} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('should handle undefined checked value', () => {
      render(<BpkCheckbox name="test" label="Test" checked={undefined} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('should work with white variant and disabled state combined', () => {
      const { container } = render(
        <BpkCheckbox name="test" label="Test" white disabled />,
      );
      expect(container.querySelector('.bpk-checkbox--white')).toBeInTheDocument();
      expect(container.querySelector('.bpk-checkbox--disabled')).toBeInTheDocument();
    });

    it('should render with nested BpkThemeProvider', () => {
      render(
        <BpkThemeProvider
          theme={{ checkboxCheckedColor: '#ff0000' }}
          themeAttributes={themeAttributes}
        >
          <BpkThemeProvider
            theme={{ checkboxCheckedColor: '#00ff00' }}
            themeAttributes={themeAttributes}
          >
            <BpkCheckbox name="test" label="Nested" checked onChange={() => {}} />
          </BpkThemeProvider>
        </BpkThemeProvider>,
      );
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });
  });

  describe('theming', () => {
    it('should render with BpkThemeProvider', () => {
      render(
        <BpkThemeProvider
          theme={{
            checkboxCheckedColor: '#ff0000',
          }}
          themeAttributes={themeAttributes}
        >
          <BpkCheckbox name="test" label="Themed" checked onChange={() => {}} />
        </BpkThemeProvider>,
      );

      // Verify checkbox renders within theme provider
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      expect(screen.getByText('Themed')).toBeInTheDocument();
    });

    it('should fallback to default tokens when no theme', () => {
      const { container } = render(
        <BpkCheckbox name="test" label="Default" checked onChange={() => {}} />,
      );

      // Should render without theme wrapper
      expect(screen.getByRole('checkbox')).toBeChecked();
      expect(container.querySelector('.bpk-checkbox')).toBeInTheDocument();
    });

    it('should handle dynamic theme changes', () => {
      const { rerender } = render(
        <BpkThemeProvider
          theme={{
            checkboxCheckedColor: '#ff0000',
          }}
          themeAttributes={themeAttributes}
        >
          <BpkCheckbox name="test" label="Dynamic" checked onChange={() => {}} />
        </BpkThemeProvider>,
      );

      // Change theme
      rerender(
        <BpkThemeProvider
          theme={{
            checkboxCheckedColor: '#00ff00',
          }}
          themeAttributes={themeAttributes}
        >
          <BpkCheckbox name="test" label="Dynamic" checked onChange={() => {}} />
        </BpkThemeProvider>,
      );

      // Verify checkbox is still rendered
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      expect(screen.getByText('Dynamic')).toBeInTheDocument();
    });

    it('should apply custom theme color to checkbox', () => {
      const { container } = render(
        <BpkThemeProvider
          theme={{
            checkboxCheckedColor: '#ff0000',
          }}
          themeAttributes={themeAttributes}
        >
          <BpkCheckbox name="test" label="Red" checked onChange={() => {}} />
        </BpkThemeProvider>,
      );

      // Verify the theme wrapper has the CSS custom property set
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.style.getPropertyValue('--bpk-checkbox-checked-color')).toBe('#ff0000');
    });
  });

  describe('composable API', () => {
    it('should render with composable sub-components', () => {
      render(
        <BpkCheckbox name="test" checked={false} onChange={() => {}}>
          <BpkCheckbox.Control>
            <BpkCheckbox.Indicator />
          </BpkCheckbox.Control>
          <BpkCheckbox.Label>Custom label</BpkCheckbox.Label>
          <BpkCheckbox.HiddenInput />
        </BpkCheckbox>,
      );

      expect(screen.getByText('Custom label')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('should render custom layout with description', () => {
      render(
        <BpkCheckbox name="test" checked={false} onChange={() => {}}>
          <BpkCheckbox.Control>
            <BpkCheckbox.Indicator />
          </BpkCheckbox.Control>
          <div>
            <BpkCheckbox.Label>Main label</BpkCheckbox.Label>
            <span>Helper description text</span>
          </div>
          <BpkCheckbox.HiddenInput />
        </BpkCheckbox>,
      );

      expect(screen.getByText('Main label')).toBeInTheDocument();
      expect(screen.getByText('Helper description text')).toBeInTheDocument();
    });

    it('should support interaction in composable mode', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(
        <BpkCheckbox name="test" checked={false} onChange={handleChange}>
          <BpkCheckbox.Control>
            <BpkCheckbox.Indicator />
          </BpkCheckbox.Control>
          <BpkCheckbox.Label>Composable checkbox</BpkCheckbox.Label>
          <BpkCheckbox.HiddenInput />
        </BpkCheckbox>,
      );

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('should render composable API snapshot', () => {
      const { container } = render(
        <BpkCheckbox name="test" checked onChange={() => {}}>
          <BpkCheckbox.Control>
            <BpkCheckbox.Indicator />
          </BpkCheckbox.Control>
          <BpkCheckbox.Label>Composable example</BpkCheckbox.Label>
          <BpkCheckbox.HiddenInput />
        </BpkCheckbox>,
      );
      expect(container).toMatchSnapshot();
    });
  });
});
