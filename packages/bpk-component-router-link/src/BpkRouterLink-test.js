/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
import { StaticRouter } from 'react-router-dom';

import BpkRouterLink from './BpkRouterLink';

const context = {};

describe('BpkRouterLink', () => {
  it('should render correctly with a "to" attribute', () => {
    const { asFragment } = render(
      <StaticRouter location="/" context={context}>
        <BpkRouterLink to="/home">Link</BpkRouterLink>
      </StaticRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const { asFragment } = render(
      <StaticRouter location="/" context={context}>
        <BpkRouterLink
          to="/home"
          className="my-custom-class-1 my-custom-class-2"
        >
          Link
        </BpkRouterLink>
      </StaticRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with arbitrary attributes', () => {
    const { asFragment } = render(
      <StaticRouter location="/" context={context}>
        <BpkRouterLink to="/home" target="_blank">
          Link
        </BpkRouterLink>
      </StaticRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
