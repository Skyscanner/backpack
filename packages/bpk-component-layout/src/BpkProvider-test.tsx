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

import '@testing-library/jest-dom';

import { BpkBox } from './BpkBox';
import { BpkProvider } from './BpkProvider';
import { BpkSpacing } from './tokens';

describe('BpkProvider', () => {
  it('renders children inside Chakra system without crashing', () => {
    const { getByText } = render(
      <BpkProvider>
        <BpkBox padding={BpkSpacing.MD}>
          Layout content
        </BpkBox>
      </BpkProvider>,
    );

    expect(getByText('Layout content')).toBeInTheDocument();
  });

  it('can render plain DOM children', () => {
    const { getByText } = render(
      <BpkProvider>
        <div>Plain child</div>
      </BpkProvider>,
    );

    expect(getByText('Plain child')).toBeInTheDocument();
  });
});
