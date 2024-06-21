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

import InfoIcon from '../../bpk-component-icon/lg/information-circle';
import TickIcon from '../../bpk-component-icon/lg/tick';
import TrashIcon from '../../bpk-component-icon/lg/trash';

import BpkDialog from './BpkDialog';
import { HEADER_ICON_TYPES } from './common-types';

describe('BpkDialog', () => {
  it('should render correctly', () => {
    const customRenderTarget = document.createElement('div');
    render(
      <BpkDialog
        id="my-modal"
        ariaLabel="example dialog to showcase component"
        ariaModal
        onClose={jest.fn()}
        closeLabel="Close"
        getApplicationElement={jest.fn()}
        isOpen
        renderTarget={() => customRenderTarget}
      >
        Dialog content
      </BpkDialog>,
    );
    expect(screen.getByText('Dialog content')).toBeVisible();
  });

  it('should render correctly when it is not dismissible', () => {
    const customRenderTarget = document.createElement('div');

    const { asFragment, container } = render(
      <BpkDialog
        id="my-modal"
        ariaLabel="example dialog to showcase component"
        ariaModal
        onClose={jest.fn()}
        dialogRef={jest.fn()}
        getApplicationElement={jest.fn()}
        isOpen
        renderTarget={() => customRenderTarget}
        dismissible={false}
      >
        Dialog content inside a custom target
      </BpkDialog>,
    );

    expect(
      container.getElementsByClassName('bpk-dialog__close-button'),
    ).toHaveLength(0);
  });

  it('should render default icon dialog correctly', () => {
    const customRenderTarget = document.createElement('div');

    const { container } = render(
      <BpkDialog
        id="my-modal"
        ariaLabel="example dialog to showcase component"
        ariaModal
        onClose={jest.fn()}
        dialogRef={jest.fn()}
        getApplicationElement={jest.fn()}
        isOpen
        renderTarget={() => customRenderTarget}
        dismissible={false}
        headerIcon={<TickIcon />}
      >
        Dialog content inside a custom target
      </BpkDialog>,
    );
    expect(
      container.getElementsByClassName(
        'bpk-dialog__icon bpk-dialog__icon--primary',
      )[0],
    ).toBeInTheDocument();
  });

  it('should render warning icon dialog correctly', () => {
    const customRenderTarget = document.createElement('div');

    const { container } = render(
      <BpkDialog
        id="my-modal"
        ariaLabel="example dialog to showcase component"
        ariaModal
        onClose={jest.fn()}
        dialogRef={jest.fn()}
        getApplicationElement={jest.fn()}
        isOpen
        renderTarget={() => customRenderTarget}
        dismissible={false}
        headerIcon={<TickIcon />}
        headerIconType={HEADER_ICON_TYPES.warning}
      >
        Dialog content inside a custom target
      </BpkDialog>,
    );
    expect(
      container.getElementsByClassName(
        'bpk-dialog__icon bpk-dialog__icon--warning',
      )[0],
    ).toBeInTheDocument();
  });

  it('should render destructive icon dialog correctly', () => {
    const customRenderTarget = document.createElement('div');

    const { container } = render(
      <BpkDialog
        id="my-modal"
        ariaLabel="example dialog to showcase component"
        ariaModal
        onClose={jest.fn()}
        dialogRef={jest.fn()}
        getApplicationElement={jest.fn()}
        isOpen
        renderTarget={() => customRenderTarget}
        dismissible={false}
        headerIcon={<TickIcon />}
        headerIconType={HEADER_ICON_TYPES.destructive}
      >
        Dialog content inside a custom target
      </BpkDialog>,
    );
    expect(
      container.getElementsByClassName(
        'bpk-dialog__icon bpk-dialog__icon--destructive',
      )[0],
    ).toBeInTheDocument();
  });

  it('should render with flare dialog', () => {
    const customRenderTarget = document.createElement('div');

    const { container } = render(
      <BpkDialog
        id="my-modal"
        ariaLabel="example dialog to showcase component"
        ariaModal
        onClose={jest.fn()}
        dialogRef={jest.fn()}
        getApplicationElement={jest.fn()}
        isOpen
        renderTarget={() => customRenderTarget}
        flare
      >
        Dialog content inside a custom target
      </BpkDialog>,
    );

    expect(
      container.getElementsByClassName('bpk-dialog-inner__flare')[0],
    ).toBeInTheDocument();
  });

  it('should render with flare dialog with flareClassName', () => {
    const customRenderTarget = document.createElement('div');

    const { container } = render(
      <BpkDialog
        id="my-modal"
        ariaLabel="example dialog to showcase component"
        ariaModal
        onClose={jest.fn()}
        dialogRef={jest.fn()}
        getApplicationElement={jest.fn()}
        isOpen
        renderTarget={() => customRenderTarget}
        flare
        flareClassName="my-className"
      >
        Dialog content inside a custom target
      </BpkDialog>,
    );
    expect(
      container.getElementsByClassName(
        'bpk-dialog-inner__flare my-className',
      )[0],
    ).toBeInTheDocument();
  });
});
