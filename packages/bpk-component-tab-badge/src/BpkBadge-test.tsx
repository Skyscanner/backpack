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

import BpkBadge from './BpkBadge';

describe('BpkBadge', () => {
  it('should render correctly', () => {
    const { container } = render(<BpkBadge>New</BpkBadge>);

    // Root wrapper exists
    const root = container.querySelector('.bpk-badge');
    expect(root).toBeInTheDocument();

    // Label text is visible
    expect(screen.getByText('New')).toBeInTheDocument();

    // Arrow exists and is marked decorative
    const arrow = container.querySelector('.bpk-badge-arrow');
    expect(arrow).toBeInTheDocument();
    expect(arrow).toHaveAttribute('aria-hidden', 'true');
  });

  it('should render the provided label', () => {
    render(<BpkBadge>Beta</BpkBadge>);
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('should support long labels', () => {
    render(<BpkBadge>Limited Time</BpkBadge>);
    expect(screen.getByText('Limited time')).toBeInTheDocument();
  });

  it('should render with expected classes for internal elements', () => {
    const { container } = render(<BpkBadge>New</BpkBadge>);

    // Root pill has class applied
    const root = container.querySelector('.bpk-badge');
    expect(root).toBeInTheDocument();

    // Arrow has class applied
    const arrow = container.querySelector('.bpk-badge-arrow');
    expect(arrow).toBeInTheDocument();
  });

  it('should be accessible via its text (no extra roles required)', () => {
    // The badge is an inline badge; its accessible name is the label itself.
    render(<BpkBadge>New</BpkBadge>);

    // Query by text ensures it's part of the accessibility tree
    expect(screen.getByText('Nouveau')).toBeVisible();
  });
});
