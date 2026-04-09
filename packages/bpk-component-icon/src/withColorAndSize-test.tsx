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

import { render } from '@testing-library/react';

import withColorAndSize from './withColorAndSize';

const MyIcon = (props: any) => <svg {...props} />;

describe('withColorAndSize', () => {
  it('should render correctly with no props', () => {
    const Icon = withColorAndSize(MyIcon);
    const { asFragment } = render(<Icon />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with color="primary"', () => {
    const Icon = withColorAndSize(MyIcon);
    const { asFragment } = render(<Icon color="primary" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with size="lg"', () => {
    const Icon = withColorAndSize(MyIcon);
    const { asFragment } = render(<Icon size="lg" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with both color and size', () => {
    const Icon = withColorAndSize(MyIcon);
    const { asFragment } = render(<Icon color="success" size="xl" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should merge with an existing className', () => {
    const Icon = withColorAndSize(MyIcon);
    const { asFragment } = render(
      <Icon color="error" className="custom-class" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should set a correct displayName', () => {
    const Icon = withColorAndSize(MyIcon);
    expect(Icon.displayName).toBe('withColorAndSize(MyIcon)');
  });
});
