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
import { BpkLayoutProvider } from './BpkLayoutProvider';
import { BpkSpacing } from './tokens';

describe('BpkLayoutProvider', () => {
  it('renders children inside Chakra system without crashing', () => {
    const { getByText } = render(
      <BpkLayoutProvider>
        <BpkBox padding={BpkSpacing.MD}>
          Layout content
        </BpkBox>
      </BpkLayoutProvider>,
    );

    expect(getByText('Layout content')).toBeInTheDocument();
  });

  it('can render plain DOM children', () => {
    const { getByText } = render(
      <BpkLayoutProvider>
        <div>Plain child</div>
      </BpkLayoutProvider>,
    );

    expect(getByText('Plain child')).toBeInTheDocument();
  });
});
