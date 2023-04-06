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

import BpkDialogV2 from './BpkDialogV2';

describe('Dialog', () => {
  const props = {
    id: 'dialog-element',
    ariaLabelledby: 'dialog-aria',
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
    it('should render correctly with content', () => {
      const { baseElement } = render(
        <BpkDialogV2 {...props}>
          <div>Content</div>
        </BpkDialogV2>,
      );

      expect(baseElement).toMatchSnapshot();
    });

    it('should call on Close if showHeader is set to true', () => {
      render(
        <BpkDialogV2 {...props}>
          <div>Content</div>
        </BpkDialogV2>,
      );
      fireEvent.click(screen.getByTitle('button-close'));

      expect(props.onClose).toHaveBeenCalledTimes(1);
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
});
