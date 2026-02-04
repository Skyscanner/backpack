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

import BpkBarchartBar from './BpkBarchartBar';

describe('BpkBarchartBar', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <svg>
        <BpkBarchartBar x={10} y={10} width={20} height={100} label="Bar" />
      </svg>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with an onClick handler', () => {
    const { asFragment } = render(
      <svg>
        <BpkBarchartBar
          x={10}
          y={10}
          width={20}
          height={100}
          label="Bar"
          onClick={() => null}
        />
      </svg>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with an onHover handler', () => {
    const { asFragment } = render(
      <svg>
        <BpkBarchartBar
          x={10}
          y={10}
          width={20}
          height={100}
          label="Bar"
          onHover={() => null}
        />
      </svg>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render as an outlier', () => {
    const { asFragment } = render(
      <svg>
        <BpkBarchartBar
          x={10}
          y={10}
          width={20}
          height={100}
          label="Bar"
          outlier
        />
      </svg>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render as selected', () => {
    const { asFragment } = render(
      <svg>
        <BpkBarchartBar
          x={10}
          y={10}
          width={20}
          height={100}
          label="Bar"
          selected
        />
      </svg>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render as aria-pressed if onClick present and selected', () => {
    const { asFragment } = render(
      <svg>
        <BpkBarchartBar
          x={10}
          y={10}
          width={20}
          height={100}
          label="Bar"
          selected
          onClick={() => null}
        />
      </svg>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with "padding" prop', () => {
    const { asFragment } = render(
      <svg>
        <BpkBarchartBar
          x={10}
          y={10}
          width={20}
          height={100}
          label="Bar"
          padding={0.2}
        />
      </svg>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
