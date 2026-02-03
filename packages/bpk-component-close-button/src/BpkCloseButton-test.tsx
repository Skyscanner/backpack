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

import { render } from '@testing-library/react';

import CustomCloseIcon from '../../bpk-component-icon/sm/close-circle';

import BpkCloseButton from './BpkCloseButton';

const error = jest.spyOn(console, "error").mockImplementation(() => {});

describe('BpkCloseButton', () => {
  beforeEach(() => {
    error.mockReset();
  })
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkCloseButton label="Close" onClick={() => null} />,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with a custom icon', () => {
    const { asFragment } = render(
      <BpkCloseButton
        label="Close"
        onClick={() => null}
        customIcon={CustomCloseIcon}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(error).not.toHaveBeenCalled();
  });

  it('should render correctly with a custom className', () => {
    const { asFragment } = render(
      <BpkCloseButton
        label="Close"
        onClick={() => null}
        className="my-custom-classname"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(error).not.toHaveBeenCalled();
  });
});
