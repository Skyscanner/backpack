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

import BpkBreadcrumbItem from './BpkBreadcrumbItem';

describe('BpkBreadcrumbItem', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkBreadcrumbItem href="https://skyscanner.design/">
        Backpack
      </BpkBreadcrumbItem>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "active" prop', () => {
    const { asFragment } = render(
      <BpkBreadcrumbItem active>Backpack</BpkBreadcrumbItem>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a custom class name', () => {
    const { asFragment } = render(
      <BpkBreadcrumbItem
        href="https://skyscanner.design/"
        className="my-custom-class"
      >
        Backpack
      </BpkBreadcrumbItem>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with arbitrary props', () => {
    const { asFragment } = render(
      <BpkBreadcrumbItem
        href="https://skyscanner.design/"
        // @ts-expect-error TS(2322) FIXME: Type '{ children: string; href: string; testid: st... Remove this comment to see the full error message
        testid="arbitrary value" // <-- arbitrary prop
      >
        Backpack
      </BpkBreadcrumbItem>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with with "linkProps" attribute', () => {
    const { asFragment } = render(
      <BpkBreadcrumbItem
        href="https://skyscanner.design/"
        linkProps={{ testid: 'arbitrary value' }} // <-- arbitrary prop
      >
        Backpack
      </BpkBreadcrumbItem>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
