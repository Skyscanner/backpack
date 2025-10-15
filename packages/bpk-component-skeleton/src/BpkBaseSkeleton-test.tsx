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
import BpkBaseSkeleton from './BpkBaseSkeleton';
import { BACKGROUND_STYLE } from './common-types';

describe('BpkBaseSkeleton', () => {
  it('renders with default props', () => {
    const { container } = render(<BpkBaseSkeleton skeletonStyle="custom-class" backgroundStyle={BACKGROUND_STYLE.default} />);
    const skeletonElement = container.querySelector('.bpk-skeleton');
    expect(skeletonElement).toBeInTheDocument();
    expect(skeletonElement).toHaveAttribute('class', 'bpk-skeleton custom-class bpk-skeleton--default');
  });

  it('renders with custom styles when provided', () => {
    const customStyles = { width: '100px', height: '50px' };
    const { container } = render(<BpkBaseSkeleton skeletonStyle="custom-class" styleObj={customStyles} backgroundStyle={BACKGROUND_STYLE.default} />);
    const skeletonElement = container.querySelector('.bpk-skeleton');
    expect(skeletonElement).toBeInTheDocument();
    expect(skeletonElement).toHaveStyle('width: 100px; height: 50px;');
  });
});
