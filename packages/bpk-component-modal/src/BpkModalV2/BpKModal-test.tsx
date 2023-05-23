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

import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { type BpkModal as DialogType } from './BpkModal';

describe('BpkModal', () => {
  const props = {
    id: 'bpk-modal-element',
    ariaLabelledby: 'bpk-modal-label-my-dialog',
    closeLabel: 'bpk-modal-button-close',
    isOpen: true,
    onClose: jest.fn(),
    title: 'Backpack Dialog Element',
    showHeader: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('is supported', () => {
    let BpkModal: typeof DialogType;

    beforeEach(() => {
      jest.isolateModules(() => {
        ({ BpkModal } = jest.requireActual('./BpkModal'));
      });
    });

    it('should render correctly with content', () => {
      const { asFragment } = render(
        <BpkModal {...props}>
          <div>Content</div>
        </BpkModal>,
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should call on Close when closing the dialog', () => {
      render(
        <BpkModal {...props}>
          <div>Content</div>
        </BpkModal>,
      );
      fireEvent.click(screen.getByTitle('bpk-modal-button-close'));

      expect(props.onClose).toHaveBeenCalledTimes(1);
    });

    it('should close the dialog when clicking outside the dialog', () => {
      render(
        <>
          <div data-testid="page" />
          <BpkModal {...props}>
            <div>Content</div>
          </BpkModal>
        </>,
      );
      fireEvent.click(screen.getByTestId('page'));

      expect(screen.queryByRole('Dialog')).toBeNull();
    });

    it('should not close the dialog when clicking inside the dialog', () => {
      render(
        <BpkModal {...props}>
          <div>Content</div>
        </BpkModal>,
      );
      fireEvent.click(screen.getByText('Content'));

      expect(document.getElementById('bpk-modal-element')).toBeInTheDocument();
    });

    it('should not render title if title is set to empty string', () => {
      render(
        <BpkModal {...props} title="">
          <div>Content</div>
        </BpkModal>,
      );

      expect(screen.queryByRole('Dialog Element')).not.toBeInTheDocument();
      expect(document.getElementsByClassName('bpk-close-button')).toBeTruthy();
    });

    it('should call showModal to open dialog', () => {
      window.HTMLDialogElement.prototype.showModal = jest.fn();
      render(
        <BpkModal {...props}>
          <div>Content</div>
        </BpkModal>,
      );

      expect(
        window.HTMLDialogElement.prototype.showModal,
      ).toHaveBeenCalledTimes(1);
    });

    it('should return null when dialog is closed', () => {
      // @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
      const { rerender, store } = render(
        <BpkModal {...props}>
          <div>Content</div>
        </BpkModal>,
      );

      expect(screen.queryByText('Content')).toBeInTheDocument();

      rerender(
        <BpkModal {...props} isOpen={false}>
          <div>Content</div>
        </BpkModal>,
        // @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
        rerender,
        store,
      );

      expect(screen.queryByRole('Dialog')).toBeNull();
    });

    it('should set up the correct className when fullScreenOnDesktop is true', () => {
      render(
        <BpkModal {...props} fullScreenOnDesktop>
          <div>Content</div>
        </BpkModal>,
      );

      expect(document.getElementById('bpk-modal-element')).toHaveClass(
        'bpk-modal bpk-modal--full-screen-desktop',
      );
      expect(
        document.getElementsByClassName(
          'bpk-modal_container bpk-modal__container--full-screen-desktop',
        ),
      ).toBeTruthy();
    });

    it('should set up the correct classNames when noFullScreenOnMobile is true', () => {
      render(
        <BpkModal {...props} noFullScreenOnMobile>
          <div>Content</div>
        </BpkModal>,
      );

      expect(document.getElementById('bpk-modal-element')).toHaveClass(
        'bpk-modal bpk-modal--no-full-screen-mobile',
      );
    });

    it('should set up the correct className when padded is false', () => {
      render(
        <BpkModal {...props} padded={false}>
          <div>Content</div>
        </BpkModal>,
      );

      expect(
        document.getElementsByClassName(
          'bpk-modal_container bpk-modal__container--padded',
        ),
      ).toBeTruthy();
    });

    it('should set up the correct className when wide is true', () => {
      render(
        <BpkModal {...props} wide>
          <div>Content</div>
        </BpkModal>,
      );

      expect(document.getElementById('bpk-modal-element')).toHaveClass(
        'bpk-modal bpk-modal--wide',
      );
    });

    describe('setOverflowY', () => {
      it.each([
        ['hidden', true],
        ['visible', false],
      ])('to %p when isOpen is %p', (expectedOverflowY, expectedIsOpen) => {
        render(
          <BpkModal {...props} isOpen={expectedIsOpen}>
            <div>Content</div>
          </BpkModal>,
        );

        expect(document.body.style.overflowY).toEqual(expectedOverflowY);
      });
    });
  });

  describe('is not supported', () => {
    let htmlDialogElement: typeof window.HTMLDialogElement;

    let BpkModal: typeof DialogType;

    beforeEach(async () => {
      htmlDialogElement = window.HTMLDialogElement;
      window.HTMLDialogElement = undefined!;

      jest.isolateModules(() => {
        ({ BpkModal } = jest.requireActual('./BpkModal'));
      });
    });

    afterEach(() => {
      window.HTMLDialogElement = htmlDialogElement;
    });

    it('should render correctly with polyfill and content', () => {
      const { asFragment } = render(
        <BpkModal {...props}>
          <div>Content</div>
        </BpkModal>,
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should call use the polyfill to open the dialog', () => {
      render(
        <BpkModal {...props}>
          <div>Content</div>
        </BpkModal>,
      );

      expect(
        document
          .getElementById('bpk-modal-element-polyfill')
          ?.getAttribute('data-open'),
      ).toEqual('true');
      expect(document.body.style.position).toEqual('fixed');
      expect(document.body.style.width).toEqual('100%');
    });

    it('should call on Close when closing the dialog', () => {
      render(
        <BpkModal {...props}>
          <div>Content</div>
        </BpkModal>,
      );
      fireEvent.click(screen.getByTitle('bpk-modal-button-close'));

      expect(props.onClose).toHaveBeenCalledTimes(1);
    });

    it('should close the dialog when clicking outside the dialog', () => {
      render(
        <>
          <div data-testid="page" />
          <BpkModal {...props}>
            <div>Content</div>
          </BpkModal>
        </>,
      );
      fireEvent.click(screen.getByTestId('page'));

      expect(screen.queryByRole('Dialog')).toBeNull();
    });

    it('should reset position and width when dialog is closed', () => {
      render(
        <BpkModal {...props} isOpen={false}>
          <div>Content</div>
        </BpkModal>,
      );

      expect(document.body.style.position).toEqual('relative');
      expect(document.body.style.width).toEqual('auto');
    });
  });
});
