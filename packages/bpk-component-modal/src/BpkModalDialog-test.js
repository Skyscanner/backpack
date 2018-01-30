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

/* @flow */

import React from 'react';
import renderer from 'react-test-renderer';

import BpkModalDialog from './BpkModalDialog';

describe('BpkModalDialog', () => {
  let closeEvents;

  beforeAll(() => {
    closeEvents = {
      onTouchStart: jest.fn(),
      onTouchMove: jest.fn(),
      onTouchEnd: jest.fn(),
      onMouseDown: jest.fn(),
      onMouseMove: jest.fn(),
      onMouseUp: jest.fn(),
    };
  });

  it('should render correctly', () => {
    const tree = renderer
      .create(
        <BpkModalDialog
          id="my-modal"
          title="Modal title"
          onClose={jest.fn()}
          closeLabel="Close"
          closeEvents={closeEvents}
          dialogRef={jest.fn()}
          isIphone={false}
          fullScreenOnMobile
          fullScreen={false}
        >
          Modal content
        </BpkModalDialog>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when it has a className', () => {
    const tree = renderer
      .create(
        <BpkModalDialog
          id="my-modal"
          className="my-classname"
          title="Modal title"
          onClose={jest.fn()}
          closeLabel="Close"
          closeEvents={closeEvents}
          dialogRef={jest.fn()}
          isIphone={false}
          fullScreenOnMobile
          fullScreen={false}
        >
          Modal content
        </BpkModalDialog>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with wide prop', () => {
    const tree = renderer
      .create(
        <BpkModalDialog
          id="my-modal"
          className="my-classname"
          wide
          title="Modal title"
          onClose={jest.fn()}
          closeLabel="Close"
          closeEvents={closeEvents}
          dialogRef={jest.fn()}
          isIphone={false}
          fullScreenOnMobile
          fullScreen={false}
        >
          Modal content
        </BpkModalDialog>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with closeText prop', () => {
    const tree = renderer
      .create(
        <BpkModalDialog
          id="my-modal"
          className="my-classname"
          closeText="Dismiss"
          title="Modal title"
          onClose={jest.fn()}
          closeLabel="Close"
          closeEvents={closeEvents}
          dialogRef={jest.fn()}
          isIphone={false}
          fullScreenOnMobile
          fullScreen={false}
        >
          Modal content
        </BpkModalDialog>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when is iPhone', () => {
    const tree = renderer
      .create(
        <BpkModalDialog
          id="my-modal"
          title="Modal title"
          onClose={jest.fn()}
          closeLabel="Close"
          closeEvents={closeEvents}
          dialogRef={jest.fn()}
          isIphone
          fullScreenOnMobile
          fullScreen={false}
        >
          Modal content
        </BpkModalDialog>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when it does not fills the screen on mobile', () => {
    const tree = renderer
      .create(
        <BpkModalDialog
          id="my-modal"
          title="Modal title"
          onClose={jest.fn()}
          closeLabel="Close"
          closeEvents={closeEvents}
          dialogRef={jest.fn()}
          fullScreenOnMobile={false}
          fullScreen={false}
          isIphone={false}
        >
          Modal content
        </BpkModalDialog>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when it is fullscreen', () => {
    const tree = renderer
      .create(
        <BpkModalDialog
          id="my-modal"
          title="Modal title"
          onClose={jest.fn()}
          closeLabel="Close"
          closeEvents={closeEvents}
          dialogRef={jest.fn()}
          fullScreenOnMobile={false}
          fullScreen
          isIphone={false}
        >
          Modal content
        </BpkModalDialog>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
