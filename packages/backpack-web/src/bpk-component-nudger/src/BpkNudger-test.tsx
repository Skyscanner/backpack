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

import BpkNudger from './BpkNudger';

describe('BpkNudger', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={2}
        onValueChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render as an on dark nudger correctly', () => {
    const { asFragment } = render(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={2}
        onValueChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
        buttonType="secondaryOnDark"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a value = min', () => {
    const { asFragment } = render(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={1}
        onValueChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a value = max', () => {
    const { asFragment } = render(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={9}
        onValueChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a value < min', () => {
    const { asFragment } = render(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={0}
        onValueChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a value > max', () => {
    const { asFragment } = render(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={10}
        onValueChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should return a number up/down on change', async () => {
    const onChangeSpy = jest.fn();
    render(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={3}
        onValueChange={onChangeSpy}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    );

    const minusButton = screen.getByRole('button', { name: 'Decrease' });
    await userEvent.click(minusButton);
    expect(onChangeSpy).toHaveBeenCalledWith(2);

    const plusButton = screen.getByRole('button', { name: 'Increase' });
    await userEvent.click(plusButton);
    expect(onChangeSpy).toHaveBeenCalledWith(4);
  });

  it('should return a min on direct user input with a lower number', async () => {
    const onChangeSpy = jest.fn();
    render(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={3}
        onValueChange={onChangeSpy}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
        data-testid="myNudger"
      />,
    );

    const input = screen.getByTestId('myNudger') as HTMLInputElement;
    await userEvent.click(input);
    await userEvent.type(input, '{backspace}');
    await userEvent.type(input, '0');

    expect(onChangeSpy).toHaveBeenCalledWith(1);
    expect(input.value).toEqual('1');
  });

  it('should return a max on direct user input with a higher number', async () => {
    const user = userEvent.setup()
    const onChangeSpy = jest.fn();
    render(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={3}
        onValueChange={onChangeSpy}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
        data-testid="myNudger"
      />,
    );

    const input = screen.getByTestId('myNudger') as HTMLInputElement;
    await user.clear(input);
    await user.type(input, '88');

    expect(onChangeSpy).toHaveBeenCalledWith(9);
    expect(input.value).toEqual('9');
  });
  
  it('should return number that direct user input with', async () => {
    const user = userEvent.setup()
    const onChangeSpy = jest.fn();
    render(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={3}
        onValueChange={onChangeSpy}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
        data-testid="myNudger"
      />,
    );

    const input = screen.getByTestId('myNudger') as HTMLInputElement;
    await user.clear(input);
    await user.type(input, '7');

    expect(onChangeSpy).toHaveBeenCalledWith(7);
    expect(input.value).toEqual('7');
  });
});
