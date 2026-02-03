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

import BpkNavigationBar, { BAR_STYLES } from './BpkNavigationBar';
import BpkNavigationIconButton from './BpkNavigationBarIconButton';

const Icon = (props: {[key: string]: any}) => <span {...props} />;

describe('BpkNavigationBar', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BpkNavigationBar id="test" title="test" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with custom class', () => {
    const { asFragment } = render(
      <BpkNavigationBar id="test" title="test" className="my-custom-class" />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with arbitrary props', () => {
    const { asFragment } = render(
      <BpkNavigationBar id="test" title="test" testid="arbitrary value" />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "leadingButton" attribute', () => {
    const { asFragment } = render(
      <BpkNavigationBar
        id="test"
        title="test"
        leadingButton={
          <BpkNavigationIconButton
            icon={Icon}
            label="test"
            onClick={() => {}}
          >
            Click Here
          </BpkNavigationIconButton>
        }
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "traillingButton" attribute', () => {
    const { asFragment } = render(
      <BpkNavigationBar
        id="test"
        title="test"
        trailingButton={
          <BpkNavigationIconButton
            icon={Icon}
            label="test"
            onClick={() => {}}
          >
            Click Here
          </BpkNavigationIconButton>
        }
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with an element for the title attribute', () => {
    const { asFragment } = render(
      <BpkNavigationBar
        id="test"
        title={<span>test</span>}
        trailingButton={
          <BpkNavigationIconButton
            icon={Icon}
            label="test"
            onClick={() => {}}
          >
            Click Here
          </BpkNavigationIconButton>
        }
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when sticky', () => {
    const { asFragment } = render(
      <BpkNavigationBar id="test" title="test" sticky />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with on-dark style', () => {
    const { asFragment } = render(
      <BpkNavigationBar id="test" title="test" barStyle={BAR_STYLES.onDark} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
