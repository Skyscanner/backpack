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
import { axe } from 'jest-axe';

import BpkDismissibleChip from './BpkDismissibleChip';
import BpkSelectableChip from './BpkSelectableChip';

describe('BpkDismissibleChip accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkDismissibleChip onClick={() => null} accessibilityLabel="Dismiss">
        Dismiss me
      </BpkDismissibleChip>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('BpkSelectableChip accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkSelectableChip onClick={() => null} accessibilityLabel="Toggle">
        Toggle me
      </BpkSelectableChip>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues when role=tab', async () => {
    const { container } = render(
      <div role="tablist">
        <BpkSelectableChip
          onClick={() => null}
          accessibilityLabel="Tab"
          role="tab"
        >
          Toggle me
        </BpkSelectableChip>
      </div>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
