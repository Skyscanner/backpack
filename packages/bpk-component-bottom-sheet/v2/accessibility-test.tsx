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

import { BpkBottomSheetV2 } from './BpkBottomSheetV2';

describe('BpkBottomSheetV2 accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkBottomSheetV2
        actionText='Action'
        ariaLabelledby='bottom-sheet-accessibility'
        closeLabel="Close"
        closeOnEscPressed
        closeOnScrimClick
        id="my-bottom-sheet"
        isOpen
        onAction={jest.fn()}
        onClose={jest.fn()}
        title="Bottom sheet title"
        wide
      >
        Bottom sheet content
      </BpkBottomSheetV2>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
