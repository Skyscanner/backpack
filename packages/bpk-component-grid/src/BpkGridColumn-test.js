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

import BpkGridColumn from './BpkGridColumn';

describe('BpkGridColumn', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkGridColumn width={6}>Contents</BpkGridColumn>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "width" attribute set to 0', () => {
    const { asFragment } = render(
      <BpkGridColumn width={0}>Contents</BpkGridColumn>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "debug" attribute', () => {
    const { asFragment } = render(
      <BpkGridColumn width={6} debug>
        Contents
      </BpkGridColumn>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "mobileWidth" attribute', () => {
    const { asFragment } = render(
      <BpkGridColumn width={6} mobileWidth={6} debug>
        Contents
      </BpkGridColumn>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "mobileWidth" attribute set to 0', () => {
    const { asFragment } = render(
      <BpkGridColumn width={0} mobileWidth={0}>
        Contents
      </BpkGridColumn>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "tabletWidth" attribute', () => {
    const { asFragment } = render(
      <BpkGridColumn width={6} tabletWidth={6} debug>
        Contents
      </BpkGridColumn>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "tabletWidth" attribute set to 0', () => {
    const { asFragment } = render(
      <BpkGridColumn width={0} tabletWidth={0}>
        Contents
      </BpkGridColumn>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "offset" attribute', () => {
    const { asFragment } = render(
      <BpkGridColumn width={6} offset={6} debug>
        Contents
      </BpkGridColumn>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "offset" attribute set to 0', () => {
    const { asFragment } = render(
      <BpkGridColumn width={0} offset={0}>
        Contents
      </BpkGridColumn>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "mobileOffset" attribute', () => {
    const { asFragment } = render(
      <BpkGridColumn width={6} mobileOffset={6} debug>
        Contents
      </BpkGridColumn>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "mobileOffset" attribute set to 0', () => {
    const { asFragment } = render(
      <BpkGridColumn width={0} mobileOffset={0}>
        Contents
      </BpkGridColumn>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "tabletOffset" attribute', () => {
    const { asFragment } = render(
      <BpkGridColumn width={6} tabletOffset={6} debug>
        Contents
      </BpkGridColumn>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "tabletOffset" attribute set to 0', () => {
    const { asFragment } = render(
      <BpkGridColumn width={0} tabletOffset={0}>
        Contents
      </BpkGridColumn>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "className" attribute', () => {
    const { asFragment } = render(
      <BpkGridColumn width={0} className="my-custom-class">
        Contents
      </BpkGridColumn>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with arbitrary attributes', () => {
    const { asFragment } = render(
      <BpkGridColumn
        width={0}
        data-arbitrary-1="my-arbitrary-data"
        data-arbitrary-2="my-arbitrary-data"
      >
        Contents
      </BpkGridColumn>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
