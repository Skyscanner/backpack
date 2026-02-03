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
// @ts-nocheck

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BpkInput from './BpkInput';
import withOpenEvents from './withOpenEvents';

const Input = withOpenEvents(BpkInput);

describe('withOpenEvents', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <Input
        id="my-input"
        name="my-input"
        value="value"
        hasTouchSupport={false}
        onChange={() => null}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should attach different event handlers when touch is supported', () => {
    const { asFragment } = render(
      <Input
        id="my-input"
        name="my-input"
        value="value"
        hasTouchSupport
        onChange={() => null}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "className" prop', () => {
    const { asFragment } = render(
      <Input
        id="my-input"
        name="my-input"
        value="value"
        className="my-custom-class"
        onChange={() => null}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should open on click', async () => {
    const onOpen = jest.fn();
    render(
      <Input
        id="my-input"
        name="my-input"
        value="value"
        onOpen={onOpen}
        onChange={() => null}
      />,
    );

    expect(onOpen).not.toHaveBeenCalled();

    const input = screen.getByRole('textbox');
    await userEvent.click(input);

    expect(onOpen).toHaveBeenCalled();
  });

  it('should open on focus', () => {
    const onOpen = jest.fn();
    render(
      <Input
        id="my-input"
        name="my-input"
        value="value"
        onOpen={onOpen}
        onChange={() => null}
      />,
    );

    expect(onOpen).not.toHaveBeenCalled();

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    expect(onOpen).toHaveBeenCalled();
  });

  it('should open on touch', () => {
    const onOpen = jest.fn();
    render(
      <Input
        id="my-input"
        name="my-input"
        value="value"
        onOpen={onOpen}
        hasTouchSupport
        onChange={() => null}
      />,
    );

    expect(onOpen).not.toHaveBeenCalled();

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    fireEvent.touchEnd(input);
    expect(onOpen).toHaveBeenCalled();
  });

  it('should open on "Enter" key', () => {
    const onOpen = jest.fn();
    render(
      <Input
        id="my-input"
        name="my-input"
        value="value"
        onOpen={onOpen}
        onChange={() => null}
      />,
    );

    expect(onOpen).not.toHaveBeenCalled();

    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { keyCode: 13 });

    waitFor(() => expect(onOpen).toHaveBeenCalled());
  });

  it('should open on "Space" key', () => {
    const onOpen = jest.fn();
    render(
      <Input
        id="my-input"
        name="my-input"
        value="value"
        onOpen={onOpen}
        onChange={() => null}
      />,
    );

    expect(onOpen).not.toHaveBeenCalled();

    const input = screen.getByRole('textbox');
    fireEvent.keyUp(input, { keyCode: 32 });

    waitFor(() => expect(onOpen).toHaveBeenCalled());
  });
});
