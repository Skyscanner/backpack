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

import { BpkFlex } from './BpkFlex';
import { BpkSpacing } from './tokens';

describe('BpkFlex', () => {
  it('renders children content', () => {
    const { getByText } = render(
      <BpkFlex>Content</BpkFlex>,
    );
    expect(getByText('Content')).toBeInTheDocument();
  });

  it('accepts flex props: direction, justify, align, wrap, gap', () => {
    const { container } = render(
      <BpkFlex
        direction="column"
        justify="center"
        align="center"
        wrap="wrap"
        gap={BpkSpacing.MD}
      >
        Content
      </BpkFlex>,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('supports responsive direction', () => {
    const { container } = render(
      <BpkFlex direction={{ mobile: 'column', tablet: 'row' }}>
        Content
      </BpkFlex>,
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
