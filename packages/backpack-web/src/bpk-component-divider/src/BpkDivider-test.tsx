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

import { render, screen } from '@testing-library/react';

import BpkDivider from './BpkDivider';

describe('BpkDivider', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BpkDivider />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a horizontal separator by default', () => {
    render(<BpkDivider />);
    const separator = screen.getByRole('separator');
    // A horizontal divider is a semantic `<hr>`, whose separator role is
    // implicitly horizontal, so no explicit aria-orientation is needed.
    expect(separator.tagName).toBe('HR');
    expect(separator).not.toHaveAttribute('aria-orientation');
  });

  it('should render a vertical separator when requested', () => {
    render(<BpkDivider orientation="vertical" />);
    const separator = screen.getByRole('separator');
    expect(separator.tagName).toBe('DIV');
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('should apply spacing and weight modifier class names', () => {
    render(<BpkDivider spacing="lg" weight="bold" />);
    const separator = screen.getByRole('separator');
    expect(separator.className).toContain('bpk-divider--spacing-lg');
    expect(separator.className).toContain('bpk-divider--weight-bold');
  });
});
