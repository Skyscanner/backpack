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

import React from 'react';
import { mount } from 'enzyme';
import { render } from '@testing-library/react';

import BpkConfigurableNudger from './BpkConfigurableNudger';
import BpkNudger from './BpkNudger';

describe('BpkNudger', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={2}
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render as an outline nudger correctly', () => {
    const { asFragment } = render(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={2}
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
        buttonType="outline"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render as a configurable nudger correctly', () => {
    const compareValues = (a, b) => {
      const options = ['economy', 'premium', 'business', 'first'];
      const [aIndex, bIndex] = [options.indexOf(a), options.indexOf(b)];
      return aIndex - bIndex;
    };

    const incrementValue = (currentValue) => {
      const options = ['economy', 'premium', 'business', 'first'];
      const [aIndex] = [options.indexOf(currentValue) + 1];
      return options[aIndex];
    };

    const decrementValue = (currentValue) => {
      const options = ['economy', 'premium', 'business', 'first'];
      const [aIndex] = [options.indexOf(currentValue) - 1];
      return options[aIndex];
    };

    const formatValue = (a) => a.toString();

    const { asFragment } = render(
      <BpkConfigurableNudger
        id="nudger"
        min="economy"
        max="first"
        value="premium"
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
        compareValues={compareValues}
        incrementValue={incrementValue}
        decrementValue={decrementValue}
        formatValue={formatValue}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const { asFragment } = render(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={2}
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
        className="my-nudger"
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
        onChange={() => null}
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
        onChange={() => null}
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
        onChange={() => null}
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
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should return a number up/down on change', () => {
    const onChangeSpy = jest.fn();
    const nudger = mount(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={3}
        onChange={onChangeSpy}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    );

    const minusButton = nudger.find('button').first();
    minusButton.simulate('click');
    expect(onChangeSpy).toHaveBeenCalledWith(2);

    const plusButton = nudger.find('button').last();
    plusButton.simulate('click');
    expect(onChangeSpy).toHaveBeenCalledWith(4);
  });
});
