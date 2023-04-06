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

import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { type BpkDialogV2 as DialogType } from './BpkDialogV2';

describe('BpkDialogV2', () => {
  const props = {
    id: 'bpk-dialog-element',
    ariaLabelledby: 'bpk-dialog-label-my-dialog',
    closeLabel: 'bpk-dialog-button-close',
    isOpen: true,
    onClose: jest.fn(),
    title: 'Backpack Dialog Element',
    showHeader: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('is supported', () => {
    let BpkDialogV2: typeof DialogType;

    beforeEach(() => {
      jest.isolateModules(() => {
        ({ BpkDialogV2 } = jest.requireActual('./BpkDialogV2'));
      });
    });

    it('should render correctly with content', () => {
      const { asFragment } = render(
        <BpkDialogV2 {...props}>
          <div>Content</div>
        </BpkDialogV2>,
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should call on Close when clicking on button-close', () => {
      render(
        <BpkDialogV2 {...props}>
          <div>Content</div>
        </BpkDialogV2>,
      );
      fireEvent.click(screen.getByTitle('bpk-dialog-button-close'));

      expect(props.onClose).toHaveBeenCalledTimes(1);
    });

    it('should close the dialog when clicking outside the dialog', () => {
      render(
        <>
          <div data-testid="page" />
          <BpkDialogV2 {...props}>
            <div>Content</div>
          </BpkDialogV2>
        </>,
      );
      fireEvent.click(screen.getByTestId('page'));

      expect(screen.queryByRole('Dialog')).toBeNull();
    });

    it('should not render title and close button if showHeader is set to false', () => {
      render(
        <BpkDialogV2 {...props} showHeader={false}>
          <div>Content</div>
        </BpkDialogV2>,
      );

      expect(screen.queryByRole('Dialog Element')).not.toBeInTheDocument();
    });

    it('should call showModal to open dialog', () => {
      window.HTMLDialogElement.prototype.showModal = jest.fn();
      render(
        <BpkDialogV2 {...props}>
          <div>Content</div>
        </BpkDialogV2>,
      );

      expect(
        window.HTMLDialogElement.prototype.showModal,
      ).toHaveBeenCalledTimes(1);
    });

    it('should return null when dialog is closed', () => {
      const { rerender, store } = render(
        <BpkDialogV2 {...props}>
          <div>Content</div>
        </BpkDialogV2>,
      );

      expect(screen.queryByText('Content')).toBeInTheDocument();

      rerender(
        <BpkDialogV2 {...props} isOpen={false}>
          <div>Content</div>
        </BpkDialogV2>,
        rerender,
        store,
      );

      expect(screen.queryByRole('Dialog')).toBeNull();
    });

    describe('setOverflowY', () => {
      it.each([
        ['hidden', true],
        ['visible', false],
      ])('to %p when isOpen is %p', (expectedOverflowY, expectedIsOpen) => {
        render(
          <BpkDialogV2 {...props} isOpen={expectedIsOpen}>
            <div>Content</div>
          </BpkDialogV2>,
        );

        expect(document.body.style.overflowY).toEqual(expectedOverflowY);
      });
    });
  });

  describe('is not supported', () => {
    let htmlDialogElement: typeof window.HTMLDialogElement;

    let BpkDialogV2: typeof DialogType;

    beforeEach(async () => {
      htmlDialogElement = window.HTMLDialogElement;
      window.HTMLDialogElement = undefined;

      jest.isolateModules(() => {
        ({ BpkDialogV2 } = jest.requireActual('./BpkDialogV2'));
      });
    });

    afterEach(() => {
      window.HTMLDialogElement = htmlDialogElement;
    });

    it('should render correctly with polyfill and content', () => {
      const { asFragment } = render(
        <BpkDialogV2 {...props}>
          <div>Content</div>
        </BpkDialogV2>,
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should call use the polyfill to open the dialog', () => {
      render(
        <BpkDialogV2 {...props}>
          <div>Content</div>
        </BpkDialogV2>,
      );

      expect(
        document
          .getElementById('bpk-dialog-element-polyfill')
          ?.getAttribute('data-open'),
      ).toEqual('true');
      expect(document.body.style.position).toEqual('fixed');
      expect(document.body.style.width).toEqual('100%');
    });

    it('should reset position and width when closing the dialog', () => {
      render(
        <BpkDialogV2 {...props} isOpen={false}>
          <div>Content</div>
        </BpkDialogV2>,
      );

      expect(document.body.style.position).toEqual('relative');
      expect(document.body.style.width).toEqual('auto');
    });
  });
});
