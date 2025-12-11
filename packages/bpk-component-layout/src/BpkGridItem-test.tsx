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

import { BpkGridItem } from './BpkGridItem';
import { BpkProvider } from './BpkProvider';
import { BpkSpacing } from './tokens';

describe('BpkGridItem', () => {
  it('renders its children', () => {
    const { getByText } = render(
      <BpkProvider>
        <BpkGridItem>
          <span>Grid item</span>
        </BpkGridItem>
      </BpkProvider>,
    );

    expect(getByText('Grid item')).toBeInTheDocument();
  });

  it('accepts grid span props', () => {
    const { container } = render(
      <BpkProvider>
        <BpkGridItem colSpan={2} rowSpan={3}>
          Spanning item
        </BpkGridItem>
      </BpkProvider>,
    );

    expect(container.firstChild).toHaveStyle({ gridColumn: 'span 2' });
    expect(container.firstChild).toHaveStyle({ gridRow: 'span 3' });
  });

  it('supports Backpack spacing tokens', () => {
    const { container } = render(
      <BpkProvider>
        <BpkGridItem padding={BpkSpacing.MD}>Spacing item</BpkGridItem>
      </BpkProvider>,
    );

    expect(container.firstChild).toHaveStyle('padding: 0.5rem');
  });
});
