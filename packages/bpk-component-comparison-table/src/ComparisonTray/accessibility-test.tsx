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
import { axe, toHaveNoViolations } from 'jest-axe';

import { BpkProvider } from '../../../bpk-component-layout';

import ComparisonTray from './ComparisonTray';

const renderWithProvider = (ui: ReactElement) =>
  render(<BpkProvider>{ui}</BpkProvider>);

expect.extend(toHaveNoViolations);

const noop = () => {};

describe('ComparisonTray accessibility', () => {
  it('has no accessibility violations with 0 items', async () => {
    const { container } = renderWithProvider(
      <ComparisonTray.Root items={[]} onRemove={noop} onCompare={noop} ariaLabel="Comparison tray" removeLabel="Remove" compareLabel="Compare" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with 2 items', async () => {
    const { container } = renderWithProvider(
      <ComparisonTray.Root
        items={[
          { id: '1', label: 'VIP Cars', image: 'car1.png' },
          { id: '2', label: 'Hertz', image: 'car2.png' },
        ]}
        onRemove={noop}
        onCompare={noop}
        ariaLabel="Comparison tray"
        removeLabel="Remove"
        compareLabel="Compare"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with 3 items', async () => {
    const { container } = renderWithProvider(
      <ComparisonTray.Root
        items={[
          { id: '1', label: 'VIP Cars', image: 'car1.png' },
          { id: '2', label: 'Hertz', image: 'car2.png' },
          { id: '3', label: 'Avis', image: 'car3.png' },
        ]}
        onRemove={noop}
        onCompare={noop}
        ariaLabel="Comparison tray"
        removeLabel="Remove"
        compareLabel="Compare"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with custom compareLabel', async () => {
    const { container } = renderWithProvider(
      <ComparisonTray.Root
        items={[
          { id: '1', label: 'VIP Cars', image: 'car1.png' },
          { id: '2', label: 'Hertz', image: 'car2.png' },
        ]}
        onRemove={noop}
        onCompare={noop}
        compareLabel="Comparar"
        ariaLabel="Comparison tray"
        removeLabel="Remove"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
