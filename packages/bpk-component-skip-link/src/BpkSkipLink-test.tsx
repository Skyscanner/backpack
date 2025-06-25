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

import BpkSkipLink from './BpkSkipLink';

describe('BpkSkipLink', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkSkipLink href="#main" label="Skip to main content" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support custom class names', () => {
    const { asFragment } = render(
      <BpkSkipLink
        href="#main"
        label="Skip to main content"
        className="custom-className"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support arbitrary props', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2322): Type '{ href: string; label: string; testid: strin... Remove this comment to see the full error message
      <BpkSkipLink href="#main" label="Skip to main content" testid="123" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
