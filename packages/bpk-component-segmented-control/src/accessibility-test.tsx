/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2022 Skyscanner Ltd
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

import BpkSegmentedControl, {
  useSegmentedControlPanels,
} from './BpkSegmentedControl';

const buttonContents = ['specific dates', 'flexible dates'];

// Test component that includes both tabs and panels for complete accessibility testing
const SegmentedControlWithPanels = () => {
  const { controlProps, getPanelProps } = useSegmentedControlPanels(
    buttonContents,
    0,
  );

  return (
    <div>
      <BpkSegmentedControl
        {...controlProps}
        label="Date selection"
        onItemClick={() => {}}
      />
      <div {...getPanelProps(0)}>
        <p>Panel for specific dates</p>
      </div>
      <div {...getPanelProps(1)}>
        <p>Panel for flexible dates</p>
      </div>
    </div>
  );
};

describe('BpkSegmentedControl accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(<SegmentedControlWithPanels />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues when used without panels', async () => {
    const { container } = render(
      <BpkSegmentedControl
        buttonContents={buttonContents}
        label="Date selection"
        onItemClick={() => {}}
        selectedIndex={1}
      />,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
