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

import { withButtonAlignment } from '../../bpk-component-icon';
import BaggageIcon from '../../bpk-component-icon/sm/baggage';
import BpkVisuallyHidden from '../../bpk-component-visually-hidden';

import BpkLoadingButton, { ICON_POSITION } from './BpkLoadingButton';

const error = jest.spyOn(console, 'error').mockImplementation(() => {});

describe('BpkLoadingButton', () => {
  beforeEach(() => {
    error.mockReset();
  });
  it('should render correctly', () => {
    const { container } = render(
      <BpkLoadingButton>My button</BpkLoadingButton>,
    );
    expect(container.querySelector('button')).toBeInTheDocument();
    expect(screen.getByText('My button')).toBeInTheDocument();
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with a "href" attribute', () => {
    const { container } = render(
      <BpkLoadingButton href="#">My button</BpkLoadingButton>,
    );
    expect(container.querySelector('a')).toBeInTheDocument();
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with a "primaryOnDark" attribute', () => {
    const { container } = render(
      <BpkLoadingButton primaryOnDark>My button</BpkLoadingButton>,
    );
    expect(
      container.querySelectorAll('.bpk-button--primary-on-dark').length,
    ).toBe(1);
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with a "primaryOnLight" attribute', () => {
    const { container } = render(
      <BpkLoadingButton primaryOnLight>My button</BpkLoadingButton>,
    );
    expect(
      container.querySelectorAll('.bpk-button--primary-on-light').length,
    ).toBe(1);
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with a "secondary" attribute', () => {
    const { container } = render(
      <BpkLoadingButton secondary>My button</BpkLoadingButton>,
    );
    expect(container.querySelectorAll('.bpk-button--secondary').length).toBe(1);
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with a "secondaryOnDark" attribute', () => {
    const { container } = render(
      <BpkLoadingButton secondaryOnDark>My button</BpkLoadingButton>,
    );
    expect(
      container.querySelectorAll('.bpk-button--secondary-on-dark').length,
    ).toBe(1);
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with a "destructive" attribute', () => {
    const { container } = render(
      <BpkLoadingButton destructive>My button</BpkLoadingButton>,
    );
    expect(container.querySelectorAll('.bpk-button--destructive').length).toBe(
      1,
    );
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with a "link" attribute', () => {
    const { container } = render(
      <BpkLoadingButton link>My button</BpkLoadingButton>,
    );
    expect(container.querySelectorAll('.bpk-button--link').length).toBe(1);
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with a "linkOnDark" attribute', () => {
    const { container } = render(
      <BpkLoadingButton linkOnDark>My button</BpkLoadingButton>,
    );
    expect(container.querySelectorAll('.bpk-button--link-on-dark').length).toBe(
      1,
    );
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with a "featured" attribute', () => {
    const { container } = render(
      <BpkLoadingButton featured>My button</BpkLoadingButton>,
    );
    expect(container.querySelectorAll('.bpk-button--featured').length).toBe(1);
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with a "iconPosition=leading" attribute', () => {
    const { asFragment } = render(
      <BpkLoadingButton iconPosition={ICON_POSITION.LEADING} featured>
        My button
      </BpkLoadingButton>,
    );

    expect(asFragment()).toMatchSnapshot();
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with a "iconOnly" attribute', () => {
    const { container } = render(
      <BpkLoadingButton iconOnly>
        <BpkVisuallyHidden>Search</BpkVisuallyHidden>
      </BpkLoadingButton>,
    );
    expect(container.querySelectorAll('.bpk-button--icon-only').length).toBe(1);
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with a "disabled" attribute', () => {
    const { asFragment } = render(
      <BpkLoadingButton disabled>My button</BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with a "loading" attribute', () => {
    const { container } = render(
      <BpkLoadingButton loading>My button</BpkLoadingButton>,
    );
    expect(container.querySelectorAll('.bpk-loading-button__icon').length).toBe(
      1,
    );
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with a "large" attribute', () => {
    const { container } = render(
      <BpkLoadingButton large>My button</BpkLoadingButton>,
    );
    expect(container.querySelectorAll('.bpk-button--large').length).toBe(1);
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with "large" and "secondary" attributes', () => {
    const { container } = render(
      <BpkLoadingButton large secondary>
        My button
      </BpkLoadingButton>,
    );
    expect(container.querySelectorAll('.bpk-button--large').length).toBe(1);
    expect(container.querySelectorAll('.bpk-button--secondary').length).toBe(1);
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with "large" and "secondaryOnDark" attributes', () => {
    const { container } = render(
      <BpkLoadingButton large secondaryOnDark>
        My button
      </BpkLoadingButton>,
    );
    expect(container.querySelectorAll('.bpk-button--large').length).toBe(1);
    expect(
      container.querySelectorAll('.bpk-button--secondary-on-dark').length,
    ).toBe(1);
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with "large" and "primaryOnDark" attributes', () => {
    const { container } = render(
      <BpkLoadingButton large primaryOnDark>
        My button
      </BpkLoadingButton>,
    );
    expect(container.querySelectorAll('.bpk-button--large').length).toBe(1);
    expect(
      container.querySelectorAll('.bpk-button--primary-on-dark').length,
    ).toBe(1);
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with "large" and "primaryOnLight" attributes', () => {
    const { container } = render(
      <BpkLoadingButton large primaryOnLight>
        My button
      </BpkLoadingButton>,
    );
    expect(container.querySelectorAll('.bpk-button--large').length).toBe(1);
    expect(
      container.querySelectorAll('.bpk-button--primary-on-light').length,
    ).toBe(1);
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with "large" and "destructive" attributes', () => {
    const { container } = render(
      <BpkLoadingButton large destructive>
        My button
      </BpkLoadingButton>,
    );
    expect(container.querySelectorAll('.bpk-button--large').length).toBe(1);
    expect(container.querySelectorAll('.bpk-button--destructive').length).toBe(
      1,
    );
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with "large" and "link" attributes', () => {
    const { container } = render(
      <BpkLoadingButton large link>
        My button
      </BpkLoadingButton>,
    );
    expect(container.querySelectorAll('.bpk-button--large').length).toBe(1);
    expect(container.querySelectorAll('.bpk-button--link').length).toBe(1);
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with "large" and "linkOnDark" attributes', () => {
    const { container } = render(
      <BpkLoadingButton large linkOnDark>
        My button
      </BpkLoadingButton>,
    );
    expect(container.querySelectorAll('.bpk-button--large').length).toBe(1);
    expect(container.querySelectorAll('.bpk-button--link-on-dark').length).toBe(
      1,
    );
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with "large" and "featured" attributes', () => {
    const { container } = render(
      <BpkLoadingButton large featured>
        My button
      </BpkLoadingButton>,
    );
    expect(container.querySelectorAll('.bpk-button--large').length).toBe(1);
    expect(container.querySelectorAll('.bpk-button--featured').length).toBe(1);
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with "large" and "iconOnly" attributes', () => {
    const { container } = render(
      <BpkLoadingButton large iconOnly>
        <BpkVisuallyHidden>Search</BpkVisuallyHidden>
      </BpkLoadingButton>,
    );
    expect(container.querySelectorAll('.bpk-button--large').length).toBe(1);
    expect(container.querySelectorAll('.bpk-button--icon-only').length).toBe(1);
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with "large" and "disabled" attributes', () => {
    const { asFragment } = render(
      <BpkLoadingButton large disabled>
        My button
      </BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with "large" and "loading" attributes', () => {
    const { container } = render(
      <BpkLoadingButton large loading>
        My button
      </BpkLoadingButton>,
    );
    expect(container.querySelectorAll('.bpk-loading-button__icon').length).toBe(
      1,
    );
    expect(container.querySelectorAll('.bpk-button--large').length).toBe(1);
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with a "icon" attribute', () => {
    const AlignedIcon = withButtonAlignment(BaggageIcon);
    const icon = <AlignedIcon />;
    const { asFragment } = render(
      <BpkLoadingButton icon={icon}>My button</BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(error).not.toHaveBeenCalled();
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
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with a "iconLoading" attribute', () => {
    const AlignedIcon = withButtonAlignment(BaggageIcon);
    const icon = <AlignedIcon />;
    const { container } = render(
      <BpkLoadingButton loading iconLoading={icon}>
        My button
      </BpkLoadingButton>,
    );
    expect(container.querySelectorAll('.bpk-loading-button__icon').length).toBe(
      1,
    );
    expect(error).not.toHaveBeenCalled();
  });

  it('should respect the class names entered as a string', () => {
    const { container } = render(
      <BpkLoadingButton
        large
        secondary
        className="custom-class-1 custom-class-2"
      >
        My button
      </BpkLoadingButton>,
    );
    expect(container.querySelectorAll('.custom-class-1').length).toBe(1);
    expect(error).not.toHaveBeenCalled();
  });

  it('should add only bpk specific classes if className prop is set to empty string', () => {
    const { asFragment } = render(
      <BpkLoadingButton large secondary className="">
        My button
      </BpkLoadingButton>,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(error).not.toHaveBeenCalled();
  });
});
