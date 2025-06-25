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

import { type BpkModalV2 as DialogType } from './BpkModal';

// this is needed so that we avoid importing multiple copies of React due to the isolateModules method
// i.e. inside the BpkModal module as well as in the tests.
// Importing multiple copies would result in an error, mocking it ensures tests are always running with the same React version
jest.mock('react', () => jest.requireActual('react'));

describe('BpkModalV2', () => {
  const props = {
    id: 'bpk-modal-element',
    ariaLabelledby: 'bpk-modal-element',
    closeLabel: 'bpk-modal-button-close',
    isOpen: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('is supported', () => {
    let BpkModalV2: typeof DialogType;

    beforeEach(() => {
      jest.isolateModules(() => {
        ({ BpkModalV2 } = jest.requireActual('./BpkModal'));
      });
    });

    it('should render correctly with content', () => {
      const { asFragment } = render(
        <BpkModalV2 {...props} title="Modal with dialog element">
          <div>Content</div>
        </BpkModalV2>,
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should call on Close when closing the dialog', () => {
      render(
        <BpkModalV2 {...props}>
          <div>Content</div>
        </BpkModalV2>,
      );
      fireEvent.click(screen.getByTitle('bpk-modal-button-close'));

      expect(props.onClose).toHaveBeenCalledTimes(1);
    });

    it('should close the dialog when clicking outside the dialog', () => {
      render(
        <>
          <div data-testid="page" />
          <BpkModalV2 {...props}>
            <div>Content</div>
          </BpkModalV2>
        </>,
      );
      fireEvent.click(screen.getByTestId('page'));

      expect(screen.queryByRole('Dialog')).toBeNull();
    });

    it('should not close the dialog when clicking inside the dialog', () => {
      render(
        <BpkModalV2 {...props}>
          <div>Content</div>
        </BpkModalV2>,
      );
      fireEvent.click(screen.getByText('Content'));

      expect(document.getElementById('bpk-modal-element')).toBeInTheDocument();
    });

    it('should render title correctly', () => {
      render(
        <BpkModalV2 {...props} title="Modal with dialog element">
          <div>Content</div>
        </BpkModalV2>,
      );

      expect(screen.getByText('Modal with dialog element')).toBeInTheDocument();
      expect(screen.getByTitle('bpk-modal-button-close')).toBeInTheDocument();
    });

    it('should not render title when title does not exist', () => {
      render(
        <BpkModalV2 {...props}>
          <div>Content</div>
        </BpkModalV2>,
      );

      expect(
        screen.queryByText('Modal with dialog element'),
      ).not.toBeInTheDocument();
      expect(screen.getByTitle('bpk-modal-button-close')).toBeInTheDocument();
    });

    it('should not render header when showHeader is false', () => {
      render(
        <BpkModalV2 {...props} showHeader={false}>
          <div>Content</div>
        </BpkModalV2>,
      );

      expect(document.getElementById('bpk-modal-element')).toBeInTheDocument();
      expect(document.getElementById('bpk-modal-element-title')).toBeNull();
    });

    it('should call showModal to open dialog', () => {
      window.HTMLDialogElement.prototype.showModal = jest.fn();
      render(
        <BpkModalV2 {...props}>
          <div>Content</div>
        </BpkModalV2>,
      );

      expect(
        window.HTMLDialogElement.prototype.showModal,
      ).toHaveBeenCalledTimes(1);
    });

    it('should return null when dialog is closed', () => {
      // @ts-expect-error TS(2339): Property 'store' does not exist on type 'RenderRes... Remove this comment to see the full error message
      const { rerender, store } = render(
        <BpkModalV2 {...props}>
          <div>Content</div>
        </BpkModalV2>,
      );

      expect(screen.queryByText('Content')).toBeInTheDocument();

      rerender(
        <BpkModalV2 {...props} isOpen={false}>
          <div>Content</div>
        </BpkModalV2>,
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 3.
        rerender,
        store,
      );

      expect(screen.queryByRole('Dialog')).toBeNull();
    });

    it('should set up the correct className when fullScreenOnDesktop is true', () => {
      render(
        <BpkModalV2 {...props} fullScreenOnDesktop>
          <div>Content</div>
        </BpkModalV2>,
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
        <BpkModalV2 {...props} noFullScreenOnMobile>
          <div>Content</div>
        </BpkModalV2>,
      );

      expect(document.getElementById('bpk-modal-element')).toHaveClass(
        'bpk-modal bpk-modal--no-full-screen-mobile',
      );
    });

    it('should set up the correct className when padded is false', () => {
      render(
        <BpkModalV2 {...props} padded={false}>
          <div>Content</div>
        </BpkModalV2>,
      );

      expect(
        document.getElementsByClassName(
          'bpk-modal_container bpk-modal__container--padded',
        ),
      ).toBeTruthy();
    });

    it('should set up the correct className when wide is true', () => {
      render(
        <BpkModalV2 {...props} wide>
          <div>Content</div>
        </BpkModalV2>,
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
          <BpkModalV2 {...props} isOpen={expectedIsOpen}>
            <div>Content</div>
          </BpkModalV2>,
        );

        expect(document.body.style.overflowY).toEqual(expectedOverflowY);
      });
    });
  });

  describe('is not supported', () => {
    let htmlDialogElement: typeof window.HTMLDialogElement;

    let BpkModalV2: typeof DialogType;

    beforeEach(async () => {
      htmlDialogElement = window.HTMLDialogElement;
      window.HTMLDialogElement = undefined!;

      jest.isolateModules(() => {
        ({ BpkModalV2 } = jest.requireActual('./BpkModal'));
      });
    });

    afterEach(() => {
      window.HTMLDialogElement = htmlDialogElement;
    });

    it('should render correctly with polyfill and content', () => {
      const { asFragment } = render(
        <BpkModalV2 {...props}>
          <div>Content</div>
        </BpkModalV2>,
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should call use the polyfill to open the dialog', () => {
      render(
        <BpkModalV2 {...props}>
          <div>Content</div>
        </BpkModalV2>,
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
        <BpkModalV2 {...props}>
          <div>Content</div>
        </BpkModalV2>,
      );
      fireEvent.click(screen.getByTitle('bpk-modal-button-close'));

      expect(props.onClose).toHaveBeenCalledTimes(1);
    });

    it('should close the dialog when clicking outside the dialog', () => {
      render(
        <>
          <div data-testid="page" />
          <BpkModalV2 {...props}>
            <div>Content</div>
          </BpkModalV2>
        </>,
      );
      fireEvent.click(screen.getByTestId('page'));

      expect(screen.queryByRole('Dialog')).toBeNull();
    });

    it('should reset position and width when dialog is closed', () => {
      render(
        <BpkModalV2 {...props} isOpen={false}>
          <div>Content</div>
        </BpkModalV2>,
      );

      expect(document.body.style.position).toEqual('relative');
      expect(document.body.style.width).toEqual('auto');
    });
  });
});
