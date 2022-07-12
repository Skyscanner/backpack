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

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import BpkPopover from './BpkPopover';

describe('BpkPopover', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkPopover
        id="my-popover"
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
      >
        My popover content
      </BpkPopover>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "closeButtonProps" provided', () => {
    const { asFragment } = render(
      <BpkPopover
        id="my-popover"
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
        tabIndex="0"
        closeButtonProps={{ tabIndex: 0 }}
      >
        My popover content
      </BpkPopover>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "padded" attribute equal to false', () => {
    const { asFragment } = render(
      <BpkPopover
        id="my-popover"
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
        padded={false}
      >
        My popover content
      </BpkPopover>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "className" attribute', () => {
    const { asFragment } = render(
      <BpkPopover
        id="my-popover"
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
        className="my-custom-class"
      >
        My popover content
      </BpkPopover>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "labelAsTitle" attribute', () => {
    const { asFragment } = render(
      <BpkPopover
        id="my-popover"
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
        labelAsTitle
      >
        My popover content
      </BpkPopover>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should propagate the click event to the onClose handler when clicking on the closing button', async () => {
    const onCloseSpy = jest.fn();
    render(
      <BpkPopover
        id="my-popover"
        onClose={onCloseSpy}
        label="My popover"
        closeButtonText="Close"
        className="my-custom-class"
        labelAsTitle
        closeButtonIcon
      >
        My popover content
      </BpkPopover>,
    );

    expect(onCloseSpy).not.toHaveBeenCalled();

    const closeButton = screen.getByRole('button', { name: 'Close' });
    await fireEvent.click(closeButton);

    expect(onCloseSpy).toHaveBeenCalled();
  });

  it(
    'should propagate the click event to the onClose handler when clicking on the closing link' +
      'when using label as a title',
    async () => {
      const onCloseSpy = jest.fn();
      render(
        <BpkPopover
          id="my-popover"
          onClose={onCloseSpy}
          label="My popover"
          closeButtonText="Close"
          className="my-custom-class"
          labelAsTitle
          closeButtonIcon={false}
        >
          My popover content
        </BpkPopover>,
      );

      expect(onCloseSpy).not.toHaveBeenCalled();

      const linkButton = screen.getByRole('button', { name: 'Close' });
      await fireEvent.click(linkButton);

      expect(onCloseSpy).toHaveBeenCalled();
    },
  );

  it(
    'should propagate the click event to the onClose handler when clicking on the closing link' +
      'when not using label as a title',
    async () => {
      const onCloseSpy = jest.fn();
      render(
        <BpkPopover
          id="my-popover"
          onClose={onCloseSpy}
          label="My popover"
          closeButtonText="Close"
          className="my-custom-class"
          labelAsTitle={false}
        >
          My popover content
        </BpkPopover>,
      );

      expect(onCloseSpy).not.toHaveBeenCalled();

      const linkButton = screen.getByRole('button', { name: 'Close' });
      await fireEvent.click(linkButton);

      expect(onCloseSpy).toHaveBeenCalled();
    },
  );
});
