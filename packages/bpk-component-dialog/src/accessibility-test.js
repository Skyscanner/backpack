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

import BpkDialog from './BpkDialog';
import { BpkDialogV2 } from './BpkDialogV2';

describe('BpkDialog accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const customRenderTarget = document.createElement('div');

    const { container } = render(
      <BpkDialog
        id="my-modal"
        ariaLabel="example dialog to showcase component"
        onClose={jest.fn()}
        closeLabel="Close"
        dialogRef={jest.fn()}
        getApplicationElement={jest.fn()}
        isOpen
        renderTarget={() => customRenderTarget}
      >
        Dialog content inside a custom target
      </BpkDialog>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('BpkDialogV2 accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const customRenderTarget = document.createElement('div');

    const { container } = render(
      <BpkDialogV2
        id="bpk-dialog-element"
        ariaLabelledby="bpk-dialog-label-my-dialog"
        closeLabel="bpk-dialog-button-close"
        isOpen
        onClose={jest.fn()}
        title="Backpack Dialog Element"
        showHeader
        renderTarget={() => customRenderTarget}
      >
        Dialog content inside a custom target
      </BpkDialogV2>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
