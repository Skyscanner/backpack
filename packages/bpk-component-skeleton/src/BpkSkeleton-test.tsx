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
import BpkSkeleton from './BpkSkeleton';
import { SKELETON_TYPES, SIZE_TYPES, IMAGE_SKELETON_STYLE, BACKGROUND_STYLE } from './common-types';

describe('BpkSkeleton', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<BpkSkeleton type={SKELETON_TYPES.image} />);
    expect(container.firstChild).toHaveClass('bpk-skeleton__image--default');
  });

  it('applies correct class names for specified size', () => {
    const { container } = render(<BpkSkeleton type={SKELETON_TYPES.bodyText} size={SIZE_TYPES.large} />);
    expect(container.firstChild).toHaveClass('bpk-skeleton__bodyText--large');
  });

  it('applies correct class names for custom size', () => {
    const customSize = { width: '100px', height: '50px' };
    const { container } = render(<BpkSkeleton type={SKELETON_TYPES.circle} size={customSize} />);
    expect(container.firstChild).toHaveStyle('width: 100px');
    expect(container.firstChild).toHaveStyle('height: 50px');
  });

  it('applies correct class names for image style', () => {
    const { container } = render(<BpkSkeleton type={SKELETON_TYPES.image} style={IMAGE_SKELETON_STYLE.rounded} />);
    expect(container.firstChild).toHaveClass('bpk-skeleton__image--rounded');
  });

  it('applies default background style by default', () => {
    const { container } = render(<BpkSkeleton type={SKELETON_TYPES.image} />);
    expect(container.firstChild).toHaveClass('bpk-skeleton__default');
  });

  it('applies correct class names for onContrast background style', () => {
    const { container } = render(<BpkSkeleton type={SKELETON_TYPES.image} backgroundStyle={BACKGROUND_STYLE.onContrast} />);
    expect(container.firstChild).toHaveClass('bpk-skeleton__onContrast');
  });
});
