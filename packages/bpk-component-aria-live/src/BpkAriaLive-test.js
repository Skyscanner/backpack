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
import { render } from '@testing-library/react';

import BpkAriaLive, { POLITENESS_SETTINGS } from './BpkAriaLive';
// Temp disabling TS types due to non TS projects compatibility.
// import type { PolitenessSetting } from './BpkAriaLive';

describe('BpkAriaLive', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BpkAriaLive>Backpack</BpkAriaLive>);
    expect(asFragment()).toMatchSnapshot();
  });

  Object.keys(POLITENESS_SETTINGS).forEach((politenessSetting) => {
    it(`should render correctly with politenessSetting="${politenessSetting}"`, () => {
      const { asFragment } = render(
        // Temp disabling TS types due to non TS projects compatibility.
        // <BpkAriaLive politenessSetting={politenessSetting as PolitenessSetting}>
        <BpkAriaLive politenessSetting={politenessSetting}>
          Backpack
        </BpkAriaLive>,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('should render correctly with the "visible" prop', () => {
    const { asFragment } = render(<BpkAriaLive visible>Backpack</BpkAriaLive>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support custom class names', () => {
    const { asFragment } = render(
      <BpkAriaLive className="custom-classname">Backpack</BpkAriaLive>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support arbitrary props', () => {
    const { asFragment } = render(
      <BpkAriaLive testid="123">Backpack</BpkAriaLive>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
