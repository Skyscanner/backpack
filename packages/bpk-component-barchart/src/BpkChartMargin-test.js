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

import { render } from '@testing-library/react';

import { spacingSm } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkChartMargin from './BpkChartMargin';

const margin = {
  top: spacingSm,
  right: spacingSm,
  bottom: spacingSm,
  left: spacingSm,
};

describe('BpkChartMargin', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <svg>
        <BpkChartMargin margin={margin}>Children</BpkChartMargin>
      </svg>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
