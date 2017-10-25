/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import renderer from 'react-test-renderer';
import { withButtonAlignment } from 'bpk-component-icon';
import BaggageIcon from 'bpk-component-icon/sm/baggage';
import BpkLoadingButton from './BpkLoadingButton';


describe('BpkLoadingButton', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkLoadingButton>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "href" attribute', () => {
    const tree = renderer.create(<BpkLoadingButton href="#">My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "secondary" attribute', () => {
    const tree = renderer.create(<BpkLoadingButton secondary>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "destructive" attribute', () => {
    const tree = renderer.create(<BpkLoadingButton destructive>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "link" attribute', () => {
    const tree = renderer.create(<BpkLoadingButton link>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "featured" attribute', () => {
    const tree = renderer.create(<BpkLoadingButton featured>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "iconOnly" attribute', () => {
    const tree = renderer.create(
      <BpkLoadingButton iconOnly>
        <span className="visually-hidden">Search</span>
      </BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "selected" attribute', () => {
    const tree = renderer.create(<BpkLoadingButton selected>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "secondary selected" attributes', () => {
    const tree = renderer.create(<BpkLoadingButton secondary selected>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "destructive selected" attributes', () => {
    const tree = renderer.create(<BpkLoadingButton destructive selected>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "link selected" attributes', () => {
    const tree = renderer.create(<BpkLoadingButton link selected>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "disabled" attribute', () => {
    const tree = renderer.create(<BpkLoadingButton disabled>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "loading" attribute', () => {
    const tree = renderer.create(<BpkLoadingButton loading>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "large" attribute', () => {
    const tree = renderer.create(<BpkLoadingButton large>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "large" and "secondary" attributes', () => {
    const tree = renderer.create(<BpkLoadingButton large secondary>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "large" and "destructive" attributes', () => {
    const tree = renderer.create(<BpkLoadingButton large destructive>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "large" and "link" attributes', () => {
    const tree = renderer.create(<BpkLoadingButton large link>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "large" and "featured" attributes', () => {
    const tree = renderer.create(<BpkLoadingButton large featured>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "large" and "iconOnly" attributes', () => {
    const tree = renderer.create(
      <BpkLoadingButton large iconOnly>
        <span className="visually-hidden">Search</span>
      </BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "large" and "selected" attributes', () => {
    const tree = renderer.create(<BpkLoadingButton large selected>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "large" and "disabled" attributes', () => {
    const tree = renderer.create(<BpkLoadingButton large disabled>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "large" and "loading" attributes', () => {
    const tree = renderer.create(<BpkLoadingButton large loading>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "icon" attribute', () => {
    const AlignedIcon = withButtonAlignment(BaggageIcon);
    const icon = <AlignedIcon />;
    const tree = renderer.create(<BpkLoadingButton icon={icon}>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "iconSelected" attribute', () => {
    const AlignedIcon = withButtonAlignment(BaggageIcon);
    const icon = <AlignedIcon />;
    const tree = renderer.create(<BpkLoadingButton selected iconSelected={icon}>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "iconDisabled" attribute', () => {
    const AlignedIcon = withButtonAlignment(BaggageIcon);
    const icon = <AlignedIcon />;
    const tree = renderer.create(<BpkLoadingButton disabled iconDisabled={icon}>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "iconLoading" attribute', () => {
    const AlignedIcon = withButtonAlignment(BaggageIcon);
    const icon = <AlignedIcon />;
    const tree = renderer.create(<BpkLoadingButton loading iconLoading={icon}>My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should respect the class names entered as a string', () => {
    const tree = renderer.create(
      <BpkLoadingButton large secondary className="custom-class-1 custom-class-2">My button</BpkLoadingButton>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should add only bpk specific classes if className prop is set to empty string', () => {
    const tree = renderer.create(<BpkLoadingButton large secondary className="">My button</BpkLoadingButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
