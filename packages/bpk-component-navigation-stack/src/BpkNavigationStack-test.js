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

import React from 'react';
import { render } from '@testing-library/react';

import BpkNavigationStack from './BpkNavigationStack';

describe('BpkNavigationStack', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkNavigationStack views={[<div />, <div />]} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const { asFragment } = render(
      <BpkNavigationStack className="test" views={[<div />, <div />]} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  describe('rtl', () => {
    beforeAll(() => {
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.setAttribute('dir', 'rtl');
      }
    });

    afterAll(() => {
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.removeAttribute('dir');
      }
    });

    it('should render correctly', () => {
      const { asFragment } = render(
        <BpkNavigationStack views={[<div />, <div />]} />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
