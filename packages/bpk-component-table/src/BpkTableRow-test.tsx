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

import BpkTableRow from './BpkTableRow';

describe('BpkTableRow', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <table>
        <tbody>
          <BpkTableRow>
            <td aria-label="test" />
          </BpkTableRow>
        </tbody>
      </table>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with custom class', () => {
    const { asFragment } = render(
      <table>
        <tbody>
          // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
          // @ts-expect-error TS(2322): Type '{ children: Element; className: string; }' i... Remove this comment to see the full error message
          // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; className: string; }' i... Remove this comment to see the full error message
          <BpkTableRow className="my-custom-class">
            <td aria-label="test" />
          </BpkTableRow>
        </tbody>
      </table>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with arbitrary props', () => {
    const { asFragment } = render(
      <table>
        <tbody>
          // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
          // @ts-expect-error TS(2322): Type '{ children: Element; id: string; "data-foo":... Remove this comment to see the full error message
          // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; id: string; "data-foo":... Remove this comment to see the full error message
          <BpkTableRow id="my-custom-id" data-foo="bar">
            <td aria-label="test" />
          </BpkTableRow>
        </tbody>
      </table>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
