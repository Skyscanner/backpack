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

import type { ReactElement } from 'react';

import { render } from '@testing-library/react';

import { BpkProvider } from '../BpkProvider';

import BpkAspectRatio from './BpkAspectRatio';

const renderWithLayout = (component: ReactElement) => render(<BpkProvider>{component}</BpkProvider>);

describe('BpkAspectRatio', () => {
  it('should render correctly', () => {
    const { container } = renderWithLayout(
      <BpkAspectRatio ratio={16 / 9}>
        <div>Content</div>
      </BpkAspectRatio>,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should support ratio prop', () => {
    const { container } = renderWithLayout(
      <BpkAspectRatio ratio={4 / 3}>
        <div>Content</div>
      </BpkAspectRatio>,
    );
    const aspectRatio = container.firstChild as HTMLElement;
    expect(aspectRatio).toBeInTheDocument();
  });
});

