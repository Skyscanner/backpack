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

describe('BpkBubble', () => {
  it('should render correctly', () => {
    const { container } = render(<BpkBadge label="New" />);

    // Root wrapper exists
    const root = container.querySelector('.bpk-bubble');
    expect(root).toBeInTheDocument();

    // Label text is visible
    expect(screen.getByText('New')).toBeInTheDocument();

    // Arrow exists and is marked decorative
    const arrow = container.querySelector('.bpk-bubble-arrow');
    expect(arrow).toBeInTheDocument();
    expect(arrow).toHaveAttribute('aria-hidden', 'true');
  });

  it('should render the provided label', () => {
    render(<BpkBadge label="Beta" />);
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('should support long labels', () => {
    render(<BpkBadge label="Limited time" />);
    expect(screen.getByText('Limited time')).toBeInTheDocument();
  });

  it('should render with expected classes for internal elements', () => {
    const { container } = render(<BpkBadge label="New" />);

    // Root pill has class applied
    const root = container.querySelector('.bpk-bubble');
    expect(root).toBeInTheDocument();

    // Arrow has class applied
    const arrow = container.querySelector('.bpk-bubble-arrow');
    expect(arrow).toBeInTheDocument();
  });

  it('should be accessible via its text (no extra roles required)', () => {
    // The bubble is an inline badge; its accessible name is the label itself.
    render(<BpkBadge label="Nouveau" />);

    // Query by text ensures it's part of the accessibility tree
    expect(screen.getByText('Nouveau')).toBeVisible();
  });
});
