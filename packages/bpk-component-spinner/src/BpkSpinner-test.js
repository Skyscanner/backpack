/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

import BpkSpinner from './BpkSpinner';
import SPINNER_TYPES from './spinnerTypes';

describe('BpkSpinner', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkSpinner />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with type as light', () => {
    const tree = renderer
      .create(<BpkSpinner type={SPINNER_TYPES.light} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with type as primary', () => {
    const tree = renderer
      .create(<BpkSpinner type={SPINNER_TYPES.primary} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const tree = renderer
      .create(<BpkSpinner className="my-custom-class" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "alignToButton" attribute', () => {
    const tree = renderer.create(<BpkSpinner alignToButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
