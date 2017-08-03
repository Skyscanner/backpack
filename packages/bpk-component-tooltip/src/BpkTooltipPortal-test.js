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

jest.mock('bpk-tether');
jest.mock('bpk-react-utils', () => {
  const original = require.requireActual('bpk-react-utils');

  return {
    ...original,
    Portal: 'Portal',
  };
});

/* eslint-disable import/first */
import BpkTooltipPortal from './BpkTooltipPortal';
/* eslint-enable */

describe('BpkTooltipPortal', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkTooltipPortal
        id="my-tooltip"
        target={<div>target</div>}
      >
        My tooltip content
      </BpkTooltipPortal>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a custom className', () => {
    const tree = renderer.create(
      <BpkTooltipPortal
        id="my-tooltip"
        target={<div>target</div>}
        className="my-custom-class"
      >
        My tooltip content
      </BpkTooltipPortal>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with custom portal style', () => {
    const tree = renderer.create(
      <BpkTooltipPortal
        id="my-tooltip"
        target={<div>target</div>}
        portalStyle={{ color: 'red' }}
      >
        My tooltip content
      </BpkTooltipPortal>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
