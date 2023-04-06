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

import { fireEvent, screen } from '@testing-library/react';

import {
  renderWithProvider,
  rerenderWithProvider,
} from '../../util/testUtils/mockStore';

import { type Dialog as DialogType } from './Dialog';

describe('Dialog', () => {
  const props = {
    id: 'dialog-element',
    isOpen: true,
    closeLabel: 'button-close',
    onClose: jest.fn(),
    showHeader: true,
    title: 'Dialog Element',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('is supported', () => {
    let Dialog: typeof DialogType;

    beforeEach(() => {
      jest.isolateModules(() => {
        ({ Dialog } = jest.requireActual('./Dialog'));
      });
    });

    it('should render correctly with content', () => {
      const { baseElement } = renderWithProvider(
        <Dialog {...props}>
          <div>Content</div>
        </Dialog>,
      );

      expect(baseElement).toMatchSnapshot();
    });

    it('should call on Close if showHeader is set to true', () => {
      renderWithProvider(
        <Dialog {...props}>
          <div>Content</div>
        </Dialog>,
      );
      fireEvent.click(screen.getByTitle('button-close'));

      expect(props.onClose).toHaveBeenCalledTimes(1);
    });

    it('should not render title and close button if showHeader is set to false', () => {
      renderWithProvider(
        <Dialog {...props} showHeader={false}>
          <div>Content</div>
        </Dialog>,
      );

      expect(screen.queryByRole('Dialog Element')).not.toBeInTheDocument();
    });

    it('should call showModal to open dialog', () => {
      window.HTMLDialogElement.prototype.showModal = jest.fn();
      renderWithProvider(
        <Dialog {...props}>
          <div>Content</div>
        </Dialog>,
      );

      expect(
        window.HTMLDialogElement.prototype.showModal,
      ).toHaveBeenCalledTimes(1);
    });

    it('should return null when dialog is closed', () => {
      const { rerender, store } = renderWithProvider(
        <Dialog {...props}>
          <div>Content</div>
        </Dialog>,
      );

      expect(screen.queryByText('Content')).toBeInTheDocument();

      rerenderWithProvider(
        <Dialog {...props} isOpen={false}>
          <div>Content</div>
        </Dialog>,
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
        renderWithProvider(
          <Dialog {...props} isOpen={expectedIsOpen}>
            <div>Content</div>
          </Dialog>,
        );

        expect(document.body.style.overflowY).toEqual(expectedOverflowY);
      });
    });
  });

  describe('is not supported', () => {
    let htmlDialogElement: typeof window.HTMLDialogElement;

    let Dialog: typeof DialogType;

    beforeEach(async () => {
      htmlDialogElement = window.HTMLDialogElement;
      window.HTMLDialogElement = !undefined;

      jest.isolateModules(() => {
        ({ Dialog } = jest.requireActual('./Dialog'));
      });
    });

    afterEach(() => {
      window.HTMLDialogElement = htmlDialogElement;
    });

    it('should render correctly with polyfill and content', () => {
      const { baseElement } = renderWithProvider(
        <Dialog {...props}>
          <div>Content</div>
        </Dialog>,
      );

      expect(baseElement).toMatchSnapshot();
    });

    it('should call use the polyfill to open the dialog', () => {
      renderWithProvider(
        <Dialog {...props}>
          <div>Content</div>
        </Dialog>,
      );

      expect(
        document
          .getElementById('dialog-element-polyfill')
          ?.getAttribute('data-open'),
      ).toEqual('true');
      expect(document.body.style.position).toEqual('fixed');
      expect(document.body.style.width).toEqual('100%');
    });

    it('should reset position and width when closing the dialog', () => {
      renderWithProvider(
        <Dialog {...props} isOpen={false}>
          <div>Content</div>
        </Dialog>,
      );

      expect(document.body.style.position).toEqual('relative');
      expect(document.body.style.width).toEqual('auto');
    });
  });
});
