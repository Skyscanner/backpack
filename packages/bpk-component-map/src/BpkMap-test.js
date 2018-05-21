/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
/* @flow */

import React from 'react';
import renderer from 'react-test-renderer';
import BpkMap from './BpkMap';

describe('BpkMap', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <BpkMap
          apiKey=""
          zoom={15}
          centerLatitude={55.944357}
          centerLongitude={-3.1967116}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const tree = renderer
      .create(
        <BpkMap
          apiKey=""
          zoom={15}
          zoomControl={false}
          width="60%"
          height="50%"
          language="zh"
          centerLatitude={55.944357}
          centerLongitude={-3.1967116}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const tree = renderer
      .create(
        <BpkMap
          apiKey=""
          zoom={15}
          language="zh"
          centerLatitude={55.944357}
          centerLongitude={-3.1967116}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
