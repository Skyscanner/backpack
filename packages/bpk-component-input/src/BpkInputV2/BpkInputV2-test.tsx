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

import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BpkInputV2 from './BpkInputV2';
import { INPUT_TYPES, CLEAR_BUTTON_MODES } from './common-types';

describe('BpkInputV2', () => {
  it('should render correctly with required props', () => {
    const { asFragment } = render(
      <BpkInputV2 id="test" name="test" value="" onChange={() => {}} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with value', () => {
    const { asFragment } = render(
      <BpkInputV2 id="test" name="test" value="My value" onChange={() => {}} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with placeholder', () => {
    const { asFragment } = render(
      <BpkInputV2
        id="test"
        name="test"
        value=""
        placeholder="Enter a country, city or airport"
        onChange={() => {}}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should accept text input', async () => {
    const user = userEvent.setup();
    render(
      <BpkInputV2 id="test" name="test" value="" onChange={() => {}} />,
    );
    const input = screen.getByRole('textbox');
    await user.type(input, 'Hello');
    expect(input).toBeInTheDocument();
  });

  it('should call onChange when typing', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <BpkInputV2 id="test" name="test" value="" onChange={onChange} />,
    );
    const input = screen.getByRole('textbox');
    await user.type(input, 'a');
    expect(onChange).toHaveBeenCalled();
  });

  it('should render correctly with all supported input types', () => {
    Object.values(INPUT_TYPES).forEach((type) => {
      const { asFragment } = render(
        <BpkInputV2
          id={`test-${type}`}
          name={`test-${type}`}
          value=""
          type={type}
          onChange={() => {}}
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  // Validation tests
  it('should render correctly with valid state', () => {
    const { asFragment } = render(
      <BpkInputV2 id="test" name="test" value="" valid onChange={() => {}} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with invalid state', () => {
    const { asFragment } = render(
      <BpkInputV2 id="test" name="test" value="" valid={false} onChange={() => {}} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should set aria-invalid when invalid', () => {
    render(
      <BpkInputV2 id="test" name="test" value="" valid={false} onChange={() => {}} />,
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  // Clear button tests
  it('should render clear button with whileEditing mode', () => {
    const { asFragment } = render(
      <BpkInputV2
        id="test"
        name="test"
        value="test value"
        clearButtonMode={CLEAR_BUTTON_MODES.whileEditing}
        clearButtonLabel="Clear"
        onClear={() => {}}
        onChange={() => {}}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render clear button with always mode', () => {
    const { asFragment } = render(
      <BpkInputV2
        id="test"
        name="test"
        value="test value"
        clearButtonMode={CLEAR_BUTTON_MODES.always}
        clearButtonLabel="Clear"
        onClear={() => {}}
        onChange={() => {}}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call onClear when clear button is clicked', async () => {
    const user = userEvent.setup();
    const onClear = jest.fn();
    const { container } = render(
      <BpkInputV2
        id="test"
        name="test"
        value="test value"
        clearButtonMode={CLEAR_BUTTON_MODES.always}
        clearButtonLabel="Clear"
        onClear={onClear}
        onChange={() => {}}
      />,
    );
    const clearButton = container.querySelector('button');
    expect(clearButton).toBeInTheDocument();
     
    await user.click(clearButton!);
    expect(onClear).toHaveBeenCalled();
  });

  // Large variant tests
  it('should render correctly with large prop', () => {
    const { asFragment } = render(
      <BpkInputV2 id="test" name="test" value="" large onChange={() => {}} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  // Docked layout tests
  it('should render correctly with docked prop', () => {
    const { asFragment } = render(
      <BpkInputV2 id="test" name="test" value="" docked onChange={() => {}} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with dockedFirst prop', () => {
    const { asFragment } = render(
      <BpkInputV2 id="test" name="test" value="" dockedFirst onChange={() => {}} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with dockedMiddle prop', () => {
    const { asFragment } = render(
      <BpkInputV2 id="test" name="test" value="" dockedMiddle onChange={() => {}} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with dockedLast prop', () => {
    const { asFragment } = render(
      <BpkInputV2 id="test" name="test" value="" dockedLast onChange={() => {}} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  // Disabled state tests
  it('should render correctly when disabled', () => {
    const { asFragment } = render(
      <BpkInputV2 id="test" name="test" value="" disabled onChange={() => {}} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not accept input when disabled', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <BpkInputV2 id="test" name="test" value="" disabled onChange={onChange} />,
    );
    const input = screen.getByRole('textbox');
    await user.type(input, 'test');
    // Disabled inputs should not trigger onChange
    expect(onChange).not.toHaveBeenCalled();
  });

  // Custom className tests
  it('should apply custom className to input', () => {
    const { container } = render(
      <BpkInputV2 id="test" name="test" value="" className="custom-class" onChange={() => {}} />,
    );
    const input = container.querySelector('.custom-class');
    expect(input).toBeInTheDocument();
  });

  it('should apply custom className to container when clearable', () => {
    const { container } = render(
      <BpkInputV2
        id="test"
        name="test"
        value="test"
        className="custom-class"
        clearButtonMode={CLEAR_BUTTON_MODES.always}
        clearButtonLabel="Clear"
        onClear={() => {}}
        onChange={() => {}}
      />,
    );
    const containerWithClass = container.querySelector('.custom-class');
    expect(containerWithClass).toBeInTheDocument();
  });

  // Ref tests
  it('should support inputRef callback', () => {
    const inputRefCallback = jest.fn();
    render(
      <BpkInputV2
        id="test"
        name="test"
        value=""
        inputRef={inputRefCallback}
        onChange={() => {}}
      />,
    );
    expect(inputRefCallback).toHaveBeenCalled();
  });
});
