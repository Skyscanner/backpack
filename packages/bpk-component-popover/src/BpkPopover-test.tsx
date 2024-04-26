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

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import BpkPopover from './BpkPopover';

describe('BpkPopover', () => {
  let onCloseSpy = jest.fn();

  beforeEach(() => {
    onCloseSpy = jest.fn();
  })

  it('should render correctly', () => {
    const target = (<button type="button">My target</button>);
    render(
      <BpkPopover
        id="my-popover"
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
        target={target}
        isOpen
      >
        My popover content
      </BpkPopover>,
    );

    expect(screen.getByText('My popover content')).toBeVisible();
  });

  it('should render without an arrow', () => {
    const target = (<button type="button">My target</button>);
    render(
      <BpkPopover
        id="my-popover"
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
        target={target}
        isOpen
        showArrow={false}
      >
        My popover content
      </BpkPopover>,
    );
    expect(screen.getByText('My popover content')).toBeVisible();
  });

  // it('should render to the left', () => {
  //   const target = (<button type="button">My target</button>);
  //   const { asFragment } = render(
  //     <BpkPopover
  //       id="my-popover"
  //       onClose={() => null}
  //       label="My popover"
  //       closeButtonText="Close"
  //       target={target}
  //       isOpen
  //       placement='left'
  //     >
  //       My popover content
  //     </BpkPopover>,
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });

  it('should render correctly with "closeButtonProps" provided', () => {
    const {container} = render(
      <BpkPopover
        id="my-popover"
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
        target={<button type="button">My target</button>}
        closeButtonProps={{ tabIndex: 0 }}
        isOpen
      >
        My popover content
      </BpkPopover>,
    );

    expect(container.querySelector('[tabindex="0"]')).toBeVisible();
  });

  it('should render correctly with "padded" attribute equal to false', () => {
    const { container } = render(
      <BpkPopover
        id="my-popover"
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
        padded={false}
        target={<button type="button">My target</button>}
        isOpen
      >
        My popover content
      </BpkPopover>,
    );

    expect(container.querySelector('.bpk-popover__body--padded')).toBeNull();
    expect(screen.getByText('My popover content')).toBeVisible();
  });

  it('should render correctly with "labelAsTitle" attribute', () => {
    const { container } = render(
      <BpkPopover
        id="my-popover"
        onClose={() => null}
        label="My popover"
        closeButtonText="Close"
        labelAsTitle
        target={<button type="button">My target</button>}
        isOpen
      >
        My popover content
      </BpkPopover>,
    );

    const heading = container.querySelector('.bpk-popover__header');
    expect(heading).toBeTruthy();
  });

  it('should propagate the click event to the onClose handler when clicking on the closing button', async () => {
    render(
      <BpkPopover
        id="my-popover"
        onClose={onCloseSpy}
        label="My popover"
        closeButtonText="Close"
        labelAsTitle
        closeButtonIcon
        target={<button type="button">My target</button>}
        isOpen
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
      render(
        <BpkPopover
          id="my-popover"
          onClose={onCloseSpy}
          label="My popover"
          closeButtonText="Close"
          labelAsTitle
          closeButtonIcon={false}
          target={<button type="button">My target</button>}
          isOpen
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
      render(
        <BpkPopover
          id="my-popover"
          onClose={onCloseSpy}
          label="My popover"
          closeButtonText="Close"
          labelAsTitle={false}
          target={<button type="button">My target</button>}
          isOpen
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
