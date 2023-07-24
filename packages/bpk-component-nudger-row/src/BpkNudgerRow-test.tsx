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

import { render } from '@testing-library/react';

import BpkNudgerRow from './BpkNudgerRow';

describe('BpkNudgerRow', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkNudgerRow
        nudgerId="nudger"
        title="title"
        min={1}
        max={9}
        value={2}
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support custom class names', () => {
    const { asFragment } = render(
      <BpkNudgerRow
        nudgerId="nudger"
        title="title"
        min={1}
        max={9}
        value={2}
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
        className="custom-classname"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with subtitle prop', () => {
    const { asFragment } = render(
      <BpkNudgerRow
        nudgerId="nudger"
        title="title"
        subtitle="subtitle"
        min={1}
        max={9}
        value={2}
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
        className="custom-classname"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
