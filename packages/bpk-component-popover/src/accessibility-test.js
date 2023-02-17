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

/* @flow strict */

import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import BpkPopover from './BpkPopover';
import BpkPopoverPortal from './BpkPopoverPortal';

describe('BpkPopover accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkPopover
        id="my-popover"
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
      >
        My popover content
      </BpkPopover>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('BpkPopoverPortal accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkPopoverPortal
        id="my-popover"
        target={<div>target</div>}
        isOpen={false}
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
      >
        <div>My popover content</div>
      </BpkPopoverPortal>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
