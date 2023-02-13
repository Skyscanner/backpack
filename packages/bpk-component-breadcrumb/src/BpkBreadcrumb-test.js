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

import BpkBreadcrumb from './BpkBreadcrumb';

describe('BpkBreadcrumb', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkBreadcrumb label="My breadcrumbs">
        <div>Anything can go in here</div>
      </BpkBreadcrumb>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a custom class name', () => {
    const { asFragment } = render(
      <BpkBreadcrumb label="My breadcrumbs" className="my-custom-class">
        <div>Anything can go in here</div>
      </BpkBreadcrumb>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with arbitrary props', () => {
    const { asFragment } = render(
      <BpkBreadcrumb
        label="My breadcrumbs"
        testid="arbitrary value" // <-- arbitrary prop
      >
        <div>Anything can go in here</div>
      </BpkBreadcrumb>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with schema meta data', () => {
    const schemaMetaData = [
      {
        url: 'http://www.skyscanner.net',
        label: 'home',
      },
      {
        url: 'http://www.skyscanner.net/hotels',
        label: 'hotels',
      },
    ];
    const { asFragment } = render(
      <BpkBreadcrumb label="My breadcrumbs" schemaMetaData={schemaMetaData}>
        <div>Anything can go in here</div>
      </BpkBreadcrumb>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
