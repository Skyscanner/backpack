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

/* @flow strict */

import React from 'react';
import { render } from '@testing-library/react';
import { withButtonAlignment } from 'bpk-component-icon';
import BaggageIcon from 'bpk-component-icon/sm/baggage';

import BpkLoadingButton, { ICON_POSITION } from './BpkLoadingButton';

describe('BpkLoadingButton', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkLoadingButton>My button</BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "href" attribute', () => {
    const { asFragment } = render(
      <BpkLoadingButton href="#">My button</BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "primaryOnDark" attribute', () => {
    const { asFragment } = render(
      <BpkLoadingButton primaryOnDark>My button</BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "primaryOnLight" attribute', () => {
    const { asFragment } = render(
      <BpkLoadingButton primaryOnLight>My button</BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "secondary" attribute', () => {
    const { asFragment } = render(
      <BpkLoadingButton secondary>My button</BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "secondaryOnDark" attribute', () => {
    const { asFragment } = render(
      <BpkLoadingButton secondaryOnDark>My button</BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "destructive" attribute', () => {
    const { asFragment } = render(
      <BpkLoadingButton destructive>My button</BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "link" attribute', () => {
    const { asFragment } = render(
      <BpkLoadingButton link>My button</BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "linkOnDark" attribute', () => {
    const { asFragment } = render(
      <BpkLoadingButton linkOnDark>My button</BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "featured" attribute', () => {
    const { asFragment } = render(
      <BpkLoadingButton featured>My button</BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "iconPosition=leading" attribute', () => {
    const { asFragment } = render(
      <BpkLoadingButton iconPosition={ICON_POSITION.LEADING} featured>
        My button
      </BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "iconOnly" attribute', () => {
    const { asFragment } = render(
      <BpkLoadingButton iconOnly>
        <span className="visually-hidden">Search</span>
      </BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "disabled" attribute', () => {
    const { asFragment } = render(
      <BpkLoadingButton disabled>My button</BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "loading" attribute', () => {
    const { asFragment } = render(
      <BpkLoadingButton loading>My button</BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "large" attribute', () => {
    const { asFragment } = render(
      <BpkLoadingButton large>My button</BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "large" and "secondary" attributes', () => {
    const { asFragment } = render(
      <BpkLoadingButton large secondary>
        My button
      </BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "large" and "secondaryOnDark" attributes', () => {
    const { asFragment } = render(
      <BpkLoadingButton large secondaryOnDark>
        My button
      </BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "large" and "primaryOnDark" attributes', () => {
    const { asFragment } = render(
      <BpkLoadingButton large primaryOnDark>
        My button
      </BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "large" and "primaryOnLight" attributes', () => {
    const { asFragment } = render(
      <BpkLoadingButton large primaryOnLight>
        My button
      </BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "large" and "destructive" attributes', () => {
    const { asFragment } = render(
      <BpkLoadingButton large destructive>
        My button
      </BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "large" and "link" attributes', () => {
    const { asFragment } = render(
      <BpkLoadingButton large link>
        My button
      </BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "large" and "linkOnDark" attributes', () => {
    const { asFragment } = render(
      <BpkLoadingButton large linkOnDark>
        My button
      </BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "large" and "featured" attributes', () => {
    const { asFragment } = render(
      <BpkLoadingButton large featured>
        My button
      </BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "large" and "iconOnly" attributes', () => {
    const { asFragment } = render(
      <BpkLoadingButton large iconOnly>
        <span className="visually-hidden">Search</span>
      </BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "large" and "disabled" attributes', () => {
    const { asFragment } = render(
      <BpkLoadingButton large disabled>
        My button
      </BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "large" and "loading" attributes', () => {
    const { asFragment } = render(
      <BpkLoadingButton large loading>
        My button
      </BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "icon" attribute', () => {
    const AlignedIcon = withButtonAlignment(BaggageIcon);
    const icon = <AlignedIcon />;
    const { asFragment } = render(
      <BpkLoadingButton icon={icon}>My button</BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "iconDisabled" attribute', () => {
    const AlignedIcon = withButtonAlignment(BaggageIcon);
    const icon = <AlignedIcon />;
    const { asFragment } = render(
      <BpkLoadingButton disabled iconDisabled={icon}>
        My button
      </BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "iconLoading" attribute', () => {
    const AlignedIcon = withButtonAlignment(BaggageIcon);
    const icon = <AlignedIcon />;
    const { asFragment } = render(
      <BpkLoadingButton loading iconLoading={icon}>
        My button
      </BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should respect the class names entered as a string', () => {
    const { asFragment } = render(
      <BpkLoadingButton
        large
        secondary
        className="custom-class-1 custom-class-2"
      >
        My button
      </BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should add only bpk specific classes if className prop is set to empty string', () => {
    const { asFragment } = render(
      <BpkLoadingButton large secondary className="">
        My button
      </BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
