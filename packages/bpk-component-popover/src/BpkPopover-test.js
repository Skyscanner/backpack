/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import BpkPopover from './BpkPopover';

describe('BpkPopover', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <BpkPopover
          id="my-popover"
          onClose={() => null}
          label="My popover"
          closeButtonText="Close"
        >
          My popover content
        </BpkPopover>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "padded" attribute equal to false', () => {
    const tree = renderer
      .create(
        <BpkPopover
          id="my-popover"
          onClose={() => null}
          label="My popover"
          closeButtonText="Close"
          padded={false}
        >
          My popover content
        </BpkPopover>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "className" attribute', () => {
    const tree = renderer
      .create(
        <BpkPopover
          id="my-popover"
          onClose={() => null}
          label="My popover"
          closeButtonText="Close"
          className="my-custom-class"
        >
          My popover content
        </BpkPopover>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "labelAsTitle" attribute', () => {
    const tree = renderer
      .create(
        <BpkPopover
          id="my-popover"
          onClose={() => null}
          label="My popover"
          closeButtonText="Close"
          labelAsTitle
        >
          My popover content
        </BpkPopover>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should propagate the click event to the onClose handler when clicking on the closing button', () => {
    const onCloseSpy = jest.fn();
    const popover = mount(
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

    expect(onCloseSpy.mock.calls.length).toEqual(0);

    const event = {
      target: '<BpkCloseButton>',
    };
    popover
      .find('BpkCloseButton')
      .at(0)
      .simulate('click', event);

    expect(onCloseSpy.mock.calls[0][0].target).toEqual('<BpkCloseButton>');
    expect(onCloseSpy.mock.calls[0][1]).toEqual({ source: 'CLOSE_BUTTON' });
  });

  it(
    'should propagate the click event to the onClose handler when clicking on the closing link' +
      'when using label as a title',
    () => {
      const onCloseSpy = jest.fn();
      const popover = mount(
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

      expect(onCloseSpy.mock.calls.length).toEqual(0);

      const event = {
        target: '<BpkButtonLink>',
      };
      popover
        .find('BpkButtonLink')
        .at(0)
        .simulate('click', event);

      expect(onCloseSpy.mock.calls[0][0].target).toEqual('<BpkButtonLink>');
      expect(onCloseSpy.mock.calls[0][1]).toEqual({ source: 'CLOSE_LINK' });
    },
  );

  it(
    'should propagate the click event to the onClose handler when clicking on the closing link' +
      'when not using label as a title',
    () => {
      const onCloseSpy = jest.fn();
      const popover = mount(
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

      expect(onCloseSpy.mock.calls.length).toEqual(0);

      const event = {
        target: '<BpkButtonLink>',
      };
      popover
        .find('BpkButtonLink')
        .at(0)
        .simulate('click', event);

      expect(onCloseSpy.mock.calls[0][0].target).toEqual('<BpkButtonLink>');
      expect(onCloseSpy.mock.calls[0][1]).toEqual({ source: 'CLOSE_LINK' });
    },
  );
});
