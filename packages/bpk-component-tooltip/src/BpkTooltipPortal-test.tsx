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

import { colorPanjin } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

jest.mock('../../bpk-react-utils', () => {
  const original = jest.requireActual('../../bpk-react-utils');

  return {
    ...original,
    Portal: 'Portal',
  };
});

// eslint-disable-next-line import/first
import BpkTooltipPortal from './BpkTooltipPortal';

describe('BpkTooltipPortal', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkTooltipPortal
        ariaLabel="My tooltip content"
        id="my-tooltip"
        target={<div>target</div>}
      >
        My tooltip content
      </BpkTooltipPortal>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a custom portal className', () => {
    const { asFragment } = render(
      <BpkTooltipPortal
        ariaLabel="My tooltip content"
        id="my-tooltip"
        target={<div>target</div>}
        portalClassName="my-custom-class"
      >
        My tooltip content
      </BpkTooltipPortal>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a custom tooltip className', () => {
    const { asFragment } = render(
      <BpkTooltipPortal
        ariaLabel="My tooltip content"
        id="my-tooltip"
        target={<div>target</div>}
        className="my-custom-class"
      >
        My tooltip content
      </BpkTooltipPortal>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with custom portal style', () => {
    const { asFragment } = render(
      <BpkTooltipPortal
        ariaLabel="My tooltip content"
        id="my-tooltip"
        target={<div>target</div>}
        portalStyle={{ color: colorPanjin }}
      >
        My tooltip content
      </BpkTooltipPortal>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
