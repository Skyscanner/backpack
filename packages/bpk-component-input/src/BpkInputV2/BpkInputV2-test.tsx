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

import BpkInputV2 from './index';

describe('BpkInputV2', () => {
  describe('User Story 1: Basic Flexible Composition', () => {
    it('should render with required props', () => {
      render(
        <BpkInputV2.Root>
          <BpkInputV2.Input id="test" name="test" value="test value" onChange={() => {}} />
        </BpkInputV2.Root>
      );

      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue('test value');
    });

    it('should render with startInputAdornment', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.InputAdornment>$</BpkInputV2.InputAdornment>
          <BpkInputV2.Input id="price" name="price" value="100" onChange={() => {}} />
        </BpkInputV2.Root>
      );

      const input = screen.getByRole('textbox');
      const adornment = screen.getByText('$');
      const adornmentWrapper = container.querySelector('.bpk-input-v2__adornment');

      expect(input).toBeInTheDocument();
      expect(adornment).toBeInTheDocument();
      expect(adornmentWrapper).toBeInTheDocument();
      expect(adornmentWrapper).toContainElement(adornment);
      expect(adornmentWrapper).toHaveClass('bpk-input-v2__adornment--start');
    });

    it('should render with endInputAdornment', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input id="weight" name="weight" value="75" onChange={() => {}} />
          <BpkInputV2.InputAdornment>kg</BpkInputV2.InputAdornment>
        </BpkInputV2.Root>
      );

      const input = screen.getByRole('textbox');
      const adornment = screen.getByText('kg');
      const adornmentWrapper = container.querySelector('.bpk-input-v2__adornment');

      expect(input).toBeInTheDocument();
      expect(adornment).toBeInTheDocument();
      expect(adornmentWrapper).toBeInTheDocument();
      expect(adornmentWrapper).toContainElement(adornment);
      expect(adornmentWrapper).toHaveClass('bpk-input-v2__adornment--end');
    });

    it('should render with both start and end InputAdornments', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.InputAdornment>$</BpkInputV2.InputAdornment>
          <BpkInputV2.Input id="amount" name="amount" value="100" onChange={() => {}} />
          <BpkInputV2.InputAdornment>USD</BpkInputV2.InputAdornment>
        </BpkInputV2.Root>
      );

      const input = screen.getByRole('textbox');
      const startAdornment = screen.getByText('$');
      const endAdornment = screen.getByText('USD');
      const adornmentWrappers = container.querySelectorAll('.bpk-input-v2__adornment');
      const startWrapper = container.querySelector('.bpk-input-v2__adornment--start');
      const endWrapper = container.querySelector('.bpk-input-v2__adornment--end');

      expect(input).toBeInTheDocument();
      expect(startAdornment).toBeInTheDocument();
      expect(endAdornment).toBeInTheDocument();
      expect(adornmentWrappers).toHaveLength(2);
      expect(startWrapper).toContainElement(startAdornment);
      expect(endWrapper).toContainElement(endAdornment);
    });

    it('should render InputAdornments as flex children', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.InputAdornment>$</BpkInputV2.InputAdornment>
          <BpkInputV2.Input id="price" name="price" value="100" onChange={() => {}} />
        </BpkInputV2.Root>
      );

      const adornment = screen.getByText('$');
      const inputContainer = container.querySelector('.bpk-input-v2__input-container');
      expect(inputContainer).toContainElement(adornment);
    });
  });

  describe('User Story 2: Flexbox Gap Control', () => {
    it('should render with default gap value (0)', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.InputAdornment>$</BpkInputV2.InputAdornment>
          <BpkInputV2.Input id="price" name="price" value="100" onChange={() => {}} />
        </BpkInputV2.Root>
      );

      const root = container.querySelector('.bpk-input-v2__root');
      expect(root).toHaveStyle({ '--bpk-input-gap': '0' });
    });

    it('should render with custom gap value', () => {
      const { container } = render(
        <BpkInputV2.Root gap="1rem">
          <BpkInputV2.InputAdornment>$</BpkInputV2.InputAdornment>
          <BpkInputV2.Input id="price" name="price" value="100" onChange={() => {}} />
        </BpkInputV2.Root>
      );

      const root = container.querySelector('.bpk-input-v2__root');
      expect(root).toHaveStyle({ '--bpk-input-gap': '1rem' });
    });

    it('should apply gap as flexbox gap (no text-indent)', () => {
      const { container } = render(
        <BpkInputV2.Root gap="0.5rem">
          <BpkInputV2.InputAdornment>$</BpkInputV2.InputAdornment>
          <BpkInputV2.Input id="price" name="price" value="100" onChange={() => {}} />
        </BpkInputV2.Root>
      );

      const inputContainer = container.querySelector('.bpk-input-v2__input-container');
      const input = screen.getByRole('textbox') as HTMLInputElement;

      // Container should have flexbox display and gap
      expect(inputContainer).toHaveClass('bpk-input-v2__input-container');

      // Input should NOT have text-indent or dynamic padding
      expect(input.style.textIndent).toBe('');
      expect(input.style.paddingLeft).toBe('');
      expect(input.style.paddingRight).toBe('');
    });

    it('should handle gap value of 0', () => {
      const { container } = render(
        <BpkInputV2.Root gap="0">
          <BpkInputV2.InputAdornment>$</BpkInputV2.InputAdornment>
          <BpkInputV2.Input id="price" name="price" value="100" onChange={() => {}} />
        </BpkInputV2.Root>
      );

      const root = container.querySelector('.bpk-input-v2__root');
      expect(root).toHaveStyle({ '--bpk-input-gap': '0' });
    });
  });

  describe('Props and className', () => {
    it('should apply custom className to Input', () => {
      render(
        <BpkInputV2.Root>
          <BpkInputV2.Input
            id="test"
            name="test"
            value=""
            onChange={() => {}}
            className="custom-class"
          />
        </BpkInputV2.Root>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
      expect(input).toHaveClass('bpk-input-v2__input');
    });

    it('should apply custom className to InputAdornment', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.InputAdornment className="custom-adornment">$</BpkInputV2.InputAdornment>
          <BpkInputV2.Input id="price" name="price" value="100" onChange={() => {}} />
        </BpkInputV2.Root>
      );

      const adornmentWrapper = container.querySelector('.bpk-input-v2__adornment');
      expect(adornmentWrapper).toHaveClass('custom-adornment');
      expect(adornmentWrapper).toHaveClass('bpk-input-v2__adornment');
    });

    it('should apply custom className to Root', () => {
      const { container } = render(
        <BpkInputV2.Root className="custom-root">
          <BpkInputV2.Input id="test" name="test" value="" onChange={() => {}} />
        </BpkInputV2.Root>
      );

      const root = container.querySelector('.bpk-input-v2__root');
      expect(root).toHaveClass('custom-root');
    });
  });

  describe('Validation states', () => {
    it('should apply valid class to container when valid is true', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input id="email" name="email" value="test@example.com" valid onChange={() => {}} />
        </BpkInputV2.Root>
      );

      const inputContainer = container.querySelector('.bpk-input-v2__input-container');
      const input = screen.getByRole('textbox');

      expect(inputContainer).toHaveClass('bpk-input-v2__input-container--valid');
      expect(input).not.toHaveClass('bpk-input-v2__input--valid');
    });

    it('should apply invalid class to container when valid is false', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input
            id="email"
            name="email"
            value="invalid"
            valid={false}
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      const inputContainer = container.querySelector('.bpk-input-v2__input-container');
      const input = screen.getByRole('textbox');

      expect(inputContainer).toHaveClass('bpk-input-v2__input-container--invalid');
      expect(input).not.toHaveClass('bpk-input-v2__input--invalid');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('should not apply validation classes to container when valid is null', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input id="test" name="test" value="" valid={null} onChange={() => {}} />
        </BpkInputV2.Root>
      );

      const inputContainer = container.querySelector('.bpk-input-v2__input-container');
      const input = screen.getByRole('textbox');

      expect(inputContainer).not.toHaveClass('bpk-input-v2__input-container--valid');
      expect(inputContainer).not.toHaveClass('bpk-input-v2__input-container--invalid');
      expect(input).not.toHaveClass('bpk-input-v2__input--valid');
      expect(input).not.toHaveClass('bpk-input-v2__input--invalid');
    });
  });

  describe('User Story 4: Valid/Invalid States with Icons', () => {
    it('should render valid icon when valid is true', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input id="email" name="email" value="test@example.com" valid onChange={() => {}} />
        </BpkInputV2.Root>
      );

      const inputContainer = container.querySelector('.bpk-input-v2__input-container');
      const validIcon = container.querySelector('[data-system="valid"]');

      expect(inputContainer).toHaveClass('bpk-input-v2__input-container--valid');
      expect(validIcon).toBeInTheDocument();
    });

    it('should render invalid icon when valid is false', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input
            id="email"
            name="email"
            value="invalid"
            valid={false}
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      const inputContainer = container.querySelector('.bpk-input-v2__input-container');
      const invalidIcon = container.querySelector('[data-system="invalid"]');

      expect(inputContainer).toHaveClass('bpk-input-v2__input-container--invalid');
      expect(invalidIcon).toBeInTheDocument();
    });

    it('should not render validation icon when valid is null', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input id="test" name="test" value="" valid={null} onChange={() => {}} />
        </BpkInputV2.Root>
      );

      const validIcon = container.querySelector('[data-system="valid"]');
      const invalidIcon = container.querySelector('[data-system="invalid"]');

      expect(validIcon).not.toBeInTheDocument();
      expect(invalidIcon).not.toBeInTheDocument();
    });

    it('should render validation icon with user endInputAdornment', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input
            id="email"
            name="email"
            value="test@example.com"
            valid
            onChange={() => {}}
          />
          <BpkInputV2.InputAdornment>@</BpkInputV2.InputAdornment>
        </BpkInputV2.Root>
      );

      const userAdornment = screen.getByText('@');
      const validIcon = container.querySelector('[data-system="valid"]');

      // Both should be present
      expect(userAdornment).toBeInTheDocument();
      expect(validIcon).toBeInTheDocument();
    });

    it('should render validation icon with user startInputAdornment', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.InputAdornment>$</BpkInputV2.InputAdornment>
          <BpkInputV2.Input
            id="price"
            name="price"
            value="100"
            valid
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      const userAdornment = screen.getByText('$');
      const validIcon = container.querySelector('[data-system="valid"]');

      expect(userAdornment).toBeInTheDocument();
      expect(validIcon).toBeInTheDocument();
    });
  });

  describe('User Story 5: Clearable Functionality', () => {
    it('should render clear button when clearButtonMode is "always" and has value', () => {
      const onClear = jest.fn();
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input
            id="search"
            name="search"
            value="test"
            clearButtonMode="always"
            clearButtonLabel="Clear"
            onClear={onClear}
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      const clearButton = container.querySelector('[data-system="clear"]');
      expect(clearButton).toBeInTheDocument();
    });

    it('should not render clear button when clearButtonMode is "never"', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input
            id="search"
            name="search"
            value="test"
            clearButtonMode="never"
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      const clearButton = container.querySelector('[data-system="clear"]');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('should not render clear button when value is empty', () => {
      const onClear = jest.fn();
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input
            id="search"
            name="search"
            value=""
            clearButtonMode="always"
            clearButtonLabel="Clear"
            onClear={onClear}
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      const clearButton = container.querySelector('[data-system="clear"]');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('should render clear button instead of validation icon when both are applicable (valid)', () => {
      const onClear = jest.fn();
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input
            id="email"
            name="email"
            value="test@example.com"
            valid
            clearButtonMode="always"
            clearButtonLabel="Clear"
            onClear={onClear}
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      const clearButton = container.querySelector('[data-system="clear"]');
      const validIcon = container.querySelector('[data-system="valid"]');

      // Clear button has higher priority - only it should be shown
      expect(clearButton).toBeInTheDocument();
      expect(validIcon).not.toBeInTheDocument();
    });

    it('should render clear button instead of validation icon when both are applicable (invalid)', () => {
      const onClear = jest.fn();
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input
            id="email"
            name="email"
            value="invalid"
            valid={false}
            clearButtonMode="always"
            clearButtonLabel="Clear"
            onClear={onClear}
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      const clearButton = container.querySelector('[data-system="clear"]');
      const invalidIcon = container.querySelector('[data-system="invalid"]');

      // Clear button has higher priority - only it should be shown
      expect(clearButton).toBeInTheDocument();
      expect(invalidIcon).not.toBeInTheDocument();
    });

    it('should render validation icon when clear button is not applicable', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input
            id="email"
            name="email"
            value="test@example.com"
            valid
            clearButtonMode="never"
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      const clearButton = container.querySelector('[data-system="clear"]');
      const validIcon = container.querySelector('[data-system="valid"]');

      expect(clearButton).not.toBeInTheDocument();
      expect(validIcon).toBeInTheDocument();
    });

    it('should render clear button with user InputAdornments', () => {
      const onClear = jest.fn();
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.InputAdornment>$</BpkInputV2.InputAdornment>
          <BpkInputV2.Input
            id="price"
            name="price"
            value="100"
            clearButtonMode="always"
            clearButtonLabel="Clear"
            onClear={onClear}
            onChange={() => {}}
          />
          <BpkInputV2.InputAdornment>USD</BpkInputV2.InputAdornment>
        </BpkInputV2.Root>
      );

      const clearButton = container.querySelector('[data-system="clear"]');
      const startAdornment = screen.getByText('$');
      const endAdornment = screen.getByText('USD');

      expect(clearButton).toBeInTheDocument();
      expect(startAdornment).toBeInTheDocument();
      expect(endAdornment).toBeInTheDocument();
    });
  });

  describe('Snapshots', () => {
    it('should match snapshot with default props', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input id="test" name="test" value="test" onChange={() => {}} />
        </BpkInputV2.Root>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with startInputAdornment', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.InputAdornment>$</BpkInputV2.InputAdornment>
          <BpkInputV2.Input id="price" name="price" value="100" onChange={() => {}} />
        </BpkInputV2.Root>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with endInputAdornment', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input id="weight" name="weight" value="75" onChange={() => {}} />
          <BpkInputV2.InputAdornment>kg</BpkInputV2.InputAdornment>
        </BpkInputV2.Root>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with both InputAdornments', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.InputAdornment>$</BpkInputV2.InputAdornment>
          <BpkInputV2.Input id="amount" name="amount" value="100" onChange={() => {}} />
          <BpkInputV2.InputAdornment>USD</BpkInputV2.InputAdornment>
        </BpkInputV2.Root>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with custom gap', () => {
      const { container } = render(
        <BpkInputV2.Root gap="1rem">
          <BpkInputV2.InputAdornment>📧</BpkInputV2.InputAdornment>
          <BpkInputV2.Input id="email" name="email" value="user@example.com" onChange={() => {}} />
        </BpkInputV2.Root>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with valid state', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input id="email" name="email" value="test@example.com" valid onChange={() => {}} />
        </BpkInputV2.Root>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with invalid state', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input
            id="email"
            name="email"
            value="invalid"
            valid={false}
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with valid state and endInputAdornment', () => {
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input
            id="email"
            name="email"
            value="test@example.com"
            valid
            onChange={() => {}}
          />
          <BpkInputV2.InputAdornment>@</BpkInputV2.InputAdornment>
        </BpkInputV2.Root>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with clearButtonMode "always"', () => {
      const onClear = jest.fn();
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input
            id="search"
            name="search"
            value="test"
            clearButtonMode="always"
            clearButtonLabel="Clear"
            onClear={onClear}
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with clearButtonMode and validation icon', () => {
      const onClear = jest.fn();
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.Input
            id="email"
            name="email"
            value="test@example.com"
            valid
            clearButtonMode="always"
            clearButtonLabel="Clear"
            onClear={onClear}
            onChange={() => {}}
          />
        </BpkInputV2.Root>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with clearButtonMode and InputAdornments', () => {
      const onClear = jest.fn();
      const { container } = render(
        <BpkInputV2.Root>
          <BpkInputV2.InputAdornment>$</BpkInputV2.InputAdornment>
          <BpkInputV2.Input
            id="price"
            name="price"
            value="100"
            clearButtonMode="always"
            clearButtonLabel="Clear"
            onClear={onClear}
            onChange={() => {}}
          />
          <BpkInputV2.InputAdornment>USD</BpkInputV2.InputAdornment>
        </BpkInputV2.Root>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
