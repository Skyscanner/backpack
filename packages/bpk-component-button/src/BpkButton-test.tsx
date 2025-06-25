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

import BpkButton from './BpkButton';

describe('BpkButton', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BpkButton>My button</BpkButton>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "href" attribute', () => {
    const { asFragment } = render(<BpkButton href="#">My button</BpkButton>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "secondary" attribute', () => {
    const { asFragment } = render(<BpkButton secondary>My button</BpkButton>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "destructive" attribute', () => {
    const { asFragment } = render(<BpkButton destructive>My button</BpkButton>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "disabled" attribute', () => {
    const { asFragment } = render(<BpkButton disabled>My button</BpkButton>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "large" attribute', () => {
    const { asFragment } = render(<BpkButton large>My button</BpkButton>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "link" attribute', () => {
    const { asFragment } = render(<BpkButton link>My button</BpkButton>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with an "iconOnly" attribute', () => {
    const { asFragment } = render(<BpkButton iconOnly>My button</BpkButton>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "large" and "secondary" attributes', () => {
    const { asFragment } = render(
      <BpkButton large secondary>
        My button
      </BpkButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should respect the class names entered as a string', () => {
    const { asFragment } = render(
      <BpkButton large secondary className="custom-class-1 custom-class-2">
        My button
      </BpkButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should add only bpk specific classes if className prop is set to empty string', () => {
    const { asFragment } = render(
      <BpkButton large secondary className="">
        My button
      </BpkButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "blank" attribute', () => {
    const { asFragment } = render(
      <BpkButton href="#" blank>
        My button
      </BpkButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "rel" attribute', () => {
    const { asFragment } = render(
      <BpkButton href="#" rel="rel-attr">
        My button
      </BpkButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "blank" and "rel" attributes', () => {
    const { asFragment } = render(
      <BpkButton href="#" blank rel="rel-overwrite">
        My button
      </BpkButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "disabled" and "href" attributes', () => {
    const { asFragment } = render(
      <BpkButton href="#" disabled>
        My button
      </BpkButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
