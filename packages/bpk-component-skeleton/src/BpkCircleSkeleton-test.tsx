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
import BpkCircleSkeleton, { CIRCLE_SIZE_TYPES } from './BpkCircleSkeleton';

describe('BpkCircleSkeleton', () => {
  it('renders with default props', () => {
    const { container } = render(<BpkCircleSkeleton />);
    const skeletonElement = container.querySelector('.bpk-circle-skeleton');
    expect(skeletonElement).toBeInTheDocument();
  });

  it('applies custom size styles correctly', () => {
    const customSize = { width: '100px', height: '100px' };
    const { container } = render(<BpkCircleSkeleton size={customSize} />);
    const skeletonElement = container.querySelector('.bpk-circle-skeleton');
    expect(skeletonElement).toHaveStyle('width: 100px; height: 100px;');
  });

  it('applies circle size styles when specified', () => {
    const { container } = render(<BpkCircleSkeleton size={CIRCLE_SIZE_TYPES.small} />);
    const skeletonElement = container.querySelector('.bpk-circle-skeleton__small');
    expect(skeletonElement).toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    const { container } = render(<BpkCircleSkeleton className="custom-class" />);
    const skeletonElement = container.querySelector('.custom-class');
    expect(skeletonElement).toBeInTheDocument();
  });

  it('renders with aria-label when provided', () => {
    const { container } = render(<BpkCircleSkeleton ariaLabel="Test label" />);
    const skeletonElement = container.querySelector('[aria-label="Test label"]');
    expect(skeletonElement).toBeInTheDocument();
  });
});

