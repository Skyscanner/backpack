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
    render(
      <>
        <div id="pagewrap">
          <button type='button'>Open dialog</button>
        </div>
        <BpkDialog
          id="my-modal"
          ariaLabel="example dialog to showcase component"
          ariaModal
          onClose={jest.fn()}
          closeLabel="Close"
          getApplicationElement={jest.fn()}
          isOpen
          renderTarget={() => document.getElementById('pagewrap')}
        >
          Dialog content
        </BpkDialog>
      </>,
    );
    expect(screen.getByText('Dialog content')).toBeVisible();
  });

  it('should render correctly when it is not dismissible', () => {
    render(
      <>
        <div id="pagewrap">
          <button type='button'>Open dialog</button>
        </div>
        <BpkDialog
          id="my-modal"
          ariaLabel="example dialog to showcase component"
          ariaModal
          onClose={jest.fn()}
          dialogRef={jest.fn()}
          getApplicationElement={jest.fn()}
          isOpen
          renderTarget={() => document.getElementById('pagewrap')}
          dismissible={false}
        >
          Dialog content inside a custom target
        </BpkDialog>
      </>,
    );

    expect(
      document.getElementsByClassName('bpk-dialog__close-button'),
    ).toHaveLength(0);
  });

  it('should render default icon dialog correctly', () => {
    render(
      <>
        <div id="pagewrap">
          <button type='button'>Open dialog</button>
        </div>
        <BpkDialog
          id="my-modal"
          ariaLabel="example dialog to showcase component"
          ariaModal
          onClose={jest.fn()}
          dialogRef={jest.fn()}
          getApplicationElement={jest.fn()}
          isOpen
          renderTarget={() => document.getElementById('pagewrap')}
          dismissible={false}
          headerIcon={<TickIcon data-testid="tick-icon" />}
        >
          Dialog content inside a custom target
        </BpkDialog>
      </>,
    );
    expect(screen.getByTestId('tick-icon')).toBeInTheDocument();
  });

  it('should render warning icon dialog correctly', () => {
    render(
      <>
        <div id="pagewrap">
          <button type='button'>Open dialog</button>
        </div>
        <BpkDialog
          id="my-modal"
          ariaLabel="example dialog to showcase component"
          ariaModal
          onClose={jest.fn()}
          dialogRef={jest.fn()}
          getApplicationElement={jest.fn()}
          isOpen
          renderTarget={() => document.getElementById('pagewrap')}
          dismissible={false}
          headerIcon={<InfoIcon data-testid="warning-icon" />}
          headerIconType={HEADER_ICON_TYPES.warning}
        >
          Dialog content inside a custom target
        </BpkDialog>
      </>,
    );
    expect(screen.getByTestId('warning-icon')).toBeInTheDocument();
  });

  it('should render destructive icon dialog correctly', () => {
    render(
      <>
        <div id="pagewrap">
          <button type='button'>Open dialog</button>
        </div>
        <BpkDialog
          id="my-modal"
          ariaLabel="example dialog to showcase component"
          ariaModal
          onClose={jest.fn()}
          dialogRef={jest.fn()}
          getApplicationElement={jest.fn()}
          isOpen
          renderTarget={() => document.getElementById('pagewrap')}
          dismissible={false}
          headerIcon={<TrashIcon data-testid="trash-icon" />}
          headerIconType={HEADER_ICON_TYPES.destructive}
        >
          Dialog content inside a custom target
        </BpkDialog>
      </>,
    );
    expect(screen.getByTestId('trash-icon')).toBeInTheDocument();
  });

  it('should render with flare dialog', () => {
    render(
      <>
        <div id="pagewrap">
          <button type='button'>Open dialog</button>
        </div>
        <BpkDialog
          id="my-modal"
          ariaLabel="example dialog to showcase component"
          ariaModal
          onClose={jest.fn()}
          dialogRef={jest.fn()}
          getApplicationElement={jest.fn()}
          isOpen
          renderTarget={() => document.getElementById('pagewrap')}
          flare
        >
          Dialog content inside a custom target
        </BpkDialog>
      </>,
    );
    expect(
      document.getElementsByClassName('bpk-dialog-inner__flare')[0],
    ).toBeInTheDocument();
  });

  it('should render with flare dialog with flareClassName', () => {
    render(
      <>
        <div id="pagewrap">
          <button type='button'>Open dialog</button>
        </div>
        <BpkDialog
          id="my-modal"
          ariaLabel="example dialog to showcase component"
          ariaModal
          onClose={jest.fn()}
          dialogRef={jest.fn()}
          getApplicationElement={jest.fn()}
          isOpen
          renderTarget={() => document.getElementById('pagewrap')}
          flare
          flareClassName="my-className"
        >
          Dialog content inside a custom target
        </BpkDialog>
      </>,
    );
    expect(
      document.getElementsByClassName(
        'bpk-dialog-inner__flare my-className',
      )[0],
    ).toBeInTheDocument();
  });
});
