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

import { fireEvent, render } from '@testing-library/react';

import BpkFloatingNotification from './BpkFloatingNotification';

import BpkIconHeart from '@backpack/bpk-component-icon/sm/heart';


const props = {
  text: 'Saved',
};

describe('BpkFloatingNotification', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BpkFloatingNotification {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support custom class names', () => {
    const { asFragment } = render(
      <BpkFloatingNotification className="custom-classname" {...props} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support arbitrary props', () => {
    const { asFragment } = render(
      <BpkFloatingNotification testid="123" {...props} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with icon prop', () => {
    const { asFragment } = render(
      <BpkFloatingNotification icon={BpkIconHeart} {...props} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with CTA text', () => {
    const { asFragment } = render(
      <BpkFloatingNotification ctaText="View" {...props} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should do function when button is pressed', () => {
    const onClick = jest.fn();
    render(
      <BpkFloatingNotification ctaText="View" onClick={onClick} {...props} />,
    );

    const cta = document.getElementsByTagName("button").item(0);
    expect(cta).toBeDefined();
    fireEvent.click(cta as HTMLButtonElement);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should do function when unmounted (exited)', () => {
    const onExit = jest.fn();
    render(<BpkFloatingNotification onExit={onExit} {...props} />);

    setTimeout(() => {
      expect(onExit).toHaveBeenCalledTimes(1);
    });
  });
});
