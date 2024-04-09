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
import BpkImageSkeleton, { IMAGE_SKELETON_STYLE } from './BpkImageSkeleton';

describe('BpkImageSkeleton', () => {
  it('renders with default props', () => {
    const { container } = render(<BpkImageSkeleton />);
    const skeletonElement = container.querySelector('.bpk-image-skeleton__default-size');
    expect(skeletonElement).toBeInTheDocument();
  });

  it('applies custom size styles correctly', () => {
    const customSize = { width: '100px', height: '50px' };
    const { container } = render(<BpkImageSkeleton size={customSize} />);
    const skeletonElement = container.querySelector('.bpk-image-skeleton__default-size');
    expect(skeletonElement).toHaveStyle('width: 100px; height: 50px;');
  });

  it('applies rounded style when specified', () => {
    const { container } = render(<BpkImageSkeleton style={IMAGE_SKELETON_STYLE.rounded} />);
    const skeletonElement = container.querySelector('.bpk-image-skeleton__round-style');
    expect(skeletonElement).toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    const { container } = render(<BpkImageSkeleton className="custom-class" />);
    const skeletonElement = container.querySelector('.custom-class');
    expect(skeletonElement).toBeInTheDocument();
  });

  it('renders with aria-label when provided', () => {
    const { container } = render(<BpkImageSkeleton ariaLabel="Test label" />);
    const skeletonElement = container.querySelector('[aria-label="Test label"]');
    expect(skeletonElement).toBeInTheDocument();
  });
});
